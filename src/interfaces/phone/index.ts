import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'brazilian-phone',
	name: 'Brazilian Phone',
	description: 'Brazilian phone number input with automatic formatting and validation ((11) 99999-9999)',
	icon: 'phone',
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
				default_value: '(11) 99999-9999',
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
			field: 'validate_phone',
			name: 'Validate Phone Format',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Enable to validate Brazilian phone number format',
			},
			schema: {
				default_value: true,
			},
		},
	],
}); 