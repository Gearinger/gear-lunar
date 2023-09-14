import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router/index'

var app = createApp(App);

app.use(Antd)
    .use(router)
    .mount('#app');
