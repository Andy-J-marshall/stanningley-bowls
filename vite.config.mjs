import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        {
            name: 'treat-ts-files-as-tsx',
            async transform(code, id) {
                if (!id.match(/src\/.*\.ts$/)) return null;
                return transformWithEsbuild(code, id, {
                    loader: 'tsx',
                    jsx: 'automatic',
                });
            },
        },
        react(),
    ],
    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                '.ts': 'tsx',
            },
        },
    },
});
