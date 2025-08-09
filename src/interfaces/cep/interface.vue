<template>
	<div class="brazilian-cep-interface">
		<div class="cep-input-wrapper">
			<v-input
				:model-value="displayValue"
				:placeholder="placeholder || 'XXXXX-XXX'"
				:disabled="disabled"
				:required="required"
				:class="{ 'has-error': hasError }"
				@update:model-value="updateValue"
				@blur="validateInput"
				@paste="handlePaste"
			/>
			
			<!-- Search Button (only shown when API lookup is enabled) -->
			<v-button
				v-if="enableApiLookup && displayValue && displayValue.length >= 9"
				class="search-button"
				icon
				secondary
				:loading="apiStatus?.type === 'loading'"
				:disabled="hasError || !isValidCep"
				@click="performApiLookup"
				v-tooltip="'Consultar endereço'"
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
import { formatCEP, cleanCEP, validateCEP, lookupCEP, applyFieldMapping, type CEPApiResponse } from '../../utils/formatters';

interface Props {
	value: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validate_cep?: boolean;
	enable_api_lookup?: boolean;
	auto_fill_mapping?: string | Record<string, string>;
}

interface Emits {
	(event: 'input', value: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'XXXXX-XXX',
	disabled: false,
	required: false,
	validate_cep: true,
	enable_api_lookup: false,
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
const isValidCep = ref(false);
const apiStatus = ref<{
	type: 'loading' | 'success' | 'error';
	icon: string;
	message: string;
} | null>(null);

// Computed values
const displayValue = computed(() => {
	if (!props.value) return '';
	return formatCEP(props.value);
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
	const cleaned = cleanCEP(newValue);
	
	// Limit to 8 digits maximum
	const limited = cleaned.slice(0, 8);
	
	emit('input', limited);
	
	// Clear previous errors and API status
	hasError.value = false;
	errorMessage.value = '';
	apiStatus.value = null;
	
	// Validate CEP format in real-time
	if (limited && limited.length === 8) {
		isValidCep.value = validateCEP(limited);
	} else {
		isValidCep.value = false;
	}
};

const handlePaste = (event: ClipboardEvent) => {
	// Prevent default paste behavior
	event.preventDefault();
	
	// Get pasted text
	const pastedText = event.clipboardData?.getData('text') || '';
	
	// Clean the pasted text (remove all non-numeric characters)
	const cleanedText = cleanCEP(pastedText);
	
	// Limit to 8 digits (CEP max length)
	const limitedText = cleanedText.slice(0, 8);
	
	// Update the value with cleaned text
	updateValue(limitedText);
	
	console.log('CEP Paste:', {
		original: pastedText,
		cleaned: cleanedText,
		limited: limitedText,
		formatted: formatCEP(limitedText)
	});
};

const validateInput = () => {
	if (!props.validate_cep) return;
	
	const cleaned = cleanCEP(props.value || '');
	if (!cleaned) return;
	
	if (cleaned.length !== 8) {
		hasError.value = true;
		errorMessage.value = 'CEP deve ter 8 dígitos';
		isValidCep.value = false;
		return;
	}
	
	if (!validateCEP(cleaned)) {
		hasError.value = true;
		errorMessage.value = 'CEP inválido';
		isValidCep.value = false;
		return;
	}
	
	hasError.value = false;
	errorMessage.value = '';
	isValidCep.value = true;
};

// Emit a custom event that the parent form can listen to
const emitFieldUpdates = (fieldsToUpdate: Record<string, any>) => {
	console.log('📡 Starting field updates simulation...', fieldsToUpdate);
	
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
	
	const cleaned = cleanCEP(props.value);
	if (!cleaned || cleaned.length !== 8 || !validateCEP(cleaned)) {
		return;
	}
	
	// Show loading status
	apiStatus.value = {
		type: 'loading',
		icon: 'refresh',
		message: 'Consultando endereço...'
	};
	
	try {
		const response = await lookupCEP(cleaned);
		
		if (response) {
			// Apply field mapping
			const mappedFields = applyFieldMapping(response, fieldMapping.value);
			
			console.log('🔍 CEP Debug Info:', {
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
				
				// Method 3: Emit custom event for parent components to handle
				emitFieldUpdates(mappedFields);
				
				// Show success status
				apiStatus.value = {
					type: 'success',
					icon: 'check',
					message: `✅ ${response.logradouro}, ${response.localidade} - ${fieldsUpdated} campos encontrados`
				};
				
			} catch (updateError) {
				console.error('❌ Error updating fields:', updateError);
				
				// Show partial success with manual instruction
				apiStatus.value = {
					type: 'success',
					icon: 'info',
					message: `✅ Dados obtidos: ${response.logradouro}, ${response.localidade}. Verifique se os campos foram preenchidos.`
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
		console.error('❌ CEP API Error:', error);
		
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
.brazilian-cep-interface {
	position: relative;
}

.cep-input-wrapper {
	display: flex;
	align-items: center;
	gap: 8px;
}

.cep-input-wrapper :deep(.v-input) {
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
