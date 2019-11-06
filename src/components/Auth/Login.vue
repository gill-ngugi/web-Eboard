<template>
  <div>

      <div style="margin-left:10%; margin-right:10%; margin-top:2%;">
        <img class="bgimg-1" src="../img/login-bg.jpg">
      
        <div class="quote">
            "MANAGEMENT IS DOING THINGS RIGHT,<br>
            BUT LEADERSHIP IS DOING RIGHT THINGS"
        </div>

        </div>

        <div class="login-form" style="margin-left:60%; width:320px;">
          <span class="image1"><img src="../img/eboard.png" style="width:40%; height:20%; margin-left:5%;"></span>
          <span class="image2"><img src="../img/stl.png" style="width:40%; height: 20%; margin-left:10%"></span>

        <h4>Login to your account: {{ip}}</h4>
        <hr>
        <p style="text-align:center; color:red; font-weight:bold;">{{error}}</p>
          <!-- <form class="form-login" @submit.prevent="sendData"> -->
          <!-- <form class="form-login"> -->
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-paper-plane"></i></span>
                    <input type="text" class="form-control" name="userName" id="userName" placeholder="Username" v-model="input.userName" />
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="password" class="form-control" name="userPassword" id="userPassword" placeholder="Password" v-model="input.userPassword" />
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="number" class="form-control" name="companyCode" id="companyCode" placeholder="Company Code" v-model="input.companyCode" />
                </div>
            </div>    

            <div class="form-group">
                <button v-on:click="sendData()">Send</button>
                <!-- <button type="submit" class="btn btn-danger" style="color:#fff">Log In</button><br> -->
                <!-- <button class="btn btn-danger" style="color:#fff" v-on:click="login()">Log In</button><br> -->
            </div>    
           
            <div class="forgot">
                <p>Forgot Password?</p>
                <!-- <p>{{stl.companyDetail.companyName}}</p>
                <p>{{stl.userInfo.userEmail}}}</p> -->
            </div>

          <!-- </form> -->
        </div>

      <!-- <div class="footer-text">Software Technologies Limited 2011-2019</div> -->

      <!-- </div> -->
    </div>




</template>

<script>
import axios from 'axios';

  export default {
    name: 'Login',

    data(){
      return {
        ip: "",
        input:{
          companyCode: "010",
          model: "requestUserLogin",
          mobileVersion: "11.4.1",
          deviceName: "ipad air 2",
          deviceToken: "b41dfaf1ba018196d5068a0ecc3bde33f83c94131ecf71d053260b944da14612",
          userName : "gngugi",
          userPassword : "gngugi",
          eboardVersion: "2.5.7"  
        },
        error: "",        
        // stl: {},
      }
    },

    mounted(){
       axios({ method: "GET", "url": "https://httpbin.org/ip" }).then(result => {
                this.ip = result.data.origin;
            }, error => {
                console.error(error);
            });
      // axios.get("../assets/json-APIs/requestUserLogin.json");
      // axios.get('http://mealbooking.stl-horizon.com/api/users');
      // axios.get('http://tst-visitors.stl-horizon.com/api/user/login');
      // axios.get('http://192.168.1.34:8000/api/country');
      // axios.get('http://ziptasticapi.com/')
         
         // axios({ method: "POST", "url": "eserver1.stl-horizon.com/api_v9/frontend/web/user/create", "headers": { "content-type": "application/json" } }).then(result => {
          //     this.response = result.data;
          //     console.log(this.response);
          //   }, error => {
          //       console.error(error);
          //   });
    },

    methods: {
       sendData() {
          axios({ method: "POST", "url": "http://eserver1.stl-horizon.com/api_tst_v12/frontend/web/user/create", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
              this.response = result.data;
              console.log(this.response);
          }, error => {
              console.error(error);
          });
      },

      login(){
          // axios.post('http://eserver1.stl-horizon.com/api_tst_v12/frontend/web/user/create',{
          // axios.get('http://mealbooking.stl-horizon.com/api/users',{
          // axios.get('http://localhost/web-Eboard-APIs/requestUserLogin.json')
          // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
          if(this.input.userName != "" && this.input.userPassword != "" && this.input.companyCode != " "){

          axios.get("../assets/json-APIs/requestUserLogin.json", this.input)
          // axios.get('http://tst-visitors.stl-horizon.com/api/student',{
          // axios.post('http://tst-visitors.stl-horizon.com/api/user/login',{
          // axios.get('http://ziptasticapi.com/')
          // axios.get('http://192.168.1.167/apps/mealbooking/public/api/users',{
          // axios.get('http://192.168.1.34:8000/api/country',{
          // axios.post('http://192.168.1.34:8000/api/country',{
            // headers: {
              // 'Access-Control-Allow-Origin': '*',
              // 'Content-Type': 'application/json',
              // 'Accept': 'application/json',
              // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
              // crossdomain:true,
            //   'Access-Control-Allow-Origin': 'http://localhost:8080/login',
            //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            //   'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
            //   'Access-Control-Max-Age': '86400'
            // },
            // proxy: {
              // host: '192.168.1.150',
              // port: 9191
            // }  
            // mode: 'no-cors',
            // withCredentials: true,
            // credentials: 'same-origin',
            // auth: {
              // userName : 'anand1', 
              // userPassword : 'anand1',
              // companyCode : '010',
              // model : 'requestUserLogin'
              // email: 'david.macharia@stl-horizon.com',
              // password: '@Dakima1993',
              // company_code: '100'
              // country_name: 'Lebanon',
              // currency: '87666',
              // phone_code:'ytrf'
            // }
    // })
            // method: 'POST',
            // mode: 'no-cors',
            //   headers: {
            //   'Access-Control-Allow-Origin': '*',
            //   'Content-Type': 'application/json',
            // },
            // withCredentials: true,
            // credentials: 'same-origin',

            // userName : this.userName, 
            // userPassword : this.userPassword,
            // companyCode : this.companyCode,
            // model : this.model
        
        
          .then(response => {
              console.log(this.input.userName),
              console.log(this.input.userPassword),
              console.log(this.input.companyCode),
              // console.log(this.model),
              // console.log(this.response);
              // this.stl = response.data;
              // console.log(this.stl);
              console.log(response);
              // console.log(this.stl.companyDetail.companyName);
              this.$router.push('/');
          })
          .catch(error => {
          // .catch(function(error){
              console.log(error);
              // this.stl = 'An error occured';
              }) 

          //.then(() => this.$router.push('/'))
          //  .then(
          //       console.log(this.userName),
          //       console.log(this.userPassword),
          //       console.log(this.companyCode),
          //       console.log(this.model)
          //       )
          //   .catch(err => console.log(err)) 
         }
          else{
            this.error = "Fill in all credentials";
            console.log("Fill in all credentials");
          }
        }
      },             
    }
