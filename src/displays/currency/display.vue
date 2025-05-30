<template>
	<span :class="{ 'currency-value': true, 'no-value': !hasValue }">
		{{ formattedValue }}
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	value?: number | null;
	showSymbol?: boolean;
	precision?: number;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	showSymbol: true,
	precision: 2,
});

const hasValue = computed(() => {
	return props.value !== null && props.value !== undefined && !isNaN(props.value);
});

const formattedValue = computed(() => {
	if (!hasValue.value) {
		return props.showSymbol ? 'R$ --' : '--';
	}

	const formatter = new Intl.NumberFormat('pt-BR', {
		style: props.showSymbol ? 'currency' : 'decimal',
		currency: 'BRL',
		minimumFractionDigits: props.precision,
		maximumFractionDigits: props.precision,
	});

	return formatter.format(props.value!);
});
</script>

<style scoped>
.currency-value {
	font-weight: 500;
	color: var(--foreground-normal);
}

.currency-value.no-value {
	color: var(--foreground-subdued);
	font-style: italic;
}
</style>
