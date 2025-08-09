<template>
	<div class="brazilian-cnpj-interface">
		<div class="cnpj-input-wrapper">
			<v-input
				:model-value="displayValue"
				:placeholder="placeholder || 'XX.XXX.XXX/XXXX-XX'"
				:disabled="disabled"
				:required="required"
				:class="{ 'has-error': hasError }"
				@update:model-value="updateValue"
				@blur="validateInput"
				@paste="handlePaste"
			/>
			
			<!-- Search Button (only shown when API lookup is enabled) -->
			<v-button
				v-if="enableApiLookup && displayValue && displayValue.length >= 18"
				class="search-button"
				icon
				secondary
				:loading="apiStatus?.type === 'loading'"
				:disabled="hasError || !isValidCnpj"
				@click="performApiLookup"
				v-tooltip="'Consultar dados da empresa'"
			>
				<v-icon name="search" />
			</v-button>
		</div>
		
		<!-- API Lookup Status -->
		<div v-if="enableApiLookup && apiStatus" class="api-status" :class="apiStatus.type">
			<v-icon :name="apiStatus.icon" small />
			<span>{{ apiStatus.message }}</span>
		</div>
		
		<!-- Validation Error -->
		<div v-if="hasError" class="error-message">
			<v-icon name="warning" small />
			<span>{{ errorMessage }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject, nextTick } from 'vue';
import { formatCNPJ, cleanCNPJ, isValidCNPJ, lookupCNPJ, applyFieldMapping, type CNPJApiResponse } from '../../utils/formatters';

interface Props {
	value: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validate_cnpj?: boolean;
	enable_api_lookup?: boolean;
	api_token?: string;
	auto_fill_mapping?: string | Record<string, string>;
}

interface Emits {
	(event: 'input', value: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'XX.XXX.XXX/XXXX-XX',
	disabled: false,
	required: false,
	validate_cnpj: true,
	enable_api_lookup: false,
	api_token: '',
	auto_fill_mapping: '{}',
});

const emit = defineEmits<Emits>();

// Get values context from Directus form
const values = inject('values', ref({}));

// Get the field update functions from Directus form context
const fieldsStore = inject('fieldsStore', null);
const primaryKey = inject('primaryKey', ref('+'));
const collection = inject('collection', ref(null));

// Try to get the form update function
const updateValues = inject('updateValues', null) as ((updates: Record<string, any>) => void) | null;

// Reactive state
const hasError = ref(false);
const errorMessage = ref('');
const isValidCnpj = ref(false);
const apiStatus = ref<{
	type: 'loading' | 'success' | 'error';
	icon: string;
	message: string;
} | null>(null);

// Computed values
const displayValue = computed(() => {
	if (!props.value) return '';
	return formatCNPJ(props.value);
});

const enableApiLookup = computed(() => props.enable_api_lookup);

const fieldMapping = computed(() => {
	try {
		if (typeof props.auto_fill_mapping === 'string') {
			return JSON.parse(props.auto_fill_mapping || '{}');
		}
		return props.auto_fill_mapping || {};
	} catch {
		return {};
	}
});

// Methods
const updateValue = (newValue: string) => {
	// Always clean the input, whether typed or pasted
	const cleaned = cleanCNPJ(newValue);
	
	// Limit to 14 digits maximum
	const limited = cleaned.slice(0, 14);
	
	emit('input', limited);
	
	// Clear previous errors and API status
	hasError.value = false;
	errorMessage.value = '';
	apiStatus.value = null;
	
	// Validate CNPJ format in real-time
	if (limited && limited.length === 14) {
		isValidCnpj.value = isValidCNPJ(limited);
	} else {
		isValidCnpj.value = false;
	}
};

const handlePaste = (event: ClipboardEvent) => {
	// Prevent default paste behavior
	event.preventDefault();
	
	// Get pasted text
	const pastedText = event.clipboardData?.getData('text') || '';
	
	// Clean the pasted text (remove all non-numeric characters)
	const cleanedText = cleanCNPJ(pastedText);
	
	// Limit to 14 digits (CNPJ max length)
	const limitedText = cleanedText.slice(0, 14);
	
	// Update the value with cleaned text
	updateValue(limitedText);
	
	console.log('CNPJ Paste:', {
		original: pastedText,
		cleaned: cleanedText,
		limited: limitedText,
		formatted: formatCNPJ(limitedText)
	});
};

const validateInput = () => {
	if (!props.validate_cnpj) return;
	
	const cleaned = cleanCNPJ(props.value || '');
	if (!cleaned) return;
	
	if (cleaned.length !== 14) {
		hasError.value = true;
		errorMessage.value = 'CNPJ deve ter 14 dígitos';
		isValidCnpj.value = false;
		return;
	}
	
	if (!isValidCNPJ(cleaned)) {
		hasError.value = true;
		errorMessage.value = 'CNPJ inválido';
		isValidCnpj.value = false;
		return;
	}
	
	hasError.value = false;
	errorMessage.value = '';
	isValidCnpj.value = true;
};

