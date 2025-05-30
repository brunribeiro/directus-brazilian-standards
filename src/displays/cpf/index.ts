import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'brazilian-cpf-display',
	name: 'Brazilian CPF',
	description: 'Display tax IDs in Brazilian format (123.456.789-01)',
	icon: 'person',
	component: DisplayComponent,
	types: ['string'],
	group: 'standard',
	options: [
		{
			field: 'show_placeholder',
			name: 'Show Placeholder for Empty',
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
			field: 'mask_digits',
			name: 'Mask Digits for Privacy',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				note: 'Show as ***.***.***-** for privacy',
			},
			schema: {
				default_value: false,
			},
		},
	],
});
