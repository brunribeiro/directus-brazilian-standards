import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'brazilian-currency-display',
	name: 'Brazilian Currency (BRL)',
	description: 'Display currency values in Brazilian Real format (R$ 1.234,56)',
	icon: 'attach_money',
	component: DisplayComponent,
	types: ['decimal', 'float', 'integer'],
	group: 'standard',
	options: [
		{
			field: 'show_symbol',
			name: 'Show Currency Symbol',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
			},
			schema: {
				default_value: true,
			},
		},
		{
			field: 'precision',
			name: 'Decimal Places',
			type: 'integer',
			meta: {
				width: 'half',
				interface: 'input',
				note: 'Number of decimal places to display',
			},
			schema: {
				default_value: 2,
			},
		},
	],
});
