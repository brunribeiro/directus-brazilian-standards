import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'brazilian-currency',
	name: 'Brazilian Currency (BRL)',
	description: 'Brazilian Real currency input with live formatting and mask',
	icon: 'attach_money',
	component: InterfaceComponent,
	types: ['decimal', 'float', 'integer'],
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
				default_value: 'R$ 0,00',
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
			field: 'min_value',
			name: 'Minimum Value',
			type: 'decimal',
			meta: {
				width: 'half',
				interface: 'input',
				note: 'Minimum allowed value in BRL',
			},
		},
		{
			field: 'max_value',
			name: 'Maximum Value',
			type: 'decimal',
			meta: {
				width: 'half',
				interface: 'input',
				note: 'Maximum allowed value in BRL',
			},
		},
	],
});
