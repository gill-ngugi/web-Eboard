<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar dark color="blue">
                        <v-toolbar-title>
                            Login
                        </v-toolbar-title>
                    </v-toolbar>    
                    
                    <v-card-text>
                        <v-text-field label="Username" type="text" name="userName" outlined v-model="userName" required>                            
                        </v-text-field>

                        <v-text-field label="Password" type="password" name="userPassword" outlined v-model="userPassword" required>
                        </v-text-field>

                        <v-text-field label="Company Code" type="number" name="companyCode" outlined v-model="companyCode" required>
                        </v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>                        
                        <v-btn to="/" color="indigo" dark rounded>Dashboard</v-btn>
                            <v-spacer></v-spacer>
                        <v-btn @click.prevent="logIn" class="ma-2" color="primary" dark rounded>
                            Login <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card-actions>                    
                </v-card>
            </v-flex>
        </v-layout>

        <!-- <h2>Login Page</h2>
        <form class="form-signin" @submit.prevent="login">
        <label>Email</label><br>
           <input placeholder="Username" type="text" v-model="userName" required/><br>
      
        <label>Password</label><br>
          <input placeholder="Password" type="password" v-model="userPassword" required/><br>
      
        <label>Company Code</label><br>        
          <input placeholder="Company Code" type="number" v-model="companyCode" required/><br>
      
          <button class="btn btn-primary" type="submit">Login</button>    
          <div class="success-message">this will be green</div>  
        </form> -->

    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',

    data(){
        return{            
            userName: "",
            userPassword: "",
            companyCode: "",            
            model: "requestUserLogin"            
        }
    },
    methods:{
        logIn(){
            // console.log(this.userName);
            // console.log(this.userPassword);
            // console.log(this.companyCode);
            // console.log(this.model);
            axios.post(`http://eserver1.stl-horizon.com/api_tst_v11/frontend/web/user/create`)
               .then(response => {
                    this.login = response.data;
                    console.log(response.data);
                    let token = response.data.user.api_token;
                    localStorage.setItem('token', token);
                    this.$router.push('/');
                })
                
            }
        }
    };
</script>

<style>

</style>