<template>
	<span :class="{ 'cpf-value': true, 'no-value': !hasValue, 'masked': maskDigits }">
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

const formatCPF = (value: string): string => {
	const cleanValue = value.replace(/\D/g, '');
	
	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 3) return cleanValue;
	if (cleanValue.length <= 6) return cleanValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
	if (cleanValue.length <= 9) return cleanValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
	
	return cleanValue.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};

const formattedValue = computed(() => {
	if (!hasValue.value) {
		return props.showPlaceholder ? '***.***.**-**' : '';
	}

	if (props.maskDigits) {
		return '***.***.**-**';
	}

	return formatCPF(props.value!);
});
</script>

<style scoped>
.cpf-value {
	font-family: var(--family-sans-serif);
	color: var(--foreground-normal);
}

.cpf-value.no-value {
	color: var(--foreground-subdued);
	font-style: italic;
}

.cpf-value.masked {
	color: var(--foreground-subdued);
	font-weight: bold;
}
</style>
