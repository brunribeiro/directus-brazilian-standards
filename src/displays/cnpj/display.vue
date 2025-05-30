<template>
	<span :class="{ 'cnpj-value': true, 'no-value': !hasValue, 'masked': maskDigits }">
		{{ formattedValue }}
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	value?: string | null;
	showPlaceholder?: boolean;
	maskDigits?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	showPlaceholder: true,
	maskDigits: false,
});

const hasValue = computed(() => {
	return props.value && props.value.trim().length > 0;
});

const formatCNPJ = (value: string): string => {
	const cleanValue = value.replace(/\D/g, '');
	
	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 2) return cleanValue;
	if (cleanValue.length <= 5) return cleanValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
	if (cleanValue.length <= 8) return cleanValue.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
	if (cleanValue.length <= 12) return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
	
	return cleanValue.slice(0, 14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
};

const formattedValue = computed(() => {
	if (!hasValue.value) {
		return props.showPlaceholder ? '**.***.***/****-**' : '';
	}

	if (props.maskDigits) {
		return '**.***.***/****-**';
	}

	return formatCNPJ(props.value!);
});
</script>

<style scoped>
.cnpj-value {
	font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
	color: var(--foreground-normal);
}

.cnpj-value.no-value {
	color: var(--foreground-subdued);
	font-style: italic;
}

.cnpj-value.masked {
	color: var(--foreground-subdued);
	font-weight: bold;
}
</style> 