</script>

<style scoped>
 .success-message {
    color: green;
  }

  body, html {
    height: 100%;
    margin: 0;
    font: 400 15px/1.8 "Lato", sans-serif;
    color: #777;
    /* background-image: url("../img/login-bg.jpg"); */
    height: 100%;
    position: relative;
    opacity: 1.0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

  .bgimg-1, .bgimg-2, .bgimg-3 {
    position: relative;
    opacity: 1.0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    /* background-image: url("../img/login-bg.jpg"); */
    }

  .caption {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #000;
  }

  .quote {
      position: absolute;
      left: 0;
      top: 34%;
      width: 50%;
      color: #fff;
      margin-left: 11%;
      margin-right:2%;
      font-size:28px;
      font-family: Arial, Helvetica, sans-serif;
      /* letter-spacing: 2px; */
  }

  .footer-text{
    position: absolute;
    left:63%;
    top: 75%;
    width: auto;
    color: #fff;
    margin-left: 3%;
    font-size:15px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 2px;
  }
  
  .caption span.border {
    background-color: #111;
    color: #fff;
    padding: 18px;
    font-size: 25px;
    letter-spacing: 10px;
  }
  
  h3 {
    letter-spacing: 5px;
    text-transform: uppercase;
    font: 20px "Lato", sans-serif;
    color: #111;
  }

 .login-form{
      position: absolute;
      /* width:30%; */
      /* min-width:270px; */
      height:auto;
      background: #fff;
      border-radius: 5px;
      top:29%;
      /* margin-left: 65%; */
  }
   .login-form h4{
      text-align: center;
  }
   .login-form .form-group{
      width:80%;
      margin-left:10%;
      margin-top:7%;
  }

   .login-form .form-group .btn{
    float: right;
    width: 100%;

}
 .login-form .fa-paper-plane {
    width:18px;
}
 .login-form .fa-lock{
    width: 18px;
}
 .login-form .forgot{
    float: right;
    color: red;
    margin-right:10%;
    margin-top: 4%;
    margin-bottom:4%;
}

 .input-group-addon {
    background: #CACFD2;
    width: 25px;
    padding-top: 4px;
    text-align: center;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
 
</style>