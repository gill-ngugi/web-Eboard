import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import UserData from './components/repository/UserData'

Vue.use(Vuex)

export default new Vuex.Store ({

    // The Vuex state will hold our authentication status, jwt token and user info.
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        userId: {},
        companyId: {}
    },

    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        
        auth_success(state, token, userId, companyId){
            state.status = 'success'
            state.token = token
            state.userId = userId
            state.companyId = companyId
        },

        auth_error(state){
            state.status = 'error'
        },

        logout(state){
            state.status = ''
            state.token = ''
        }
    },

    actions: {
        login({commit}, userId, companyId){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: UserData.getBaseUrl(), data: userId,companyId, method: 'POST'})
                    .then(response => {
                        if(response.data.success == 1){
                            const token = response.data.accessToken;
                            localStorage.setItem('token', token)
                            // UserData.setAccessToken(token); 
                            const userId = response.data.userId;
                            UserData.setUserId(userId);
                            const companyId = response.data.companyDetail.companyId;
                            UserData.setCompanyId(companyId); 
                            axios.defaults.headers.common['Authorization'] = token;
                            commit('auth_success', token, userId, companyId)
                            resolve(response)
                        }
                        else{
                            const login_errors = response.data.message;
                            UserData.setLoginErrors(login_errors);
                            // this.error = response.data.message;
                        }
                    })
                    .catch(error => {
                        commit('auth_error');
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },

        logout({commit}){
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        }
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
})