<template>
	<span :class="{ 'cep-value': true, 'no-value': !hasValue }">
		{{ formattedValue }}
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	value?: string | null;
	show_placeholder?: boolean;
	showPlaceholder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	show_placeholder: true,
	showPlaceholder: undefined,
});

const showPlaceholder = computed(() => {
	if (typeof props.show_placeholder === 'boolean') return props.show_placeholder;
	if (typeof props.showPlaceholder === 'boolean') return props.showPlaceholder;
	return true;
});

const hasValue = computed(() => {
	return Boolean(props.value && props.value.trim().length > 0);
});

const formatCEP = (value: string): string => {
	const cleanValue = value.replace(/\D/g, '');

	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 5) return cleanValue;

	return cleanValue.slice(0, 8).replace(/(\d{5})(\d{1,3})/, '$1-$2');
};

const formattedValue = computed(() => {
	if (!hasValue.value) {
		return showPlaceholder.value ? '#####-###' : '';
	}

	return formatCEP(props.value as string);
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
