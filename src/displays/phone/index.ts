import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'brazilian-phone-display',
	name: 'Brazilian Phone',
	description: 'Display phone numbers in Brazilian format ((11) 99999-9999)',
	icon: 'phone',
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
				note: 'Show as (XX) XXXXX-XXXX for privacy',
			},
			schema: {
				default_value: false,
			},
		},
	],
}); 