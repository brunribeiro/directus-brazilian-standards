import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'brazilian-cpf',
	name: 'Brazilian CPF',
	description: 'Brazilian tax ID (CPF) input with automatic formatting and validation (123.456.789-01)',
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
			name: 'Validate CPF',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Enable to validate CPF using the official algorithm',
			},
			schema: {
				default_value: true,
			},
		},
	],
});
