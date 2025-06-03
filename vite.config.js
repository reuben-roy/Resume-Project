import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                blog: resolve(__dirname, 'pages/blog/blog.html'),
                profession: resolve(__dirname, 'pages/profession/profession.html'),
                anime: resolve(__dirname, 'pages/blog/anime/anime.html'),
                'books-fiction': resolve(__dirname, 'pages/blog/books-fiction/books-fiction.html'),
                'books-non-fiction': resolve(__dirname, 'pages/blog/books-non-fiction/books-non-fiction.html'),
                movies: resolve(__dirname, 'pages/blog/movies/movies.html'),
                'tv-series': resolve(__dirname, 'pages/blog/tv-series/tv-series.html'),
            },
        },
        outDir: 'dist',
    },
});``