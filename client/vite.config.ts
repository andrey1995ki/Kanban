import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default ({mode})=>{
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    const BASE_URL = process.env.VITE_BASE_URL ||''
    return defineConfig({
        plugins: [
            react(),
            svgr()
        ],
        base: `${BASE_URL}`,
        server:{
            watch:{
                usePolling: true
            },
            host: true,
            strictPort: true,
            port: 5173,
            proxy:{
                '/storybook':{
                    target: 'http://localhost:6006/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        }
    })
}
