<template>
	<v-input
		:model-value="displayValue"
		:placeholder="props.placeholder"
		:disabled="props.disabled"
		:class="{ 'has-error': hasError }"
		@update:model-value="updateValue"
		@focus="onFocus"
		@blur="onBlur"
		@keydown="onKeyDown"
	>
		<template #prepend>
			<span class="currency-symbol">R$</span>
		</template>
		<template #append v-if="hasError">
			<v-icon name="error" class="error-icon" />
		</template>
	</v-input>

	<div v-if="hasError" class="error-message">
		{{ errorMessage }}
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { formatBRLCurrencyInput, parseBRLCurrency } from '../../utils/formatters';

const formatCurrency = (value: number): string => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
};

interface Props {
	value?: number | null;
	placeholder?: string;
	disabled?: boolean;
	min_value?: number;
	max_value?: number;
	minValue?: number;
	maxValue?: number;
}

interface Emits {
	(event: 'input', value: number | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	placeholder: 'R$ 0,00',
	disabled: false,
	min_value: undefined,
	max_value: undefined,
	minValue: undefined,
	maxValue: undefined,
});

const emit = defineEmits<Emits>();

const isFocused = ref(false);
const internalValue = ref('');
const hasError = ref(false);
const errorMessage = ref('');

const minAllowed = computed(() => {
	if (typeof props.min_value === 'number') return props.min_value;
	if (typeof props.minValue === 'number') return props.minValue;
	return undefined;
});

const maxAllowed = computed(() => {
	if (typeof props.max_value === 'number') return props.max_value;
	if (typeof props.maxValue === 'number') return props.maxValue;
	return undefined;
});

const displayValue = computed(() => {
	if (isFocused.value) {
		return internalValue.value;
	}

	if (props.value !== null && props.value !== undefined) {
		return formatCurrency(props.value);
	}

	return '';
});

const validateValue = (value: number): boolean => {
	hasError.value = false;
	errorMessage.value = '';

	if (minAllowed.value !== undefined && value < minAllowed.value) {
		hasError.value = true;
		errorMessage.value = `Valor mínimo: ${formatCurrency(minAllowed.value)}`;
		return false;
	}

	if (maxAllowed.value !== undefined && value > maxAllowed.value) {
		hasError.value = true;
		errorMessage.value = `Valor máximo: ${formatCurrency(maxAllowed.value)}`;
		return false;
	}

	return true;
};

const updateValue = (newValue: string) => {
	const numbersOnly = newValue.replace(/\D/g, '');

	if (!numbersOnly) {
		internalValue.value = '';
		hasError.value = false;
		errorMessage.value = '';
		emit('input', null);
		return;
	}

	const formatted = formatBRLCurrencyInput(numbersOnly);
	internalValue.value = formatted;

	const numericValue = parseBRLCurrency(formatted);

	validateValue(numericValue);
	emit('input', numericValue);
};

const onFocus = () => {
	isFocused.value = true;
	if (props.value !== null && props.value !== undefined) {
		internalValue.value = formatCurrency(props.value);
	} else {
		internalValue.value = '';
	}
};

const onBlur = () => {
	isFocused.value = false;

	if (props.value !== null && props.value !== undefined) {
		validateValue(props.value);
	}

	nextTick(() => {
		internalValue.value = '';
	});
};

const onKeyDown = (event: KeyboardEvent) => {
	if (
		[8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
		(event.keyCode === 65 && event.ctrlKey === true) ||
		(event.keyCode === 67 && event.ctrlKey === true) ||
		(event.keyCode === 86 && event.ctrlKey === true) ||
		(event.keyCode === 88 && event.ctrlKey === true)
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
		if (!isFocused.value && newValue !== null && newValue !== undefined) {
			validateValue(newValue);
		}
	}
);
</script>

<style scoped>
.has-error {
	border-color: var(--danger) !important;
}

.currency-symbol {
	font-weight: 500;
	color: var(--foreground-subdued);
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
