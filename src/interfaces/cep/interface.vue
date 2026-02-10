<template>
	<div class="brazilian-cep-interface">
		<div class="cep-input-wrapper">
			<v-input
				:model-value="displayValue"
				:placeholder="placeholder || '12345-678'"
				:disabled="disabled"
				:required="required"
				:class="{ 'has-error': hasError }"
				@update:model-value="updateValue"
				@blur="validateInput"
				@paste="handlePaste"
			/>

			<v-button
				v-if="enableApiLookup && displayValue && displayValue.length >= 9"
				class="search-button"
				icon
				secondary
				:loading="apiStatus?.type === 'loading'"
				:disabled="hasError || !isValidCep"
				@click="performApiLookup"
				v-tooltip="'Consultar endereço'"
			>
				<v-icon name="search" />
			</v-button>
		</div>

		<div v-if="enableApiLookup && apiStatus" class="api-status" :class="apiStatus.type">
			<v-icon :name="apiStatus.icon" small />
			<span>{{ apiStatus.message }}</span>
		</div>

		<div v-if="hasError" class="error-message">
			<v-icon name="warning" small />
			<span>{{ errorMessage }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useApi } from '@directus/extensions-sdk';
import { computed, inject, ref, watch } from 'vue';
import {
	applyFieldMapping,
	cleanCEP,
	formatCEP,
	lookupCEP,
	type DirectusApiClient,
	validateCEP,
} from '../../utils/formatters';

interface Props {
	value: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validate_cep?: boolean;
	enable_api_lookup?: boolean;
	auto_fill_mapping?: string | Record<string, string>;
}

interface Emits {
	(event: 'input', value: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: '12345-678',
	disabled: false,
	required: false,
	validate_cep: true,
	enable_api_lookup: false,
	auto_fill_mapping: '{}',
});

const emit = defineEmits<Emits>();
const api = useApi() as DirectusApiClient;

const values = inject('values', ref<Record<string, unknown>>({}));
const updateValues = inject<((updates: Record<string, unknown>) => void) | null>(
	'updateValues',
	null
);

const hasError = ref(false);
const errorMessage = ref('');
const isValidCep = ref(false);
const apiStatus = ref<{
	type: 'loading' | 'success' | 'error';
	icon: string;
	message: string;
} | null>(null);

const displayValue = computed(() => {
	if (!props.value) return '';
	return formatCEP(props.value);
});

const enableApiLookup = computed(() => props.enable_api_lookup);

const fieldMapping = computed<Record<string, string>>(() => {
	try {
		if (typeof props.auto_fill_mapping === 'string') {
			const parsed = JSON.parse(props.auto_fill_mapping || '{}');
			if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
				return parsed as Record<string, string>;
			}
			return {};
		}

		if (
			props.auto_fill_mapping &&
			typeof props.auto_fill_mapping === 'object' &&
			!Array.isArray(props.auto_fill_mapping)
		) {
			return props.auto_fill_mapping;
		}

		return {};
	} catch {
		return {};
	}
});

const updateMappedFields = (mappedFields: Record<string, unknown>): number => {
	const entries = Object.entries(mappedFields);
	if (entries.length === 0) return 0;

	if (typeof updateValues === 'function') {
		updateValues(mappedFields);
		return entries.length;
	}

	if (values?.value && typeof values.value === 'object') {
		for (const [fieldName, value] of entries) {
			(values.value as Record<string, unknown>)[fieldName] = value;
		}
		return entries.length;
	}

	return 0;
};

const updateValue = (newValue: string) => {
	const cleaned = cleanCEP(newValue);
	const limited = cleaned.slice(0, 8);

	emit('input', limited || null);

	hasError.value = false;
	errorMessage.value = '';
	apiStatus.value = null;

	if (limited && limited.length === 8) {
		isValidCep.value = validateCEP(limited);
	} else {
		isValidCep.value = false;
	}
};

const handlePaste = (event: ClipboardEvent) => {
	event.preventDefault();
	const pastedText = event.clipboardData?.getData('text') || '';
	updateValue(pastedText);
};

const validateInput = () => {
	if (!props.validate_cep) return;

	const cleaned = cleanCEP(props.value || '');
	if (!cleaned) return;

	if (cleaned.length !== 8) {
		hasError.value = true;
		errorMessage.value = 'CEP deve ter 8 dígitos';
		isValidCep.value = false;
		return;
	}

	if (!validateCEP(cleaned)) {
		hasError.value = true;
		errorMessage.value = 'CEP inválido';
		isValidCep.value = false;
		return;
	}

	hasError.value = false;
	errorMessage.value = '';
	isValidCep.value = true;
};

const performApiLookup = async () => {
	if (!enableApiLookup.value || !props.value) return;

	const cleaned = cleanCEP(props.value);
	if (!cleaned || cleaned.length !== 8 || !validateCEP(cleaned)) {
		return;
	}

	apiStatus.value = {
		type: 'loading',
		icon: 'refresh',
		message: 'Consultando endereço...',
	};

	try {
		const response = await lookupCEP(api, cleaned);
		const mappedFields = applyFieldMapping(response, fieldMapping.value);
		const fieldsUpdated = updateMappedFields(mappedFields);

		apiStatus.value = {
			type: 'success',
			icon: 'check',
			message:
				fieldsUpdated > 0
					? `Endereço localizado (${fieldsUpdated} campos atualizados).`
					: 'Endereço localizado, mas sem campos mapeados.',
		};
	} catch (error) {
		apiStatus.value = {
			type: 'error',
			icon: 'warning',
			message:
				error instanceof Error ? error.message : 'Erro na consulta da API',
		};
	} finally {
		setTimeout(() => {
			apiStatus.value = null;
		}, 5000);
	}
};

watch(
	() => props.value,
	() => validateInput()
);
</script>

<style scoped>
.brazilian-cep-interface {
	position: relative;
}

.cep-input-wrapper {
	display: flex;
	align-items: center;
	gap: 8px;
}

.cep-input-wrapper :deep(.v-input) {
	flex: 1;
}

.search-button {
	flex-shrink: 0;
	--v-button-width: 44px;
	--v-button-height: 44px;
}

.search-button:not(.loading):hover {
	--v-button-background-color: var(--primary);
	--v-button-color: var(--primary-foreground);
}

.has-error :deep(.v-input input) {
	border-color: var(--danger) !important;
}

.loading-message,
.success-message,
.error-message {
	font-size: 12px;
	margin-top: 4px;
	display: flex;
	align-items: center;
	gap: 4px;
}

.spin {
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
