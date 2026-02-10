// Brazilian Currency Formatter
export function formatBRLCurrency(value: string | number): string {
	if (!value && value !== 0) return 'R$ 0,00';

	const numericValue =
		typeof value === 'string'
			? parseFloat(value.replace(/[^\d]/g, '')) / 100
			: value;

	if (isNaN(numericValue)) return 'R$ 0,00';

	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(numericValue);
}

export function formatBRLCurrencyInput(input: string): string {
	const numbers = input.replace(/\D/g, '');

	if (!numbers) return '';

	const cents = Number.parseInt(numbers, 10);
	const reais = cents / 100;

	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(reais);
}

export function parseBRLCurrency(formattedValue: string): number {
	const cleanValue = formattedValue.replace(/[^\d]/g, '');
	if (!cleanValue) return 0;
	return Number.parseFloat(cleanValue) / 100;
}

// CEP Formatter
export const cleanCEP = (value: string | null | undefined): string => {
	if (!value) return '';
	return String(value).replace(/\D/g, '');
};

export const formatCEP = (value: string | null | undefined): string => {
	if (!value) return '';
	const cleanValue = cleanCEP(value);

	if (cleanValue.length <= 5) {
		return cleanValue;
	}

	return cleanValue.replace(/(\d{5})(\d{1,3})/, '$1-$2');
};

export const validateCEP = (value: string | null | undefined): boolean => {
	if (!value) return false;
	const cleanValue = cleanCEP(value);
	return cleanValue.length === 8 && /^\d{8}$/.test(cleanValue);
};

// CPF Formatter
export function formatCPF(value: string): string {
	if (!value) return '';
	const cleanValue = value.replace(/\D/g, '');

	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 3) return cleanValue;
	if (cleanValue.length <= 6)
		return cleanValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
	if (cleanValue.length <= 9)
		return cleanValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');

	return cleanValue
		.slice(0, 11)
		.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

export function isValidCPF(cpf: string): boolean {
	if (!cpf) return false;
	const cleanCPF = cpf.replace(/\D/g, '');

	if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
		return false;
	}

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += Number.parseInt(cleanCPF.charAt(i), 10) * (10 - i);
	}
	let digit1 = 11 - (sum % 11);
	if (digit1 > 9) digit1 = 0;

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += Number.parseInt(cleanCPF.charAt(i), 10) * (11 - i);
	}
	let digit2 = 11 - (sum % 11);
	if (digit2 > 9) digit2 = 0;

	return (
		digit1 === Number.parseInt(cleanCPF.charAt(9), 10) &&
		digit2 === Number.parseInt(cleanCPF.charAt(10), 10)
	);
}

export function cleanCPF(cpf: string): string {
	if (!cpf) return '';
	return cpf.replace(/\D/g, '');
}

// CNPJ Formatter
export function formatCNPJ(value: string): string {
	if (!value) return '';
	const cleanValue = value.replace(/\D/g, '');

	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 2) return cleanValue;
	if (cleanValue.length <= 5)
		return cleanValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
	if (cleanValue.length <= 8)
		return cleanValue.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
	if (cleanValue.length <= 12)
		return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');

	return cleanValue
		.slice(0, 14)
		.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
}

export function isValidCNPJ(cnpj: string): boolean {
	if (!cnpj) return false;
	const cleanCNPJ = cnpj.replace(/\D/g, '');

	if (cleanCNPJ.length !== 14 || /^(\d)\1{13}$/.test(cleanCNPJ)) {
		return false;
	}

	let size = cleanCNPJ.length - 2;
	let numbers = cleanCNPJ.substring(0, size);
	const digits = cleanCNPJ.substring(size);
	let sum = 0;
	let pos = size - 7;

	for (let i = size; i >= 1; i--) {
		sum += Number.parseInt(numbers.charAt(size - i), 10) * pos--;
		if (pos < 2) pos = 9;
	}

	let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (result !== Number.parseInt(digits.charAt(0), 10)) {
		return false;
	}

	size = size + 1;
	numbers = cleanCNPJ.substring(0, size);
	sum = 0;
	pos = size - 7;

	for (let i = size; i >= 1; i--) {
		sum += Number.parseInt(numbers.charAt(size - i), 10) * pos--;
		if (pos < 2) pos = 9;
	}

	result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	return result === Number.parseInt(digits.charAt(1), 10);
}

