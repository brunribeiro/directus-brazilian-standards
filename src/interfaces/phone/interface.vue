<template>
	<v-input
		:model-value="displayValue"
		:placeholder="props.placeholder"
		:disabled="props.disabled"
		:class="{ 'has-error': hasError }"
		@update:model-value="updateValue"
		@blur="onBlur"
		@keydown="onKeyDown"
		maxlength="15"
	>
		<template #append v-if="hasError">
			<v-icon name="error" class="error-icon" />
		</template>
		<template #append v-else-if="isValid && value">
			<v-icon name="check_circle" class="success-icon" />
		</template>
	</v-input>
	
	<!-- Validation Messages -->
	<div v-if="hasError && errorMessage" class="error-message">
		<v-icon name="error" />
		{{ errorMessage }}
	</div>
	
	<div v-else-if="isValid && value" class="success-message">
		Telefone válido
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formatPhone, isValidPhone, cleanPhone } from '../../utils/formatters';

interface Props {
	value?: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validatePhone?: boolean;
}

interface Emits {
	(event: 'input', value: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	placeholder: '(11) 99999-9999',
	disabled: false,
	required: false,
	validatePhone: true,
});

const emit = defineEmits<Emits>();

const hasError = ref(false);
const errorMessage = ref('');
const isValid = ref(false);

const displayValue = computed(() => {
	if (!props.value) return '';
	return formatPhone(props.value);
});

const validateValue = (value: string): boolean => {
	hasError.value = false;
	errorMessage.value = '';
	isValid.value = false;
	
	if (!value && props.required) {
		hasError.value = true;
		errorMessage.value = 'Telefone é obrigatório';
		return false;
	}
	
	if (value && props.validatePhone) {
		const cleanValue = cleanPhone(value);
		
		if (cleanValue.length > 0 && cleanValue.length < 10) {
			hasError.value = true;
			errorMessage.value = 'Telefone deve ter pelo menos 10 dígitos';
			return false;
		}
		
		if (cleanValue.length > 11) {
			hasError.value = true;
			errorMessage.value = 'Telefone deve ter no máximo 11 dígitos';
			return false;
		}
		
		if (cleanValue.length >= 10) {
			if (!isValidPhone(value)) {
				hasError.value = true;
				errorMessage.value = 'Formato de telefone inválido';
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
	
	const formatted = formatPhone(newValue);
	const cleanValue = cleanPhone(formatted);
	validateValue(formatted);
	emit('input', cleanValue || null);
};

const onBlur = () => {
	if (props.value) {
		const formatted = formatPhone(props.value);
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
	
	// Only allow numbers
	if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && 
		(event.keyCode < 96 || event.keyCode > 105)) {
		event.preventDefault();
	}
};

watch(() => props.value, (newValue) => {
	if (newValue) {
		const formatted = formatPhone(newValue);
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

.error-message,
.success-message {
	font-size: 12px;
	margin-top: 4px;
}
</style> 