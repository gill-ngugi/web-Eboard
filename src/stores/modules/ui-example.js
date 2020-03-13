export default{
    state: {
        username: '',
        user: {}
    },
    mutations:{
        SET_USERNAME: (state, user)=>{
            state.username = user.username;
        },
        SET_USER: (state, user)=> {
            state.user = user;
        }
    },
    getters: {
        USERNAME: state=>{
            return state.username;
        }
    },
    actions: {
        GET_USER: (context) =>{
            axios.get('user').then(response => {
                context.commit("SET_USER, response.user");
            })
        }
        
    }
}