import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    alias: {
        'vue': 'vue/dist/vue.esm-bundler.js' // 使用模板字符串时需要设置
    },
    plugins: [
        vue(),
    ]
})
