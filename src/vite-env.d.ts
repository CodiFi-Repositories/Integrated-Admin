/// <reference types="vite/client" />
import store from './store/index.ts'
import router from './router/index.ts'
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store:store,
        $route:router,
        $router:router,
    }
}