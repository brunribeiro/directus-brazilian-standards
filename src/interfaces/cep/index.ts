import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'brazilian-cep',
	name: 'Brazilian CEP',
	description: 'With formatting, optional API lookup and field mapping',
	icon: 'location_on',
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
				default_value: '12.345-678',
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
			field: 'validate_cep',
			name: 'Validate CEP Format',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Válido formato do CEP (8 dígitos)',
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
				note: 'Busca automática de endereço via ViaCEP',
			},
			schema: {
				default_value: false,
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
						"address": "logradouro + ', ' + complemento + ' ' + bairro",
						"city": "localidade",
						"state": "uf",
						"neighborhood": "bairro",
						"street": "logradouro",
						"complement": "complemento"
					}, null, 2),
				},
				note: 'Mapeamento de campos: {"campo_formulario": "campo_api"}',
			},
		}
	],
});
