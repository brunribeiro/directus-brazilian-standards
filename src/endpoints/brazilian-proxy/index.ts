import { defineEndpoint } from '@directus/extensions-sdk';

const CNPJ_API_BASE_URL = 'https://publica.cnpj.ws/cnpj';
const CEP_API_BASE_URL = 'https://viacep.com.br/ws';
const FETCH_TIMEOUT_MS = 10000;

interface ExternalAPIError {
	status: number;
	message: string;
}

const isValidDigits = (value: string, length: number): boolean => {
	return new RegExp(`^\\d{${length}}$`).test(value);
};

const mapStatusToMessage = (status: number, fallback: string): string => {
	if (status === 400) return 'Parâmetros inválidos.';
	if (status === 404) return 'Registro não encontrado.';
	if (status === 429) return 'Limite de requisições excedido. Tente novamente em instantes.';
	if (status >= 500) return 'Serviço externo indisponível no momento.';
	return fallback;
};

const fetchJson = async (
	url: string,
	init?: RequestInit
): Promise<{ status: number; data: unknown }> => {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

	try {
		const response = await fetch(url, {
			...init,
			signal: controller.signal,
		});

		const data = (await response.json()) as unknown;

		if (!response.ok) {
			throw {
				status: response.status,
				message: mapStatusToMessage(
					response.status,
					`Falha na requisição ao serviço externo (${response.status}).`
				),
			} as ExternalAPIError;
		}

		return {
			status: response.status,
			data,
		};
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw {
				status: 504,
				message: 'Tempo limite excedido ao consultar serviço externo.',
			} as ExternalAPIError;
		}

		throw error;
	} finally {
		clearTimeout(timeout);
	}
};

export default defineEndpoint((router) => {
	router.get('/cnpj/:cnpj', async (req, res) => {
		const cnpj = String(req.params.cnpj ?? '').replace(/\D/g, '');

		if (!isValidDigits(cnpj, 14)) {
			return res.status(400).json({
				error: 'CNPJ inválido. Informe 14 dígitos numéricos.',
			});
		}

		const tokenQuery = req.query.token;
		const token =
			typeof tokenQuery === 'string' && tokenQuery.trim().length > 0
				? tokenQuery.trim()
				: undefined;

		const headers: Record<string, string> = {
			Accept: 'application/json',
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		try {
			const { data } = await fetchJson(`${CNPJ_API_BASE_URL}/${cnpj}`, {
				headers,
			});

			return res.json(data);
		} catch (error) {
			const apiError = error as ExternalAPIError;
			const status = apiError?.status || 502;

			return res.status(status).json({
				error: apiError?.message || 'Erro inesperado ao consultar CNPJ.',
			});
		}
	});

	router.get('/cep/:cep', async (req, res) => {
		const cep = String(req.params.cep ?? '').replace(/\D/g, '');

		if (!isValidDigits(cep, 8)) {
			return res.status(400).json({
				error: 'CEP inválido. Informe 8 dígitos numéricos.',
			});
		}

		try {
			const { data } = await fetchJson(`${CEP_API_BASE_URL}/${cep}/json/`, {
				headers: {
					Accept: 'application/json',
				},
			});

			if (
				typeof data === 'object' &&
				data !== null &&
				'erro' in data &&
				(data as { erro?: boolean }).erro
			) {
				return res.status(404).json({
					error: 'CEP não encontrado.',
				});
			}

			return res.json(data);
		} catch (error) {
			const apiError = error as ExternalAPIError;
			const status = apiError?.status || 502;

			return res.status(status).json({
				error: apiError?.message || 'Erro inesperado ao consultar CEP.',
			});
		}
	});
});
