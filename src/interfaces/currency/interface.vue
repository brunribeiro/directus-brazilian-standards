<template>
	<v-input
		:model-value="displayValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:class="{ 'has-error': hasError }"
		@update:model-value="updateValue"
		@focus="onFocus"
		@blur="onBlur"
		@keydown="onKeyDown"
	>
		<template #append v-if="hasError">
			<v-icon name="error" class="error-icon" />
		</template>
	</v-input>
	
	<div v-if="hasError" class="error-message">
		{{ errorMessage }}
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { formatBRLCurrencyInput, parseBRLCurrency } from '../../utils/formatters';

interface Props {
	value?: number | null;
	placeholder?: string;
	disabled?: boolean;
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
	minValue: undefined,
	maxValue: undefined,
});

const emit = defineEmits<Emits>();

const isFocused = ref(false);
const internalValue = ref('');
const hasError = ref(false);
const errorMessage = ref('');

const displayValue = computed(() => {
	if (isFocused.value) {
		return internalValue.value;
	}
	
	if (props.value !== null && props.value !== undefined) {
		return formatBRLCurrencyInput(props.value.toString().replace('.', ''));
	}
	
	return '';
});

const validateValue = (value: number): boolean => {
	hasError.value = false;
	errorMessage.value = '';
	
	if (props.minValue !== undefined && value < props.minValue) {
		hasError.value = true;
		errorMessage.value = `Valor mínimo: ${formatBRLCurrencyInput(props.minValue.toString().replace('.', ''))}`;
		return false;
	}
	
	if (props.maxValue !== undefined && value > props.maxValue) {
		hasError.value = true;
		errorMessage.value = `Valor máximo: ${formatBRLCurrencyInput(props.maxValue.toString().replace('.', ''))}`;
		return false;
	}
	
	return true;
};

const updateValue = (newValue: string) => {
	// Remove all non-numeric characters for processing
	const numbersOnly = newValue.replace(/\D/g, '');
	
	// Format the display value
	const formatted = formatBRLCurrencyInput(numbersOnly);
	internalValue.value = formatted;
	
	// Convert to decimal value
	const numericValue = parseBRLCurrency(formatted);
	
	// Validate the value
	if (numericValue > 0) {
		validateValue(numericValue);
	} else {
		hasError.value = false;
		errorMessage.value = '';
	}
	
	// Emit the numeric value
	emit('input', numericValue || null);
};

const onFocus = () => {
	isFocused.value = true;
	if (props.value !== null && props.value !== undefined) {
		internalValue.value = formatBRLCurrencyInput(props.value.toString().replace('.', ''));
	} else {
		internalValue.value = '';
	}
};

const onBlur = () => {
	isFocused.value = false;
	
	// Final validation on blur
	if (props.value !== null && props.value !== undefined) {
		validateValue(props.value);
	}
	
	nextTick(() => {
		internalValue.value = '';
	});
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
	
	// Ensure that it is a number and stop the keypress
	if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && 
		(event.keyCode < 96 || event.keyCode > 105)) {
		event.preventDefault();
	}
};

// Watch for external value changes
watch(() => props.value, (newValue) => {
	if (!isFocused.value && newValue !== null && newValue !== undefined) {
		validateValue(newValue);
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

.error-message {
	color: var(--danger);
	font-size: 12px;
	margin-top: 4px;
}
</style>