export function cleanCNPJ(cnpj: string): string {
	if (!cnpj) return '';
	return cnpj.replace(/\D/g, '');
}

// Phone Formatter
export function formatPhone(value: string): string {
	if (!value) return '';
	const cleanValue = value.replace(/\D/g, '');

	if (cleanValue.length === 0) return '';
	if (cleanValue.length <= 2) return `(${cleanValue}`;
	if (cleanValue.length <= 6)
		return cleanValue.replace(/(\d{2})(\d{1,4})/, '($1) $2');
	if (cleanValue.length <= 10)
		return cleanValue.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');

	return cleanValue
		.slice(0, 11)
		.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
}

export function isValidPhone(phone: string): boolean {
	if (!phone) return false;
	const cleanPhone = phone.replace(/\D/g, '');

	if (cleanPhone.length < 10 || cleanPhone.length > 11) {
		return false;
	}

	const areaCode = Number.parseInt(cleanPhone.substring(0, 2), 10);
	const validAreaCodes = [
		11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34,
		35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62,
		63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
		86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
	];

	if (!validAreaCodes.includes(areaCode)) {
		return false;
	}

	if (cleanPhone.length === 11) {
		const thirdDigit = Number.parseInt(cleanPhone.charAt(2), 10);
		if (thirdDigit !== 9) {
			return false;
		}
	}

	if (cleanPhone.length === 10) {
		const thirdDigit = Number.parseInt(cleanPhone.charAt(2), 10);
		if (![2, 3, 4, 5, 6, 7, 8, 9].includes(thirdDigit)) {
			return false;
		}
	}

	return true;
}

export function cleanPhone(phone: string): string {
	if (!phone) return '';
	return phone.replace(/\D/g, '');
}

// API proxy helpers
const API_PROXY_BASE_PATH = '/brazilian-standards-proxy';

export interface DirectusApiClient {
	get<T = unknown>(
		url: string,
		config?: { params?: Record<string, unknown> }
	): Promise<{ data: T }>;
}

interface APIErrorPayload {
	error?: string;
	message?: string;
}

interface APIErrorResponse {
	response?: {
		status?: number;
		data?: APIErrorPayload;
	};
	message?: string;
}

const getApiErrorMessage = (error: unknown, fallback: string): string => {
	const apiError = error as APIErrorResponse;

	if (apiError?.response?.data?.error) {
		return apiError.response.data.error;
	}

	if (apiError?.response?.data?.message) {
		return apiError.response.data.message;
	}

	if (apiError?.message) {
		return apiError.message;
	}

	return fallback;
};

export interface CNPJApiResponse {
	cnpj_raiz: string;
	razao_social: string;
	capital_social: string;
	responsavel_federativo: string;
	atualizado_em: string;
	porte: {
		id: string;
		descricao: string;
	};
	natureza_juridica: {
		id: string;
		descricao: string;
	};
	qualificacao_do_responsavel: {
		id: number;
		descricao: string;
	};
	socios: Array<{
		cpf_cnpj_socio: string;
		nome: string;
		tipo: string;
		data_entrada: string;
		faixa_etaria: string;
		qualificacao_socio: {
			id: number;
			descricao: string;
		};
	}>;
	estabelecimento: {
		cnpj: string;
		cnpj_raiz: string;
		cnpj_ordem: string;
		cnpj_digito_verificador: string;
		tipo: string;
		nome_fantasia: string;
		situacao_cadastral: string;
		data_situacao_cadastral: string;
		data_inicio_atividade: string;
		tipo_logradouro: string;
		logradouro: string;
		numero: string;
		complemento?: string;
		bairro: string;
		cep: string;
		ddd1: string;
		telefone1: string;
		ddd2?: string;
		telefone2?: string;
		email: string;
		atividade_principal: {
			id: string;
			secao: string;
			divisao: string;
			grupo: string;
			classe: string;
			subclasse: string;
			descricao: string;
		};
		estado: {
			id: number;
			nome: string;
			sigla: string;
			ibge_id: number;
		};
		cidade: {
			id: number;
			nome: string;
			ibge_id: number;
			siafi_id: string;
		};
	};
}

export interface CEPApiResponse {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
	erro?: boolean;
}

/**
 * Lookup company data using the internal Directus endpoint proxy.
 */
