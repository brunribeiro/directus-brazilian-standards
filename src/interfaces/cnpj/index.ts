import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'brazilian-cnpj',
	name: 'Brazilian CNPJ',
	description: 'With formatting, optional API lookup and field mapping',
	icon: 'business',
	component: InterfaceComponent,
	types: ['string'],
	group: 'standard',
	options: [
		{
			field: 'placeholder',
			name: 'Placeholder',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
			schema: {
				default_value: '12.345.678/0001-90',
			},
		},
		{
			field: 'disabled',
			name: 'Disabled',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
			},
			schema: {
				default_value: false,
			},
		},
		{
			field: 'required',
			name: 'Required',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
			},
			schema: {
				default_value: false,
			},
		},
		{
			field: 'validate_cnpj',
			name: 'Validate CNPJ Format',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Válido formato do CNPJ (14 dígitos)',
			},
			schema: {
				default_value: true,
			},
		},
		{
			field: 'enable_api_lookup',
			name: 'Enable API Lookup',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Busca automática de dados via ReceitaWS',
			},
			schema: {
				default_value: false,
			},
		},
		{
			field: 'api_token',
			name: 'API Token (Optional)',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
				note: 'Token da API CNPJ.ws (opcional)',
			},
		},
		{
			field: 'auto_fill_mapping',
			name: 'Auto-fill Field Mapping',
			type: 'json',
			meta: {
				width: 'full',
				interface: 'input-code',
				options: {
					language: 'json',
					template: JSON.stringify({
						"company_name": "nome",
						"fantasy_name": "fantasia",
						"email": "email",
						"phone": "telefone",
						"address": "logradouro + ', ' + numero + ' - ' + bairro",
						"city": "municipio",
						"state": "uf",
						"cep": "cep"
					}, null, 2),
				},
				note: 'Mapeamento de campos: {"campo_formulario": "campo_api"}',
			},
		}
	],
}); 