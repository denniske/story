import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
// import basicSsl from '@vitejs/plugin-basic-ssl';
import vercel from "@astrojs/vercel/serverless";
const env = loadEnv('', process.cwd(), 'STORYBLOK');
import aws from "astro-sst";

// https://astro.build/config
export default defineConfig({
    integrations: [storyblok({
        accessToken: env.STORYBLOK_TOKEN,
        bridge: env.STORYBLOK_IS_PREVIEW === 'yes',
        components: {
            page: 'storyblok/Page',
            feature: 'storyblok/Feature',
            grid: 'storyblok/Grid',
            teaser: 'storyblok/Teaser',
            hero: 'storyblok/Hero',
            config: 'storyblok/Config',
            'popular-articles': 'storyblok/PopularArticles',
            'all-articles': 'storyblok/AllArticles',
            article: 'storyblok/Article'
        }
    }), tailwind()],
    output: env.STORYBLOK_IS_PREVIEW === 'yes' ? 'hybrid' : 'static', // 'hybrid' | 'static' | 'server'
    ...(env.STORYBLOK_ENV === 'development' && {
        vite: {
            plugins: [],
            server: { }
        }
    }),
    ...(env.STORYBLOK_IS_PREVIEW === 'yes' && {
        // adapter: vercel(),
        adapter: aws(),
    }),
    // ...(env.STORYBLOK_ENV === 'development' && {
    //     vite: {
    //         plugins: [basicSsl()],
    //         server: {
    //             https: true
    //         }
    //     }
    // }),
});