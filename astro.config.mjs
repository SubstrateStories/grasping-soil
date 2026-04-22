import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
	site: 'https://graspingsoil.org',
	base,
  	integrations: [svelte()]
});
