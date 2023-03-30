// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: preprocess(),
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$houdini: './$houdini',
			$graphql: './src/lib/graphql',
			$modules: './src/lib/modules'
		}
	}
};

export default config;
