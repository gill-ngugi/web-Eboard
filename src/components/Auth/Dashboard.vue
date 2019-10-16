<template>
    <div>

        <div class = "nav-menu parent" style=" height:45px; width:98%; padding:0px; padding-top:0.3%; min-width:1200px; overflow:auto; margin-left:1%; margin-right:1%; margin-bottom:1%;">
            <div class="left-buttons" style="margin-left:10px;">
                <button class="btn btn-lg" text v-on:click="seen1 = !seen1">
                    STL Vision
                    <span class="input-group-addon"><i class="fa fa-chevron-down"></i></span>                            
                </button>
            </div>    
            <div class="filler"></div>
                <img class="bgimg-1" src="../img/eboard_Logo_new@2x.png" style="height:75%; width:auto; padding-top:5px">
            <div class="filler"></div>
            <div class="right-buttons">
                <button class="btn btn-lg" text v-on:click="seen2 = !seen2; ">English</button>
                <button class="btn btn-lg" @click="reloadPage"><v-icon color="#ffffff">mdi-refresh</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen4 = !seen4;"><v-icon color="#ffffff">mdi-magnify</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen5 = !seen5"><v-icon color="#ffffff">mdi-contact-mail</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen6 = !seen6"><v-icon color="#ffffff">mdi-dip-switch</v-icon></button>
            </div>
        </div>

        <div class="fjk" style="min-width:1200px; overflow:auto;">
            <div class="col-left" style="width:20%; height:900px; overflow:auto; margin-left:1%; margin-right:1%; float:left; position:relative;">
                <div v-for="(item, index) in even(dashboardMenuList)" :key="index">
                    <router-link :to="{name : item.menuTitle}" style="text-decoration:none;" :style="{color:'rgb(' + item.menuColor + ')'}"> 
                        <div class="left-menu" style="border-top: 5px solid">
                            <div class="input-group" >
                                <span class="input-group-addon">
                                    <img v-bind:src="item.menuImageUrl"  v-bind:alt="item.menuTitle" v-bind:style="{width:'60px', height:'50px' }">
                                    <!-- <img v-bind:src="{ 'background-image': 'url(' + item.menuImageUrl + ')' }" v-bind:alt="item.menuTitle"> -->
                                    <!-- <i class="fa fa-briefcase" style="font-size:48px;"></i> -->
                                    </span>
                                <v-spacer></v-spacer>       
                                <p> {{item.menuTitle}}</p>
                            </div>                        
                        </div>  
                    </router-link>
                </div>
            </div>

            <div class="right" style="width:77%; height:900px; overflow:hidden; margin-right:1%; float:left; position:relative">
                <div class="col-right-top" style="padding:1%; width:100%; height:35%;">
                   
                    <div class="input-group" style="color: #27ae60; font-weight:bold;">
                        <span class="input-group-addon"><v-icon color="#27ae60">mdi-file-document</v-icon></span>
                        <p style="margin-left:20px; margin-right:20px;">My Inbox</p> 
                        <v-spacer></v-spacer>                        
                        <button class="btn btn-lg" text @click="reloadPage"><v-icon color="#27ae60">mdi-refresh</v-icon></button>
                    </div>


                    <table class="table table-striped scroll" style="width:100%;">
                        <thead>
                            <!-- <tr style="background-color:#27ae60; color:#ffffff;"> -->
                            <tr style="background-color:#27ae60; color:#ffffff;">
                                <th style="">No.</th>
                                <th style="padding-right:10px;"></th>
                                <th style="padding-right:415px;">Name</th>
                                <th style="padding-right:45px;">Size</th>
                                <th style="padding-right:10px;">Created On</th>
                                <th style="padding-right:40px;">Briefcase</th>
                            </tr>
                        </thead>

                        <tbody style="width:100%">                            
                            <tr v-for="(item, index) in getRecentDocuments.recentDocumentsList" :key="index">
                                <td>{{ index + 1 + "." }}</td>
                                <td>    
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                </td>
                                <td style="">
                                     <a v-bind:href="item.itemUrl">
                                        {{ item.itemName }}
                                    </a>
                                    <!-- <a v-on:click="getLink()">
                                        {{item.itemName}}
                                        item.itemCreatedOn
                                    </a> -->
                                </td>
                                <td style="">
                                    {{ item.itemSize | prettyBytes }} 
                                    <!-- {{ 15364878 | prettyBytes }} -->
                                </td>
                                <td style="" >
                                    {{ parseInt(item.itemCreatedOn, 10) |  moment('DD-MMM-YYYY') }}
                                    <!-- {{ 	1570064727 |  moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
                                    {{ 	1570064727 |  moment('DD-MMM-YYYY hh:mm A') }} -->
                                    <!-- {{ item.itemCreatedOn }} -->                                    
                                </td>
                                <td style="padding-right:10px;">
                                    <button class="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                   
                </div>

                <div class="right-bottom" style="width:100%; height:64%; margin-top:1%;">
                    <div class="col-right-bottom-left" style="width:35%; height:100%; margin-right:1%; float:left; position:relative;">
                            <div v-if="test" class="input-group" style="width:100%;">
                                <div class="parent">
                                    <div class="left-buttons">
                                        <v-icon size="40" style="color: #e33333; margin-top:4px; font-weight:bold; display:inline;">mdi-bell-outline</v-icon>
                                        <p v-on:click="test = !test" style="margin-left:9px; font-size:25px; color: #e33333; font-weight:bold; cursor: pointer; display:inline;">Notifications</p> 
                                    </div>
                                    <div class="filler"></div>   
                                    <div class="right-buttons">                                    
                                        <p v-on:click="test = !test" style="margin-right:9px; font-size:20px; color: #e33333; cursor: pointer; display:inline;">Tasks</p> 
                                        <span class="input-group-addon" style="font-size:17px; font-weight:bold; color: #e33333; margin-top:4px; display:inline;"><i class="fa fa-chevron-right"></i></span>
                                    </div>
                                </div>

                                <div style = "height:500px; overflow:auto;">
                                    <div class="parent" style="padding:4%; padding-bottom:1%;" v-for="(notification, index) in getLatestNotifications.notificationsList" :key="index">
                                        <div class="left-buttons">
                                            <v-icon color="#E74343" style="margin-top:25px; margin-right:70px; ">mdi-square</v-icon>
                                        </div>
                                        <div class="right-buttons">    
                                            <p style="font-size:21.5px;">{{ notification.notificationTitle }}</p>
                                            <p style="font-size:17px;">{{"Due on "}} {{ parseInt(notification.notificationDateTime, 10) | moment('DD-MMM-YYYY') }}</p>
                                            <p style="font-size:17px;">{{ notification.companyName }}</p>
                                        </div>
                                        <hr>
                                    </div>
                                </div>                                                              
                            </div>



                        <div v-else class="input-group" style="width:100%;">
                                <div class="parent">
                                    <div class="left-buttons">
                                        <v-icon size="40" style="color: #e33333; margin-top:4px; font-weight:bold; display:inline;">mdi-bell-outline</v-icon>
                                        <p v-on:click="test = !test" style="margin-left:9px; font-size:25px; color: #e33333; font-weight:bold; cursor: pointer; display:inline;">Tasks</p> 
                                    </div>
                                    <div class="filler"></div>   
                                    <div class="right-buttons">                                    
                                        <p v-on:click="test = !test" style="margin-right:9px; font-size:20px; color: #e33333; cursor: pointer; display:inline;">Notifications</p> 
                                        <span class="input-group-addon" style="font-size:17px; font-weight:bold; color: #e33333; margin-top:4px; display:inline;"><i class="fa fa-chevron-right"></i></span>
                                    </div>
                                </div>

                                <div style = "height:500px; overflow:auto;">
                                    <div class="parent" style="padding:4%; padding-bottom:1%;" v-for="(task, index) in getLatestNotifications.taskList" :key="index">
                                        <div class="left-buttons">
                                            <v-icon color="#E74343" style="margin-top:25px; margin-right:70px; ">mdi-radiobox-marked</v-icon>
                                        </div>
                                        <div class="right-buttons">    
                                            <p style="font-size:21.5px;">{{ task.taskTitle }}</p>
                                            <p style="font-size:17px;">{{"Due on "}} {{ parseInt(task.taskDateTime, 10) | moment('DD-MMM-YYYY') }}</p>
                                            <p style="font-size:17px;">{{ task.companyName }}</p>
                                        </div>
                                        <hr>
                                    </div>
                                </div>                                                              
                            </div>






                            <!-- <div class="input-group" style="">
                                    <span class="input-group-addon" ><v-icon style="color: #e33333; margin-top:4px; font-size:22px; font-weight:bold;">mdi-bell-outline</v-icon></span>
                                    <p v-on:click="test = !test" style="margin-left:9px; font-size:19px; color: #e33333; font-weight:bold; cursor: pointer;">Tasks</p> 
                                        <v-spacer></v-spacer>
                                    <p v-on:click="test = !test" style="margin-right:9px; color: #e33333; cursor: pointer">Notifications</p> 
                                    <span class="input-group-addon" style="font-size:13px; font-weight:bold; margin-top:4px; color: #e33333;"><i class="fa fa-chevron-right"></i></span>
                               
                                <div style="overflow:auto;">
                                    <span style="margin:0px; padding:0px;" v-for="(task, index) in getLatestNotifications.taskList" :key="index">
                                        <div class="row" style="width:100%; margin:0px; padding:0px;">
                                            <div class="col-md-2" style=" margin:0px; padding:0px;">
                                                <v-icon color="#E74343" style="margin-top:25px;">mdi-radiobox-marked</v-icon>
                                            </div>
                                            <div class="col-md-10" style="margin:0px; padding:0px;">
                                                <p style="font-size:17px; margin:0px; padding:0px;">{{ task.taskTitle }}</p> 
                                                <p style="font-size:12px; margin:0px; padding:0px;">{{"Due on "}} {{ parseInt(task.taskDateTime, 10) | moment('DD-MMM-YYYY') }}</p> 
                                                <p style="font-size:12px; margin:0px; padding:0px;">{{ task.companyName }}</p>
                                            </div>
                                        </div>   
                                        <v-divider></v-divider>
                                    </span>    
                                    <p>TEST TEST</p>
                                </div>  
                            </div> -->
                    </div>

                    <div class="col-right-bottom-right" style="padding:1%; width:64%; height:100%; float:left; position:relative; overflow:auto;">
                        <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" />                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
     var moment = require('moment');
    import axios from 'axios';
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';


    export default{
        data: () => ({

            items: [
                { title: 'Computer Warehouse Group' },
                { title: 'STL Vision Botswana' },
                { title: 'STL Vision Nairobi' },
                { title: 'Vision Uganda' },
                { title: 'Finserve Africa' },
                { title: 'Deloite' },
            ],
             languages: [
                { title: 'English' },
                { title: 'French' },
                { title: 'Amharic' },
                { title: 'Portugese' }
            ],
             navDrawer: [
                { title: 'Home', icon: 'mdi-home-city' },
                { title: 'My Account', icon: 'mdi-account' },
                { title: 'Users', icon: 'mdi-account-group-outline' },
            ],
            tasks: [
                {title: 'Prepare a report for FY 2019-2020', date: 'Due on 31-Dec-2020', mark:'STL Training Env.'},
                {title: 'Finalize on budgets for FY 2019-2020', date: 'Due on 31-Dec-2020', mark:'STL Training Env.'},
                {title: 'To prepare a Variance Report', date: 'Due on 31-Dec-2020', mark:'STL Training Env.'},
                {title: 'Prepare advert for new CEO position', date: 'Due on 31-Dec-2020', mark:'STL Training Env.'}
            ],
            notifications: [
                {title: 'Upcoming HR & Admin Committee', date: 'Due on 22-Oct-2020', mark:'STL Vision'},
                {title: 'Finalize on budgets for FY 2019-2020', date: 'Due on 31-Oct-2020', mark:'STL Vision'},
                {title: 'To prepare a Variance Report', date: 'Due on 27-Oct-2020', mark:'STL Vision'},
                {title: 'Prepare advert for new CEO position', date: 'Due on 9-Nov-2020', mark:'STL Vision'}
            ],

            seen: false,
            seen1: false,
            seen2: false,
            seen3: true,
            seen4: false,
            seen5: false,
            seen6: false,
            test: true,
            
            showMessages: false,

            calendarPlugins: [ dayGridPlugin ],

            requestUserLogin : [],
            userInfo : [],
            dashboardMenuList : [],

            moment: moment,

            date: 1570064727,
      
        }),

        mounted() {
          
        },

        methods: {
            reloadPage(){
                window.location.reload();
            },          
            
            convertDate(date, format) {
                return moment(this.date).format(format)
            },
            convertToUtc(date, format) {
                return moment(this.date).utc().format(format)
            },
          
            getRequestUserLogin(){
                axios.get("../assets/json-APIs/requestUserLogin.json")
                    .then(response => {
                        this.requestUserLogin = response.data;
                        this.userInfo = (JSON.parse(JSON.stringify(this.requestUserLogin.userInfo)));
                        this.dashboardMenuList = this.requestUserLogin.dashboardMenuList;
                       })

                    .catch(error => {
                        console.log(error);
                    })
                },

            getCompanyList(){
                axios.get("../assets/json-APIs/getCompanyList.json")
                    .then(response => {
                        this.getCompanyList = response.data;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getLatestNotifications(){
                axios.get("../assets/json-APIs/getLatestNotifications.json")
                    .then(response => {
                        this.getLatestNotifications = response.data;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getEboardUpdates(){
                axios.get("../assets/json-APIs/getEboardUpdates.json")
                    .then(response => {
                        this.getEboardUpdates = response.data;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getRecentDocuments(){
                axios.get("../assets/json-APIs/getRecentDocuments.json")
                    .then(response => {
                        this.getRecentDocuments = response.data;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },
          
            getLink(){
                let routeData = this.$router.resolve({name: this.getRecentDocuments.recentDocumentsList.itemUrl, query: {data: this.getRecentDocuments.recentDocumentsList.itemUrl}});
                window.open(routeData.href, '_blank');
            },  

            even: function(dashboardMenuList) {
                // Set slice() to avoid to generate an infinite loop!
                return dashboardMenuList.slice().sort(function(a, b) {
                    return a.menuId - b.menuId;
                });
            },

            postData(){
                const dt = { data: { value: "gdfg1df2g2121dgfdg" }};
                const request = axios.post("../assets/json-APIs/requestUserLogin.json", dt);
                console.log(request);
            },
        
        },
      
        beforeMount(){
            this.getRequestUserLogin();
            this.getCompanyList();
            this.getLatestNotifications();
            this.getEboardUpdates();
            this.getRecentDocuments();
        },

        components: {
            FullCalendar // make the <FullCalendar> tag available
        },

    }
</script>


<style scoped>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
 
    .wrap{
        width:100%;
        margin-left:2.3%;
        position: relative;
    }

    .nav-menu{
        margin-top:0px; 
        background-color: #e33333;
        height: 45px;
        padding-left:10px;
    }

    .nav-menu .btn{
        background-color:#e33333;
        border:none;
        padding:0px;    
        margin-right:15px;
        color:white;
        outline:none;
    }

    .col-left{
        align-content: center;
        z-index: -1;
    } 

    .col-left .left-menu{
        background-color: #f5f5f5 ;
        align-content: center;
        padding: 3%;
        margin-bottom:10px;
        font-size:24px;
    }

    .col-right{
        float:left;
        width:73%;
        overflow:hidden;
        height: auto;
        margin-top:1%;
        position: relative;
        z-index: -1;
    }

    .col-right th{
        padding:5px;
    }

    .col-right td{
        padding: 3px;
    }

    .col-right-top{
        height:230px;
        background-color: #f5f5f5;
        margin-bottom: 15px;
        padding: 10px;
        border-top: 5px solid #27ae60;
    }

    .col-right-bottom{
        height:430px;
        background-color:#ffffff;
    }

    .col-right-bottom-left{
        /* width: 40%;
        height: 430px; */
        background-color: #f5f5f5;
        /* margin-right:1%;
        float:left; */
        /* padding:1%; */
    }

    .col-right-bottom-right{
        width: 59%;
        height: 430px;
        background-color: #f5f5f5;
        float:left;
        padding:1%;
    }
    .col-right-top .btn{
        padding: 3px;
        width: 100px;
    }

    .menu-row-icon-six{
        margin:0px;
        padding:0px;
        color:#e33333;
    }

    table.scroll {
        width: 100%; 
        border-spacing: 0;
    }

    table.scroll tbody,
    table.scroll thead { 
        display: block; 
    }

    table.scroll tbody {
        height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    thead tr th { 
        height: 30px;
        line-height: 30px;
        /* width: 180px; */
        /*text-align: left;*/
    }

    tbody tr td {
        /* width: 20%; Optional */
        /* border-right: 1px solid black; */
        /* overflow: hidden; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* width: 180px; */
        /* max-width: 230px; */
    }

    tbody td:last-child, thead th:last-child {
        border-right: none;
    }

    button:focus {
        outline: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
    }

    a{
        text-decoration: none;
        color:#000000;
    }

    a:hover{
        color:#27ae60;
    }

    .parent {
        display: flex;
        /* border: 1px solid red; */
        width:100%;
        height: auto;
        padding:2%;
    }

    .left-buttons {
    /* width: 50px; */
    /* background: pink; */
    }

    .filler {
    flex-grow: 1;
    /* background: lightgreen; */
    }

    .right-buttons {
    /* width: 50px; */
    /* background: lightblue; */
    }

   </style>
