import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // TODO don't need this any more?
    plugins: [
        {
            name: 'treat-js-files-as-jsx',
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;
                return transformWithEsbuild(code, id, {
                    loader: 'jsx', // TODO should be tsx or jsx?
                    jsx: 'automatic',
                });
            },
        },
        react(),
    ],
    optimizeDeps: {
        force: true,
        esbuildOptions: {
            // TODO correct?
            loader: {
                '.ts': 'tsx',
                // '.js': 'jsx', '.ts': 'tsx',
            },
        },
    },
});
