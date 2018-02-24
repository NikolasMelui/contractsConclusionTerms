import Vue from 'vue';
import Router from 'vue-router';
import MainTemplate from '@/components/MainTemplate';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainTemplate',
      component: MainTemplate,
    },
  ],
});
