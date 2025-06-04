<template>
	<v-input
		:model-value="displayValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:class="{ 'has-error': hasError }"
		@update:model-value="updateValue"
		@blur="onBlur"
		@keydown="onKeyDown"
		maxlength="18"
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
		CNPJ válido
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formatCNPJ, isValidCNPJ, cleanCNPJ } from '../../utils/formatters';

interface Props {
	value?: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validateCnpj?: boolean;
}

interface Emits {
	(event: 'input', value: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	placeholder: 'XX.XXX.XXX/XXXX-XX',
	disabled: false,
	required: false,
	validateCnpj: true,
});

const emit = defineEmits<Emits>();

const hasError = ref(false);
const errorMessage = ref('');
const isValid = ref(false);

const displayValue = computed(() => {
	if (!props.value) return '';
	return formatCNPJ(props.value);
});

const validateValue = (value: string): boolean => {
	hasError.value = false;
	errorMessage.value = '';
	isValid.value = false;
	
	if (!value && props.required) {
		hasError.value = true;
		errorMessage.value = 'CNPJ é obrigatório';
		return false;
	}
	
	if (value && props.validateCnpj) {
		const cleanValue = cleanCNPJ(value);
		
		if (cleanValue.length > 0 && cleanValue.length < 14) {
			hasError.value = true;
			errorMessage.value = 'CNPJ deve ter 14 dígitos';
			return false;
		}
		
		if (cleanValue.length === 14) {
			// Check for repeated digits (like 11111111111111)
			if (/^(\d)\1{13}$/.test(cleanValue)) {
				hasError.value = true;
				errorMessage.value = 'CNPJ inválido';
				return false;
			}
			
			if (!isValidCNPJ(value)) {
				hasError.value = true;
				errorMessage.value = 'CNPJ inválido';
				return false;
			}
			
			isValid.value = true;
		}
	}
	
	return true;
};

const updateValue = (newValue: string) => {
	if (!newValue || newValue.trim() === '') {
		emit('input', null);
		hasError.value = false;
		errorMessage.value = '';
		isValid.value = false;
		return;
	}
	
	const formatted = formatCNPJ(newValue);
	const cleanValue = cleanCNPJ(formatted);
	validateValue(formatted);
	emit('input', cleanValue || null);
};

const onBlur = () => {
	if (props.value) {
		const formatted = formatCNPJ(props.value);
		validateValue(formatted);
	}
};

const onKeyDown = (event: KeyboardEvent) => {
	// Allow: backspace, delete, tab, escape, enter
	if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
		// Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
		(event.ctrlKey === true && [65, 67, 86, 88, 90].indexOf(event.keyCode) !== -1) ||
		// Allow: Cmd+A, Cmd+C, Cmd+V, Cmd+X, Cmd+Z (Mac)
		(event.metaKey === true && [65, 67, 86, 88, 90].indexOf(event.keyCode) !== -1) ||
		// Allow: home, end, left, right, down, up
		(event.keyCode >= 35 && event.keyCode <= 40)) {
		return;
	}
	
	// Only allow numeric keys
	if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && 
		(event.keyCode < 96 || event.keyCode > 105)) {
		event.preventDefault();
	}
};

watch(() => props.value, (newValue) => {
	if (newValue) {
		const formatted = formatCNPJ(newValue);
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
	border-color: rgba(0, 0, 0, 0.3) !important;
}

.error-icon {
	color: rgba(0, 0, 0, 0.6);
}

.success-icon {
	color: rgba(0, 0, 0, 0.6);
}

.error-message {
	color: rgba(0, 0, 0, 0.7);
	font-size: 12px;
	margin-top: 4px;
}

.success-message {
	color: rgba(0, 0, 0, 0.6);
	font-size: 12px;
	margin-top: 4px;
}
</style> 