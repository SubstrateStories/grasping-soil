import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

const useSubpath = process.env.CI && !process.env.CUSTOM_DOMAIN;

// https://astro.build/config
export default defineConfig({
	site: 'https://graspingsoil.org',
	base: useSubpath ? '/grasping-soil/' : '/',
  	integrations: [svelte()]
});
