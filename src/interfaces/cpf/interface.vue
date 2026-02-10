<template>
	<v-input
		:model-value="displayValue"
		:placeholder="props.placeholder"
		:disabled="props.disabled"
		:class="{ 'has-error': hasError }"
		@update:model-value="updateValue"
		@blur="onBlur"
		@keydown="onKeyDown"
		maxlength="14"
	>
		<template #append v-if="hasError">
			<v-icon name="error" class="error-icon" />
		</template>
		<template #append v-else-if="isValid && props.value">
			<v-icon name="check_circle" class="success-icon" />
		</template>
	</v-input>

	<div v-if="hasError && errorMessage" class="error-message">
		<v-icon name="error" />
		{{ errorMessage }}
	</div>

	<div v-else-if="isValid && props.value" class="success-message">
		CPF válido
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { cleanCPF, formatCPF, isValidCPF } from '../../utils/formatters';

interface Props {
	value?: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validate_cpf?: boolean;
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
	validate_cpf: true,
	validateCpf: undefined,
});

const emit = defineEmits<Emits>();

const hasError = ref(false);
const errorMessage = ref('');
const isValid = ref(false);

const shouldValidate = computed(() => {
	if (typeof props.validate_cpf === 'boolean') return props.validate_cpf;
	if (typeof props.validateCpf === 'boolean') return props.validateCpf;
	return true;
});

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

	if (value && shouldValidate.value) {
		const cleanValue = cleanCPF(value);

		if (cleanValue.length > 0 && cleanValue.length < 11) {
			hasError.value = true;
			errorMessage.value = 'CPF deve ter 11 dígitos';
			return false;
		}

		if (cleanValue.length === 11) {
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
	if (!newValue || newValue.trim() === '') {
		emit('input', null);
		hasError.value = false;
		errorMessage.value = '';
		isValid.value = false;
		return;
	}

	const formatted = formatCPF(newValue);
	const cleanValue = cleanCPF(formatted);

	validateValue(formatted);
	emit('input', cleanValue || null);
};

const onBlur = () => {
	if (props.value) {
		const formatted = formatCPF(props.value);
		validateValue(formatted);
	}
};

const onKeyDown = (event: KeyboardEvent) => {
	if (
		[8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
		(event.ctrlKey === true && [65, 67, 86, 88, 90].indexOf(event.keyCode) !== -1) ||
		(event.metaKey === true && [65, 67, 86, 88, 90].indexOf(event.keyCode) !== -1) ||
		(event.keyCode >= 35 && event.keyCode <= 40)
	) {
		return;
	}

	if (
		(event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
		(event.keyCode < 96 || event.keyCode > 105)
	) {
		event.preventDefault();
	}
};

watch(
	() => props.value,
	(newValue) => {
		if (newValue) {
			const formatted = formatCPF(newValue);
			validateValue(formatted);
		} else {
			hasError.value = false;
			errorMessage.value = '';
			isValid.value = false;
		}
	}
);
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
