import { defineConfig, loadEnv, } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import compression from 'vite-plugin-compression';
// https://vite.dev/config/

export default ({ mode }: { mode: string }) => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), tsconfigPaths(),
    compression({
      algorithm: 'gzip',
    }),
    ],
    server: {
      open: true,
      watch: {
        usePolling: true,
      },
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        treeshake: false,
        // output: {
        //   manualChunks(id) {
        //     if (id.includes('node_modules')) {
        //       return 'vendor';
        //     }
        //   },
        // },
        // output: {
        //   manualChunks: {
        //     lodash: globalVendorPackages
        //   }
        // }
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      },
      minify: 'esbuild',
    },
  })
};