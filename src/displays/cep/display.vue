<template>
	<span :class="{ 'cep-value': true, 'no-value': !hasValue }">
		{{ formattedValue }}
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	value?: string | null;
	showPlaceholder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	showPlaceholder: true,
});

const hasValue = computed(() => {
	return props.value && props.value.trim().length > 0;
});

const formatCEP = (value: string): string => {
	const cleanValue = value.replace(/\D/g, '');
	
	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 2) return cleanValue;
	if (cleanValue.length <= 5) return cleanValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
	
	return cleanValue.slice(0, 8).replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2-$3');
};

const formattedValue = computed(() => {
	if (!hasValue.value) {
		return props.showPlaceholder ? '---.---' : '';
	}

	return formatCEP(props.value!);
});
</script>

<style scoped>
.cep-value {
	font-family: var(--family-sans-serif);
	color: var(--foreground-normal);
}

.cep-value.no-value {
	color: var(--foreground-subdued);
	font-style: italic;
}
</style>
