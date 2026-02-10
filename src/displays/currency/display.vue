<template>
	<span :class="{ 'currency-value': true, 'no-value': !hasValue }">
		{{ formattedValue }}
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	value?: number | null;
	show_symbol?: boolean;
	showSymbol?: boolean;
	precision?: number;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	show_symbol: true,
	showSymbol: undefined,
	precision: 2,
});

const showSymbol = computed(() => {
	if (typeof props.show_symbol === 'boolean') return props.show_symbol;
	if (typeof props.showSymbol === 'boolean') return props.showSymbol;
	return true;
});

const hasValue = computed(() => {
	return props.value !== null && props.value !== undefined && !Number.isNaN(props.value);
});

const formattedValue = computed(() => {
	if (!hasValue.value) {
		return showSymbol.value ? 'R$ --' : '--';
	}

	const formatter = new Intl.NumberFormat('pt-BR', {
		style: showSymbol.value ? 'currency' : 'decimal',
		currency: 'BRL',
		minimumFractionDigits: props.precision,
		maximumFractionDigits: props.precision,
	});

	return formatter.format(props.value as number);
});
</script>

<style scoped>
.currency-value {
	font-family: var(--theme--fonts--monospace--font-family);
	font-weight: 500;
	color: var(--foreground-normal);
}

.currency-value.no-value {
	color: var(--foreground-subdued);
	font-style: italic;
}
</style>