// Emit a custom event that the parent form can listen to
const emitFieldUpdates = (fieldsToUpdate: Record<string, any>) => {
	console.log('📡 Starting field updates simulation...', fieldsToUpdate);
	console.log('🔍 Available form inputs on page:');
	
	// Debug: List all inputs on the page
	const allInputs = document.querySelectorAll('input, select, textarea');
	allInputs.forEach((input, index) => {
		console.log(`Input ${index}:`, {
			type: input.tagName,
			name: input.getAttribute('name'),
			id: input.id,
			class: input.className,
			value: (input as any).value
		});
	});
	
	// Method: Find input fields and simulate user input
	Object.entries(fieldsToUpdate).forEach(([fieldName, value]) => {
		setTimeout(() => {
			try {
				// Try multiple selectors to find the field
				const selectors = [
					`input[name="${fieldName}"]`,
					`[data-field="${fieldName}"] input`,
					`[data-field="${fieldName}"] .v-input input`,
					`.field-${fieldName} input`,
					`#field-${fieldName}`,
				];
				
				let targetInput: HTMLInputElement | null = null;
				for (const selector of selectors) {
					targetInput = document.querySelector(selector) as HTMLInputElement | null;
					if (targetInput) break;
				}
				
				if (targetInput) {
					console.log(`🎯 Found field ${fieldName}, updating...`);
					
					// Clear existing value
					targetInput.value = '';
					
					// Set new value
					targetInput.value = String(value);
					
					// Trigger events to simulate user input
					const events = ['input', 'change', 'blur'];
					events.forEach(eventType => {
						const event = new Event(eventType, { bubbles: true });
						targetInput!.dispatchEvent(event);
					});
					
					// Special handling for Vue inputs
					const vueInputEvent = new CustomEvent('update:modelValue', {
						detail: value,
						bubbles: true
					});
					targetInput.dispatchEvent(vueInputEvent);
					
					console.log(`✅ Field ${fieldName} updated via DOM:`, value);
				} else {
					console.warn(`❌ Could not find input for field: ${fieldName}`);
					
					// Fallback: try values context
					if (values && values.value) {
						values.value[fieldName] = value;
						console.log(`🔄 Fallback: set ${fieldName} via values context`);
					}
				}
			} catch (error) {
				console.error(`❌ Error updating field ${fieldName}:`, error);
			}
		}, 100 * Object.keys(fieldsToUpdate).indexOf(fieldName)); // Stagger updates
	});
};

const performApiLookup = async () => {
	if (!enableApiLookup.value || !props.value) return;
	
	const cleaned = cleanCNPJ(props.value);
	if (!cleaned || cleaned.length !== 14 || !isValidCNPJ(cleaned)) {
		return;
	}
	
	// Show loading status
	apiStatus.value = {
		type: 'loading',
		icon: 'refresh',
		message: 'Consultando dados da empresa...'
	};
	
	try {
		const response = await lookupCNPJ(cleaned, props.api_token);
		
		if (response) {
			// Apply field mapping
			const mappedFields = applyFieldMapping(response, fieldMapping.value);
			
			console.log('🔍 CNPJ Debug Info:', {
				apiResponse: response,
				fieldMapping: fieldMapping.value,
				mappedFields: mappedFields,
				valuesContext: values.value,
				updateValuesAvailable: !!updateValues,
				fieldsStoreAvailable: !!fieldsStore,
				collection: collection?.value,
				primaryKey: primaryKey?.value
			});
			
			let fieldsUpdated = 0;
			
			try {
				// Method 1: Use the updateValues function if available
				if (updateValues && typeof updateValues === 'function') {
					console.log('🎯 Using updateValues function...');
					updateValues(mappedFields);
					fieldsUpdated = Object.keys(mappedFields).length;
					console.log('✅ Fields updated via updateValues:', mappedFields);
				}
				// Method 2: Try to update via values context (fallback)
				else if (values.value) {
					console.log('🎯 Fallback: updating values context...');
					Object.entries(mappedFields).forEach(([fieldName, value]) => {
						values.value[fieldName] = value;
						fieldsUpdated++;
						console.log(`✅ Field ${fieldName} set:`, value);
					});
				}
				
				// Method 3: Always try DOM simulation regardless of other methods
				console.log('🎯 Attempting DOM field updates...');
				emitFieldUpdates(mappedFields);
				
				// Show success status
				apiStatus.value = {
					type: 'success',
					icon: 'check',
					message: `✅ ${response.razao_social} - ${fieldsUpdated} campos processados (verifique se foram preenchidos)`
				};
				
			} catch (updateError) {
				console.error('❌ Error updating fields:', updateError);
				
				// Show partial success with manual instruction
				apiStatus.value = {
					type: 'success',
					icon: 'info',
					message: `✅ Dados obtidos: ${response.razao_social}. Verifique se os campos foram preenchidos.`
				};
				
				// Still emit the event so parent can try to handle it
				emitFieldUpdates(mappedFields);
			}
			
			// Clear status after 5 seconds
			setTimeout(() => {
				apiStatus.value = null;
			}, 5000);
		}
	} catch (error) {
		console.error('❌ CNPJ API Error:', error);
		
		// Show error status
		apiStatus.value = {
			type: 'error',
			icon: 'warning',
			message: error instanceof Error ? error.message : 'Erro na consulta da API'
		};
		
		// Clear status after 5 seconds
		setTimeout(() => {
			apiStatus.value = null;
		}, 5000);
	}
};

// Watch for value changes to validate
watch(() => props.value, validateInput);
</script>

<style scoped>
.brazilian-cnpj-interface {
	position: relative;
}

.cnpj-input-wrapper {
	display: flex;
	align-items: center;
	gap: 8px;
}

.cnpj-input-wrapper :deep(.v-input) {
	flex: 1;
}

.search-button {
	flex-shrink: 0;
	--v-button-width: 44px;
	--v-button-height: 44px;
}

.search-button:not(.loading):hover {
	--v-button-background-color: var(--primary);
	--v-button-color: var(--primary-foreground);
}

.has-error :deep(.v-input input) {
	border-color: var(--danger) !important;
}

.loading-message,
.success-message,
.error-message {
	font-size: 12px;
	margin-top: 4px;
	display: flex;
	align-items: center;
	gap: 4px;
}

.spin {
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
</style> 