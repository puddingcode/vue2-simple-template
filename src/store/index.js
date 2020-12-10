import Vue from 'vue';
import Vuex from 'vuex';

import getters from '@/store/getters';
import app from '@/store/modules/app';
import settings from '@/store/modules/settings';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
});