export async function lookupCNPJ(
	api: DirectusApiClient,
	cnpj: string,
	token?: string
): Promise<CNPJApiResponse> {
	const cleanCnpj = cleanCNPJ(cnpj);
	if (!cleanCnpj || cleanCnpj.length !== 14) {
		throw new Error('CNPJ inválido. Informe 14 dígitos.');
	}

	try {
		const response = await api.get<CNPJApiResponse>(
			`${API_PROXY_BASE_PATH}/cnpj/${cleanCnpj}`,
			token ? { params: { token } } : undefined
		);

		return response.data;
	} catch (error) {
		throw new Error(
			getApiErrorMessage(error, 'Erro ao consultar CNPJ no proxy interno.')
		);
	}
}

/**
 * Lookup CEP data using the internal Directus endpoint proxy.
 */
export async function lookupCEP(
	api: DirectusApiClient,
	cep: string
): Promise<CEPApiResponse> {
	const cleanCepValue = cleanCEP(cep);
	if (!cleanCepValue || cleanCepValue.length !== 8) {
		throw new Error('CEP deve ter 8 dígitos.');
	}

	try {
		const response = await api.get<CEPApiResponse>(
			`${API_PROXY_BASE_PATH}/cep/${cleanCepValue}`
		);

		return response.data;
	} catch (error) {
		throw new Error(
			getApiErrorMessage(error, 'Erro ao consultar CEP no proxy interno.')
		);
	}
}

/**
 * Get nested value from object using dot notation.
 */
export function getNestedValue(obj: unknown, path: string): unknown {
	if (!obj || !path) return undefined;

	return path
		.split('.')
		.reduce<unknown>((current, key) => {
			if (current && typeof current === 'object') {
				return (current as Record<string, unknown>)[key];
			}

			return undefined;
		}, obj);
}

/**
 * Apply field mapping from API response to form fields.
 */
export function applyFieldMapping(
	apiResponse: CNPJApiResponse | CEPApiResponse,
	mapping: Record<string, string>
): Record<string, unknown> {
	const result: Record<string, unknown> = {};

	for (const [formField, apiExpression] of Object.entries(mapping)) {
		try {
			let value: unknown;

			if (apiExpression.includes('+')) {
				value = evaluateConcatenationExpression(apiResponse, apiExpression);
			} else {
				value = getNestedValue(apiResponse, apiExpression);
			}

			if (typeof value === 'string' && value.trim()) {
				value = formatTextValue(value);
			}

			if (value !== undefined && value !== null && value !== '') {
				result[formField] = value;
			}
		} catch {
			// Ignore invalid expressions and continue mapping other fields.
		}
	}

	return result;
}

/**
 * Evaluate concatenation expressions like "field1 + ' ' + field2 + ', ' + field3".
 */
export function evaluateConcatenationExpression(
	apiResponse: CNPJApiResponse | CEPApiResponse,
	expression: string
): string {
	const parts = expression.split('+').map((part) => part.trim());

	return parts
		.map((part) => {
			const cleanPart = part.replace(/^['\"]|['\"]$/g, '');

			if (part.startsWith('"') || part.startsWith("'")) {
				return cleanPart;
			}

			const value = getNestedValue(apiResponse, cleanPart);

			if (typeof value === 'string' && value.trim()) {
				return formatTextValue(value);
			}

			return value ? String(value) : '';
		})
		.filter((part) => part !== '')
		.join('');
}

// Text Formatting Utilities
export function toTitleCase(str: string): string {
	if (!str) return '';

	const lowercaseWords = [
		'a',
		'as',
		'o',
		'os',
		'e',
		'de',
		'da',
		'das',
		'do',
		'dos',
		'em',
		'na',
		'nas',
		'no',
		'nos',
		'para',
		'por',
		'com',
		'sem',
		'sob',
		'sobre',
		'entre',
		'até',
		'desde',
		'durante',
		'contra',
	];

	return str
		.toLowerCase()
		.split(' ')
		.map((word, index) => {
			if (index === 0) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}

			if (lowercaseWords.includes(word.toLowerCase())) {
				return word.toLowerCase();
			}

			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
}

export function formatTextValue(value: unknown): string {
	if (!value) return '';

	const strValue = String(value).trim();

	const uppercaseCount =
		(strValue.match(/[A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]/g) || []).length;
	const totalLetters =
		(strValue.match(/[A-Za-záàâãéèêíìîóòôõúùûç]/g) || []).length;

	if (totalLetters > 0 && uppercaseCount / totalLetters > 0.7) {
		return toTitleCase(strValue);
	}

	return strValue;
}
