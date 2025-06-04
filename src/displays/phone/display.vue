<template>
	<span :class="{ 'phone-value': true, 'no-value': !hasValue, 'masked': maskDigits }">
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

const formatPhone = (value: string): string => {
	const cleanValue = value.replace(/\D/g, '');
	
	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 2) return `(${cleanValue}`;
	if (cleanValue.length <= 6) return cleanValue.replace(/(\d{2})(\d{1,4})/, '($1) $2');
	if (cleanValue.length <= 10) return cleanValue.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
	
	return cleanValue.slice(0, 11).replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
};

const formattedValue = computed(() => {
	if (!hasValue.value) {
		return props.showPlaceholder ? '(XX) XXXXX-XXXX' : '';
	}

	if (props.maskDigits) {
		return '(XX) XXXXX-XXXX';
	}

	return formatPhone(props.value!);
});
</script>

<style scoped>
.phone-value {
	font-family: var(--family-sans-serif);
	color: var(--foreground-normal);
}

.phone-value.no-value {
	color: var(--foreground-subdued);
	font-style: italic;
}

.phone-value.masked {
	color: var(--foreground-subdued);
	font-weight: bold;
}
</style> 