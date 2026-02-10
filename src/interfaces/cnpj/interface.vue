<template>
	<div class="brazilian-cnpj-interface">
		<div class="cnpj-input-wrapper">
			<v-input
				:model-value="displayValue"
				:placeholder="placeholder || '12.345.678/0001-90'"
				:disabled="disabled"
				:required="required"
				:class="{ 'has-error': hasError }"
				@update:model-value="updateValue"
				@blur="validateInput"
				@paste="handlePaste"
			/>

			<v-button
				v-if="enableApiLookup && displayValue && displayValue.length >= 18"
				class="search-button"
				icon
				secondary
				:loading="apiStatus?.type === 'loading'"
				:disabled="hasError || !isValidCnpj"
				@click="performApiLookup"
				v-tooltip="'Consultar dados da empresa'"
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
	cleanCNPJ,
	formatCNPJ,
	isValidCNPJ,
	lookupCNPJ,
	type DirectusApiClient,
} from '../../utils/formatters';

interface Props {
	value: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	validate_cnpj?: boolean;
	enable_api_lookup?: boolean;
	api_token?: string;
	auto_fill_mapping?: string | Record<string, string>;
}

interface Emits {
	(event: 'input', value: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: '12.345.678/0001-90',
	disabled: false,
	required: false,
	validate_cnpj: true,
	enable_api_lookup: false,
	api_token: '',
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
const isValidCnpj = ref(false);
const apiStatus = ref<{
	type: 'loading' | 'success' | 'error';
	icon: string;
	message: string;
} | null>(null);

const displayValue = computed(() => {
	if (!props.value) return '';
	return formatCNPJ(props.value);
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
	const cleaned = cleanCNPJ(newValue);
	const limited = cleaned.slice(0, 14);

	emit('input', limited || null);

	hasError.value = false;
	errorMessage.value = '';
	apiStatus.value = null;

	if (limited && limited.length === 14) {
		isValidCnpj.value = isValidCNPJ(limited);
	} else {
		isValidCnpj.value = false;
	}
};

const handlePaste = (event: ClipboardEvent) => {
	event.preventDefault();
	const pastedText = event.clipboardData?.getData('text') || '';
	updateValue(pastedText);
};

const validateInput = () => {
	if (!props.validate_cnpj) return;

	const cleaned = cleanCNPJ(props.value || '');
	if (!cleaned) return;

	if (cleaned.length !== 14) {
		hasError.value = true;
		errorMessage.value = 'CNPJ deve ter 14 dígitos';
		isValidCnpj.value = false;
		return;
	}

	if (!isValidCNPJ(cleaned)) {
		hasError.value = true;
		errorMessage.value = 'CNPJ inválido';
		isValidCnpj.value = false;
		return;
	}

	hasError.value = false;
	errorMessage.value = '';
	isValidCnpj.value = true;
};

const performApiLookup = async () => {
	if (!enableApiLookup.value || !props.value) return;

	const cleaned = cleanCNPJ(props.value);
	if (!cleaned || cleaned.length !== 14 || !isValidCNPJ(cleaned)) {
		return;
	}

	apiStatus.value = {
		type: 'loading',
		icon: 'refresh',
		message: 'Consultando dados da empresa...',
	};

	try {
		const response = await lookupCNPJ(api, cleaned, props.api_token);
		const mappedFields = applyFieldMapping(response, fieldMapping.value);
		const fieldsUpdated = updateMappedFields(mappedFields);

		apiStatus.value = {
			type: 'success',
			icon: 'check',
			message:
				fieldsUpdated > 0
					? `Dados carregados para ${response.razao_social} (${fieldsUpdated} campos atualizados).`
					: `Dados carregados para ${response.razao_social}, mas sem campos mapeados.`,
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
.brazilian-cnpj-interface {
	position: relative;
}

.cnpj-input-wrapper {
	display: flex;
	align-items: center;
	gap: 8px;
}

.cnpj-input-wrapper :deep(.v-input) {
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
