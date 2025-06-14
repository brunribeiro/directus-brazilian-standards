import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'brazilian-cnpj',
	name: 'Brazilian CNPJ',
	description: 'Brazilian tax ID (CNPJ) input with automatic formatting and validation (XX.XXX.XXX/XXXX-XX)',
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
				default_value: 'XX.XXX.XXX/XXXX-XX',
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
			name: 'Validate CNPJ',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Enable to validate CNPJ using the official algorithm',
			},
			schema: {
				default_value: true,
			},
		},
	],
}); 