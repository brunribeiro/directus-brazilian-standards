import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'brazilian-cnpj-display',
	name: 'Brazilian CNPJ',
	description: 'Display tax IDs in Brazilian format (XX.XXX.XXX/XXXX-XX)',
	icon: 'business',
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
				note: 'Show as **_.___.___/****-** for privacy',
			},
			schema: {
				default_value: false,
			},
		},
	],
}); 