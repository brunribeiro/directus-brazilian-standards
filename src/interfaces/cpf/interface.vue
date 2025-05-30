<template>
	<v-input
		:model-value="displayValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:class="{ 'has-error': hasError }"
		@update:model-value="updateValue"
		@blur="onBlur"
		@keydown="onKeyDown"
		maxlength="14"
	>
		<template #append v-if="hasError">
			<v-icon name="error" class="error-icon" />
		</template>
		<template #append v-else-if="isValid && value">
			<v-icon name="check_circle" class="success-icon" />
		</template>
	</v-input>
	
	<div v-if="hasError" class="error-message">
		{{ errorMessage }}
	</div>
	
	<div v-else-if="isValid && value" class="success-message">
		CPF válido
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formatCPF, isValidCPF, cleanCPF } from '../../utils/formatters';

interface Props {
	value?: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validateCpf?: boolean;
}

interface Emits {
	(event: 'input', value: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	placeholder: '123.456.789-01',
	disabled: false,
	required: false,
	validateCpf: true,
});

const emit = defineEmits<Emits>();

const hasError = ref(false);
const errorMessage = ref('');
const isValid = ref(false);

const displayValue = computed(() => {
	if (!props.value) return '';
	return formatCPF(props.value);
});

const validateValue = (value: string): boolean => {
	hasError.value = false;
	errorMessage.value = '';
	isValid.value = false;
	
	if (!value && props.required) {
		hasError.value = true;
		errorMessage.value = 'CPF é obrigatório';
		return false;
	}
	
	if (value && props.validateCpf) {
		const cleanValue = cleanCPF(value);
		
		if (cleanValue.length > 0 && cleanValue.length < 11) {
			hasError.value = true;
			errorMessage.value = 'CPF deve ter 11 dígitos';
			return false;
		}
		
		if (cleanValue.length === 11) {
			// Check for repeated digits (like 11111111111)
			if (/^(\d)\1{10}$/.test(cleanValue)) {
				hasError.value = true;
				errorMessage.value = 'CPF inválido';
				return false;
			}
			
			if (!isValidCPF(value)) {
				hasError.value = true;
				errorMessage.value = 'CPF inválido';
				return false;
			}
			
			isValid.value = true;
		}
	}
	
	return true;
};

const updateValue = (newValue: string) => {
	// Format the CPF as user types
	const formatted = formatCPF(newValue);
	
	// Get the clean value for storage
	const cleanValue = cleanCPF(formatted);
	
	// Validate the value
	validateValue(formatted);
	
	// Emit the clean value (numbers only) for storage
	emit('input', cleanValue || null);
};

const onBlur = () => {
	if (props.value) {
		const formatted = formatCPF(props.value);
		validateValue(formatted);
	}
};

const onKeyDown = (event: KeyboardEvent) => {
	// Allow: backspace, delete, tab, escape, enter
	if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
		// Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
		(event.keyCode === 65 && event.ctrlKey === true) ||
		(event.keyCode === 67 && event.ctrlKey === true) ||
		(event.keyCode === 86 && event.ctrlKey === true) ||
		(event.keyCode === 88 && event.ctrlKey === true)) {
		return;
	}
	
	// Only allow numbers
	if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && 
		(event.keyCode < 96 || event.keyCode > 105)) {
		event.preventDefault();
	}
};

// Watch for external value changes
watch(() => props.value, (newValue) => {
	if (newValue) {
		const formatted = formatCPF(newValue);
		validateValue(formatted);
	} else {
		hasError.value = false;
		errorMessage.value = '';
		isValid.value = false;
	}
});
</script>

<style scoped>
.has-error {
	border-color: var(--danger) !important;
}

.error-icon {
	color: var(--danger);
}

.success-icon {
	color: var(--success);
}

.error-message {
	color: var(--danger);
	font-size: 12px;
	margin-top: 4px;
}

.success-message {
	color: var(--success);
	font-size: 12px;
	margin-top: 4px;
}
</style>
