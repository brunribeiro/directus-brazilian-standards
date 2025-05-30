import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'brazilian-cep-display',
	name: 'Brazilian CEP',
	description: 'Display postal codes in Brazilian format (12.345-678)',
	icon: 'location_on',
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
	],
});
