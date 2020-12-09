import { login, logout, getInfo } from '@api/user';
import { getToken, setToken, removeToken } from '@/api/user';
import { resetRouter } from '../../router';
import { Object } from 'core-js';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
  };
};
const state = getDefaultState();

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password })
        .then((response) => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject('Verification failed,please login again.');
          }

          const { name, avatar } = data;
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken();
          resetRouter();
          commit('RESET_STATE');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

resetToken({commit}){
    return new Promise(resolve=>{
        removeToken()
        commit('RESET_STATE')
        resolve()
    })
}

export default {
  namespced: true,
  state,
  mutations,
  actions,
};
