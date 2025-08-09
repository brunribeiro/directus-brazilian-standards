import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'brazilian-cpf',
	name: 'Brazilian CPF',
	description: 'With formatting and validation',
	icon: 'person',
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
				default_value: '123.456.789-01',
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
			field: 'validate_cpf',
			name: 'Validate CPF Format',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Válido formato do CPF (11 dígitos)',
			},
			schema: {
				default_value: true,
			},
		},
	],
});
