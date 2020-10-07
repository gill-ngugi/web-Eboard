<template>    
    <div>
        <v-app>
            <!-- DASHBOARD -->
        <div class = "nav-menu parent" style=" height:45px; width:98%; padding:0px; padding-top:0.3%; margin-left:1%; margin-right:1%;">
            <div class="left-buttons" style="margin-left:10px;">
                <button class="btn btn-lg" text v-on:click="getCompanyList(); seen1 = !seen1;">
                    {{selectedCompanyName}}
                    <span class="input-group-addon"><i class="fa fa-chevron-down"></i></span>                            
                </button>
            </div>    
            <div class="filler"></div>
                <img class="bgimg-1" src="../img/eboard_Logo_new@2x.png" style="height:75%; width:auto; padding-top:5px">
            <div class="filler"></div>
            <div class="right-buttons">
                <button class="btn btn-lg" text v-on:click="seen2 = !seen2;">{{userLanguage.language}}</button>
                <button class="btn btn-lg" @click="reloadPage"><v-icon color="#ffffff">mdi-refresh</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen4 = !seen4;"><v-icon color="#ffffff">mdi-magnify</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen5 = !seen5"><v-icon color="#ffffff">mdi-contact-mail</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen6 = !seen6"><v-icon color="#ffffff">mdi-server</v-icon></button>
            </div>
        </div>

        <div>
         <!-- Companies -->
            <div style="height:850px; width:auto; position:absolute; z-index:1; margin-left:1%; overflow:auto;" v-if="seen1">
                <v-list>
                    <v-list-item-title style="color:#e33333; padding:15px;">Company List</v-list-item-title>
                    <v-list-item
                        v-for="(item, index) in companyList"
                        :key="index"                                
                    >
                    <v-list-item-title onMouseOver="this.style.color='red'" onMouseOut="this.style.color='#000'" v-on:click="changeCompanyDetails(item);" style="cursor:pointer;">
                        {{ item.companyName }} 
                        <v-divider></v-divider>
                    </v-list-item-title>  
                    </v-list-item>
                </v-list>
            </div>

        <!-- English -->
            <div style="margin-left:80%; height:auto; width:19%; position:absolute; z-index:1; margin-right:1%;" 
                v-if="seen2">
                 <v-list style="position">
                    <v-list-item-title style="color:#e33333; padding:15px;">Select Language</v-list-item-title>
                    <v-list-item v-for="(item, index) in allLanguages" :key="index">
                    <v-list-item-title> {{item.language}} <v-divider></v-divider> </v-list-item-title>  
                    </v-list-item>
                </v-list>
            </div>

           <!-- Search -->
            <div style="margin-left: 80%; height:auto; width:19%; position: absolute; z-index: 1; margin-right:1%;" 
                v-if="seen4">
                <v-list style="position; padding:5%; color:#e33333">
                    <div class="input-group-addon" style="margin-bottom:20px;">
                        <input type="text" placeholder="Search" style="width:84%; float:left; outline:none; border-bottom:2px solid #e33333;" >
                        <button class="btn btn-md" style="padding:0px; float:left; outline:none;" text><v-icon color="#e33333">mdi-magnify</v-icon></button>                    
                    </div>
                </v-list>
            </div>

            <!-- Profile -->
            <div style="margin-left:80%; height:auto; width:19%; position:absolute; z-index:1; margin-right:1%;" 
                v-if="seen5">
                <v-card style="padding:1%; color:#e33333; height:auto;">
                    <v-card-actions>
                    <div style="float:left; margin:0px;">
                        <img v-bind:src="userInfo.imageUrl" style="height:85px; width:95px; background-color:#fff; border:1px solid black;">
                    </div>
                    <div style="float:left; position:relative; margin:0px;">    
                        <v-card-text>
                            <p style="font-size:21px; margin:0px;">{{userInfo.userFullName}}</p>
                            <p style="font-size:13px; margin:0px;">{{userInfo.userPhone}}</p>
                            <p style="font-size:13px; margin:0px;">{{userInfo.userEmail}}</p> 
                        </v-card-text>
                    </div>
                    </v-card-actions>
                </v-card>
            </div>    

        <!-- OPTIONS -->
            <div style="margin-left:80%; height:auto; width:19%; position:absolute; z-index:1; margin-right:1%;" v-if="seen6">
                <v-list style="padding:2%; background-color:#ffffff;">
                    <div><p style="color:#e33333;">Options<span style="float:right;">v3.0.1</span></p></div>
                     <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">      
                            <v-dialog
                                v-model="dialog"
                                persistent
                                max-width="390"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <a v-bind="attrs" v-on="on" style="cursor:pointer" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='#000'">Change Password</a>
                                    <!-- <v-btn
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        >
                                        Open Dialog
                                    </v-btn> -->
                                </template>
                                <div class="expired-password" style="background-color:#f5f5f5; padding:5.5%;">
                                    <h4>Change Password?</h4>
                                    <p v-if="expiredSuccess == 1" style="font-weight:bold; color:green;">{{ expiredMessage }}</p>
                                    <p v-else style="font-weight:bold; color:red;">{{ expiredMessage }}</p>
                                    <form @submit.prevent="expiredPassword">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-lock"></i></div>
                                            </div>
                                            <input type="password" class="form-control" name="oldPass" id="oldPass" placeholder="Old Password" v-model="oldPass" />                 
                                        </div>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-lock"></i></div>
                                            </div>
                                            <input type="password" class="form-control" name="newPass" id="newPass" placeholder="New Password" v-model="newPass" />                 
                                        </div>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-lock"></i></div>
                                            </div>
                                            <input type="password" class="form-control" name="confirmPass" id="confirmPass" placeholder="Confirm Password" v-model="confirmPass" />
                                        </div>
                                        <div style="display:flex;">
                                            <button class="btn btn-primary" @click="dialog = false; clearExpired();">Cancel</button>
                                            <span style="flex-grow:1"></span>
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </div>
                                    </form>

                                    <!-- <form>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                                <input type="password" class="form-control" name="oldPass" id="oldPass" placeholder="Old Password" v-model="oldPass" />                 
                                            </div>  
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                                <input type="password" class="form-control" name="newPass" id="newPass" placeholder="New Password" v-model="newPass" />                 
                                            </div>  
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                                <input type="password" class="form-control" name="confirmPass" id="confirmPass" placeholder="Confirm Password" v-model="confirmPass" />
                                            </div>
                                        </div>
                                        <div>
                                            <v-btn @click="dialog = false; clearExpired();" text color="red" style="float:left; padding:0px;">Cancel</v-btn>
                                            <v-btn @click="expiredPassword();" text color="red" style="float:right; padding:0px;">Submit</v-btn>
                                        </div>
                                    </form> -->
                                </div> 
                            </v-dialog>
                        </div>
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">      
                            <a style="cursor:pointer" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='#000'" v-on:click="logout">Logout</a>
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>
                </v-list>
            </div>
        </div>


        <!-- 
            <div class="expired-password" v-if="changePassDiv" style="width:300px; margin-left:37%; height:auto; top:36%; background-color:#f5f5f5; position:absolute; padding:1.5%;">
                <h4>Change Password?</h4>
                <p v-if="expiredSuccess == 1" style="font-weight:bold; color:green;">{{ expiredMessage }}</p>
                <p v-else style="font-weight:bold; color:red;">{{ expiredMessage }}</p>
                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                            <input type="password" class="form-control" name="oldPass" id="oldPass" placeholder="Old Password" v-model="oldPass" />                 
                        </div>  
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                            <input type="password" class="form-control" name="newPass" id="newPass" placeholder="New Password" v-model="newPass" />                 
                        </div>  
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                            <input type="password" class="form-control" name="confirmPass" id="confirmPass" placeholder="Confirm Password" v-model="confirmPass" />
                        </div>
                    </div>
                    <div>
                        <v-btn @click="changePassDiv = !changePassDiv; clearExpired();" text color="red" style="float:left; padding:0px;">Cancel</v-btn>
                        <v-btn @click="expiredPassword()" text color="red" style="float:right; padding:0px;">Submit</v-btn>
                    </div>
                </form>
            </div> -->

            <div style="display:flex">
                <div class="col-left" style="width:20%; height:900px; overflow:auto; margin-left:1%; margin-right:1%; margin-top:1%; float:left; position:relative;">
                    <div v-for="(item, index) in even(dashboardMenuList)" :key="index">
                        <router-link :to="{name : item.menuTitle}" style="text-decoration:none;" :style="{color:'rgb(' + item.menuColor + ')'}"> 
                            <div class="left-menu" style="border-top: 5px solid; padding:3.3%;">
                                <div class="input-group" >
                                    <span class="input-group-addon">
                                        <img v-bind:src="item.menuImageUrl" v-bind:alt="item.menuTitle" v-bind:style="{width:'60px', height:'50px' }">
                                        </span>
                                    <v-spacer></v-spacer>       
                                    <p> {{item.menuTitle}}</p>
                                </div>                        
                            </div>  
                        </router-link>
                    </div>
                </div>

                <div class="right" style="width:77%; height:900px; overflow:hidden; margin-right:1%; margin-top:1%; float:left; position:relative;">
                    <!-- GILLIAN -->
                    <div class="col-right-top" style="padding:1%; width:100%; height:35%;">
                        <div class="input-group" style="color: #27ae60; font-weight:bold;">
                            <span class="input-group-addon"><v-icon color="#27ae60">mdi-file-document</v-icon></span>
                            <p style="margin-left:20px; margin-right:20px;">My Inbox</p> 
                            <v-spacer></v-spacer>                        
                        </div>

                        <div style="width:100%;">
                            <table width="100%" style="overflow-y:auto; overflow-x:auto;">
                                <tr>
                                    <td>
                                        <div style="width:100%;">
                                            <table width="100%">
                                                <tr style="color:#fff; background-color:#27ae60;">
                                                    <th style="width:5%; padding:7px;">No.</th>
                                                    <th style="width:5%;"></th>
                                                    <th style="width:60%;">Name</th>
                                                    <th style="width:15%;">Size</th>
                                                    <th style="width:15%;">Created_on</th>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="width:100%; height:190px; overflow:auto;">
                                            <table class="table-striped" width="100%">
                                                <tbody>
                                                    <tr v-for="(item, index) in getRecentDocumentsArr.recentDocumentsList" :key="index">
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:5%; padding:7px;">{{ index + 1 + "." }}</td>
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:5%">    
                                                            <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                                        </td>
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:60%">
                                                            <a href="#" style="color:#000" onMouseOver="this.style.color='#27ae60'" onMouseOut="this.style.color='#000'" v-on:click="openPdfAnnotated(item)">
                                                                {{ item.itemName }}
                                                            </a> 
                                                        </td>
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:15%">
                                                            {{ item.itemSize | prettyBytes }} 
                                                        </td>
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:15%">
                                                            {{ parseInt(item.itemCreatedOn*1000, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>  
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
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

                                    <div style = "height:500px; overflow:auto; width:100%;">
                                        <div class="parent" style="padding:4%; padding-bottom:1%;" v-for="(notification, index) in getLatestNotificationsArr.notificationsList" :key="index">
                                            <div class="left-buttons">
                                                <v-icon color="#E74343" style="margin-top:25px; margin-right:70px; ">mdi-square</v-icon>
                                            </div>
                                            <div class="right-buttons">    
                                                <p style="font-size:21.5px;">{{ notification.notificationTitle }}</p>
                                                <p style="font-size:17px;">{{"Due on "}} {{ parseInt(notification.notificationDateTime*1000, 10) | moment('DD-MMM-YYYY') }}</p>
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

                                <div style = "height:500px; overflow:auto; width:100%;">
                                    <div class="parent" style="padding:4%; padding-bottom:1%;" v-for="(task, index) in getLatestNotificationsArr.taskList" :key="index">
                                        <div class="left-buttons">
                                            <v-icon color="#E74343" style="margin-top:25px; margin-right:70px; ">mdi-radiobox-marked</v-icon>
                                        </div>
                                        <div class="right-buttons">    
                                            <p style="font-size:21.5px;">{{ task.taskTitle }}</p>
                                            <p style="font-size:17px;">{{ task.companyName }}</p>
                                        </div>
                                        <hr>    
                                    </div>
                                </div>                                                              
                            </div>
                        </div>

                        <div class="col-right-bottom-right" style="padding:1%; width:64%; height:100%; float:left; position:relative; overflow:auto;">                        
                            <FullCalendar                             
                                defaultView="dayGridMonth" 
                                :plugins="calendarPlugins"  
                                :events="eventArray"
                            />                      
                        </div>
                    </div>
                </div>

                <div v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:77%; height:900px; padding:1%; overflow:hidden; margin-top:1%; margin-right:1%; margin-left:22%; z-index:2">
                    <div style="margin-bottom:10px;">
                        <button class="btn btn-lg" v-on:click="closePDF = !closePDF; shareDocument=false" style="background-color:red; float:right; margin-right:10px;">
                            <v-icon>mdi-close-outline</v-icon>
                        </button>
                        <button class="btn btn-lg" v-on:click="openShareButton()" style="background-color:red; float:right; margin-right:10px;">
                            <v-icon>mdi-share-variant</v-icon>
                        </button> 
                    </div> 
                    <v-card v-if="shareDocument" style="background-color:rgb(250,250,250); margin-bottom:10px; position:absolute; margin-top:7%; margin-left:72%; width:23%; height:570px; overflow-y:hidden;">
                        <div style="height:90%; overflow:auto; padding-left:20px; padding-top:10px;">                        
                            <div style="display:block;" v-for="(item, index) in sharePeople" v-bind:key="index">
                                    <input type="checkbox" v-bind:id="item.id_user" v-bind:value="item.id_user" v-model="checkNames">
                                    <label v-bind:for="item.id_user" style="font-size:15px; margin-left:10px;">{{ item.name }}</label><br>
                                </div>
                            </div>
                        <div style="height:10%; margin-top:13px;">
                            <v-btn v-on:click="shareDocument = !shareDocument" style="margin-left:7px; float:left;">
                                CANCEL
                            </v-btn>
                            
                            <v-btn v-on:click="sendSharePeople()" style="margin-right:7px; float:right;">
                                SHARE   
                            </v-btn>
                        </div>
                    </v-card>

                    <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl">
                    </pspdfkit>
                </div>
            </div>
        </v-app>
    </div>       
</template>

<script>
    var moment = require('moment');
    import axios from 'axios';
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import UserData from '../repository/UserData';
    import JQuery from 'jquery'
    window.$ = JQuery;
    import Vue from 'vue';
    import PSPDFKit from "pspdfkit";

    const LICENSE_KEY = "BvTNapxQPkJx5cbOJY84idxLaXU5Od5CVMyJaljuYTO7F6jGDHRia0y7_XMHiCXf4-z1XdtpYYT-C-DMzvAz9i74k8JsIm1wdXCZdK-tnfjopnzBNgdnY2QbVWMJ2bnzBcQKl2NislptTE5FxzH-fH_utm9wXzFIV8LTfB5juyvR4h85T3C-FnTyOTj_WU-qgiqY0daZ9eUjW5vCFnITc7KufPf59_bSIKg7ZG9Q8lpdl6kgR3nnIBxa75VOmL6n7IBvZkqzq9UF1VO6b9VBcVQcTmaOD2H6XthEkCHx3u0lcw-jIJE0qVLHODkfuR2lTdnVzyrFEhzPyTOBql7OFHhFMpQr9Ch3hTkTaRk_rZPQoX3MxFk0TsUf5L2tRbxj7-99jRy9aWBokSPMyI6ySpwQxwx-QA68n3NZ87_qlBGzJX3QIMRIH1bArZ4TfoU4"
    // const LICENSE_KEY = "Ni5LCTkSzrHKL3GnUlgVXV-Nt0-8cc5vbAlHmT6bRZZsheHGsPidBAsVHH7EbGm6krygVYe1_nAyLUlRZ4OUN9xBGmFpOiLJbNNvfnzJFkg3HwNvhVr0pNcug-kq6qFZMefIjdFy6-51sEWAD6nFfaRAFr0ihgzQ_Qf7o43DSWakOaAFFk6THvYiEAiwlDeTR-ggbcRf3orhW58EWXjqc8d1Ez1iy3SJtFsy0ReQcWBlkV2r_0HzjWzc1mvO4fDFSmYJvZ7DiL9MAtoEXyy14hpwaGW4uliBV6-JeCdjz64pzuEqhYql2EgzbG0r2eLGHIeDyrYtkA20c_Zyd_zbf4Vtbd31PPuPymL-75ZIcXtoIhlUcKLxMTEUcL8KiXgx7zEHWU4ajjtH2uPXNHkBnxyUL4K9OH7WxmV5k2nxAjqHLOf9bPIf0q61OJyejnmO";
    // const LICENSE_KEY = "vuF0E1oK-8zmH0-rz6t6lt5x3AowOhR0kRILumR6xH5T9Ctre9Fo8gkBb404wT0dORhQliyk5XuSMMayurmNTJi4GRIuHL92DKOflXw04fv1UWthdwqHGQ0wM-E_0xTt4sk1jk9pWSkN5im3J_XmU8frGN2NYiSu-LP2BF_SFitDv9E-TSJWExDAZJVh4x3djWVg0bKVI-Pv2uS7fTh8ynEe4_7ivc-SoqEldi7evAfvas4X1EPse0VhJYWtgzhIjNs4RoXAazz4j4xPRgAQEYSL4JG6ZnT2fwCNq8uTqsnxi77aP0NvM69CmaOm_h-4yL3xCpVWV0k6HEiwO-fgn0fFQeHHRemKeXlGWnjrCBob4s1bDgjh0VWkTHRmZIbEA3jt6Ehh1VZQrlVusPOJggRF63X3sTowcQM5dPae-bHLMhdOB6pov8PKEOaWoR1pRw64NheynDAaA5elyCbP_xnG5cCuzDekt6U5K9KZ-wdc3kQFgS4kgbA1Ox1n3k2zbag_mqPkNOhzQ9AzDehO8H6W8L49hvQCQtmGAcm6nuA=";    
    // const LICENSE_KEY = "xmnyiKkvzmQ0WIOagPDOdV_GESKnYO6fNa-1Ck87vP0NEExhZQ_DNdRPLVJK1l2M2s30Yt1Sz1J94COZb2TWcvvO2mQRYJBkIZWMYLII-p0daMx3ClCRbSmPJ1yUW0EbvRm50xZC2hzO8lLVP2GRr47Qeceo0Y837a9qyXglGJLiJpKVYl1liSuDzArGi1nPOF1AfbyevOEdBaUVAMiYypx6iIo281tNqkzMV5j4d5eB-yMpn0xnvbXd-RdiGLZXn--8yqGVbwZWSTCjnnPbVkheQqiuAUUrvFPlC0LENI1c94TS_zLzo6RVx03kZF0bxI_vYyyxYx8r7IwghUBKXuBnUJXZHsteNLBMaQg-rIKh-ORAwjFwSM80vLow6nunBmPyLHvyERGeABpyPQyWRN0R6DaflKyYpmUn_UohjxcfYl8AQYJkf6cAXLJAeWnQ"

    const pspdfkit = Vue.component('pspdfkit', {
    template:           
        `
        <div class="container" style="height:100%; width:97%;">
            <!--<button class="btn btn-lg" text v-on:click="closePDF = !closePDF;" style="color:green; ">CLOSE</button> -->               
        </div>  
        `,
    name: 'pspdfkit',
    props: ['pdfUrl', 'licenseKey', 'baseUrl'],
    _instance: null,

    mounted: function mounted() {
        // this.load();
        this.getImportedData((annotations)=>{
            // console.log(annotations.length)
            //annotations= annotations.length>0?annotations:null;
            try{
            // if(annotations.length > 0){
                this.load(JSON.parse(annotations))
            }
            catch(error){
            // else{
                this.load(JSON.parse(null))
            }
        }); 
    },

    data: () => ({
        quay: ";oihugvjk"
    }),

    methods: {       
        load: function load(annotations) {
            const that = this;
            PSPDFKit.load({                
                disableWebAssemblyStreaming: true,
                pdf: this.pdfUrl,
                pdf2: "example.pdf",
                container: '.container',
                licenseKey: this.licenseKey,
                baseUrl: this.baseUrl,
                instantJSON:annotations,
                // toolbarItems: items,
                // instantJSON: {
                //     "annotations":[
                //         {
                //             "bbox":[230,259,184,77],
                //             "blendMode":"normal",
                //             "createdAt":"2020-02-20T10:32:35Z",
                //             "id":"01E1H2G27QDK4STYPKJK4Y2S0M",
                //             "isDrawnNaturally":false,
                //             "lineWidth":5,
                //             "lines":{
                //                 intensities:[[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]],
                //                 points:[[[232.83749389648438,261.6500244140625],[244.03750610351562,265.6500244140625],[252.03750610351562,266.45001220703125],[267.23748779296875,267.25],[276.0375061035156,269.6500244140625],[284.8374938964844,272.04998779296875],[292.8374938964844,272.8499755859375],[300.8374938964844,274.45001220703125],[314.4375,278.45001220703125],[323.23748779296875,283.25],[330.4375,288.8500061035156],[336.8374938964844,297.6499938964844],[343.23748779296875,304.8500061035156],[351.23748779296875,312.04998779296875],[357.63751220703125,316.8500061035156],[368.8374938964844,323.25],[380.8374938964844,328.04998779296875],[394.4375,331.25],[406.4375,332.8500061035156],[411.23748779296875,332.8500061035156]]]
                //                 },
                //             "name":"01E1H2G27QDK4STYPKJK4Y2S0M",
                //             "opacity":1,
                //             "pageIndex":0,"strokeColor":"#2483C7","type":"pspdfkit/ink","updatedAt":"2020-02-20T10:32:38Z","v":1
                //         }
                //     ],
                //     "format":"https://pspdfkit.com/instant-json/v1",
                //     "pdfId":{
                //         "changing":"7mx+shix20m1Vn+qCsWSKg==",
                //         "permanent":"7mx+shix20m1Vn+qCsWSKg=="
                //     }
                // }
            })
            .then(function (instance) {
                that._instance = instance;
                that.$parent.errorMsg = ''
                // const items = PSPDFKit.defaultToolbarItems;
                // console.log(items);
                // const item = {
                //     type: "custom",
                //     id: "my-button",
                //     title: "My Button",
                //     onPress: event => {
                //         alert("this.quay");
                //     }
                // };
                // instance.setToolbarItems(items => {
                //     items.push(item);
                //     return items;
                // });
                instance.addEventListener("annotations.didSave", async () => {
                instance.exportInstantJSON().then(function (instantJSON) {
                    console.log(instantJSON)
                    //filter ids for old anootations  e.g ["id":"gfhfgf758",...]
                    // var oldAnnotations=annotations.annotations.map(oldAnnotation=>{
                    //     return oldAnnotation.id;
                    // });
                    // var newAnnotation=instantJSON.annotations.filter(annotation=>{
                    //     if(!oldAnnotations.includes(annotation.id)){
                    //         return annotation;
                    //     }
                    // })
                    // var newAnnotionWrapped={
                    //     "format":instantJSON.format,
                    //     "annotations":newAnnotation,
                    //     "pdfId":instantJSON.pdfId
                    // }
                    // console.log(newAnnotionWrapped)
                    //console.log("annotitions to send",instantJSON)
                // Persist it to a server
                const form = new FormData();
                // form.append("payload", JSON.stringify(newAnnotionWrapped));
                form.append("payload", JSON.stringify(instantJSON));
                form.append("document_id", UserData.getDocumentId());
                form.append("user_id", UserData.getUserId());
                form.append("company_code", UserData.getCompanyCode());

                    axios.post("                                                                                                                                            ", form)
                    .then(response=>{
                        console.log(response);
                    });
                });
            })
            })
            .catch(function (err) {
                PSPDFKit.unload('.container')
                that.$parent.errorMsg = err.message
            });
        },

        unload: function unload() {
            if (this._instance) {
                PSPDFKit.unload(this._instance || '.container')
                this._instance = null
            }
        },

        getImportedData: function getImportedData(annotationsCallBack) {
            const form = new FormData();
                form.append("document_id", UserData.getDocumentId());
                form.append("user_id", UserData.getUserId());
                form.append("company_code", UserData.getCompanyCode());

            axios.post('https://eserver1.stl-horizon.com/pspdfkit/importAnnotation.php', form)
                .then(response => {
                    // this.res = response;
                    var data = response.data;
                    // alert(data.length);
                    if(data){
                        if(annotationsCallBack instanceof Function){
                            annotationsCallBack(data.replace(/\\"/g, '"'))
                        }
                    }
                    else{
                       if(annotationsCallBack instanceof Function){
                            annotationsCallBack(data)
                        } 
                    }
                   //alert(response.data)
                })
                
            },

            // getImportedData: function getImportedData() {
            // axios.get('https://eserver1.stl-horizon.com/pspdfkit/importAnnotation.php')
            //     .then(response => {
            //         var data = response.data;
            //         data.replace(/\\"/g, '"');
            //     })
            // },
    },
    
    watch: {
        pdfUrl: function pdfUrl() {
            this.unload()
            this.load()
        }
    },

    beforeMount: function beforeMount(){
       
    },

    beforeDestroy: function beforeDestroy() {
        this.unload()
    }
    });
    
    
    /*
    //Beginning of Annotated PDF
    
    const pspdfkit2 = Vue.component('pspdfkit2', {
    template: 
        `<div class="containy" style="height:100%; width:97%;">
        </div>
        `,
    name: 'pspdfkit2',
    props: ['pdfUrl', 'licenseKey', 'baseUrl'],
    _instance: null,

    mounted: function mounted() {
       this.load(); 
    },

    methods: {
        load: function load() {
            const that = this;
            PSPDFKit.load({
                // disableWebAssemblyStreaming: true,
                pdf: this.pdfUrl,
                container: '.containy',
                licenseKey: this.licenseKey,
                baseUrl: this.baseUrl,
            })
            .then(function (instance) {
                that._instance = instance;
                that.$parent.errorMsg = ''
        //         instance.addEventListener("annotations.didSave", async () => {
        //         instance.exportInstantJSON().then(function (instantJSON) {
        //             console.log(instantJSON)
                    
        //         const form = new FormData();
        //         form.append("payload", JSON.stringify(instantJSON));
        //         form.append("document_id", UserData.getDocumentId());
        //         form.append("user_id", UserData.getUserId());
        //         form.append("company_code", UserData.getCompanyCode());

        //             axios.post("https://eserver1.stl-horizon.com/pspdfkit/saveAnnotation.php", form)
        //             .then(response=>{
        //                 console.log(response);
        //             });
        //         });
        //  })
            })
            .catch(function (err) {
                PSPDFKit.unload('.containy')
                that.$parent.errorMsg = err.message
            });
        },

        unload: function unload() {
            if (this._instance) {
                PSPDFKit.unload(this._instance || '.containy')
                this._instance = null
            }
        },
    },
    
    watch: {
        pdfUrl: function pdfUrl() {
            this.unload()
            this.load()
        }
    },

    beforeDestroy: function beforeDestroy() {
        this.unload()
    }
    })

    //END
    */
    

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
            closePDF: false,
            closePDF2: false,
            shareDocument: false,
            showMessages: false,
            dialog: false,
            changePassDiv: false,
            calendarPlugins: [ dayGridPlugin ],
            requestUserLogin : [],
            userInfo : [],
            dashboardMenuList : [],
            eventArray: [],
            companyDetail: [],
            userLanguage: [],
            allLanguages: [],
            companyList: [],
            getLatestNotificationsArr: [],
            getRecentDocumentsArr: [],
            getCalendarEventsArr: [],
            checkNames: [],
            companyListId: '',
            selectedCompanyName: '',
            moment: moment,
            date: 1570064727,
            pdf:'example.pdf',
            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',
            expiredMessage: '', 
            expiredSuccess: '',
            oldPass: '',
            newPass: '',
            confirmPass: '',
        }),

        filters: {
            moment: function(date){
                return moment(date).format('YYYY-MM-DD');
            },
        },

        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            } 
        },

        methods: {
            // logout: function () {
            //     this.$store.dispatch('logout')
            //         .then(() => {
            //             this.$router.push('/')
            //         })
            // },

            logout(){
                this.$store.commit("setAuthentication", false)
                this.$router.replace('/')
            },

            openPdfAnnotated(item){
                if(item.itemExtension == 'pdf'){
                    this.closePDF = !this.closePDF
                    this.pdf=item.itemUrl;
                    UserData.setDocumentId(item.itemId);
                    return
                }
                if(item.itemExtension == ('docx')){
                    window.open(item.itemUrl);
                }
                if(item.itemExtension == ('pptx')){
                    window.open(item.itemUrl);
                }
                if(item.itemExtension == ('xlsx')){
                    window.open(item.itemUrl);
                }
            },

            openPdfOriginal(item){
                this.closePDF = !this.closePDF
                this.pdf=item.itemUrl;
                // UserData.setDocumentId(item.itemId);
            },
          
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
                const formData = new FormData();
                    formData.append('userName', UserData.getUserName());
                    formData.append('userPassword', UserData.getUserPassword());
                    formData.append('companyCode', UserData.getCompanyCode()); 
                    formData.append('model', "requestUserLogin");
                    formData.append('mobileVersion', "11.4.1");
                    formData.append('deviceName', "ipad air 2");
                    formData.append('deviceToken', "b41dfaf1ba018196d5068a0ecc3bde33f83c94131ecf71d053260b944da14612"); 
                    formData.append('eboardVersion', "2.5.7"); 

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.requestUserLogin = response.data;  
                        this.dashboardMenuList = this.requestUserLogin.dashboardMenuList;
                        this.allLanguages = this.requestUserLogin.allLanguages;
                        this.userInfo = (JSON.parse(JSON.stringify(this.requestUserLogin.userInfo)));
                        this.companyDetail = (JSON.parse(JSON.stringify(this.requestUserLogin.companyDetail)));
                        // this.selectedCompanyName = this.companyDetail.companyName;
                        this.userLanguage = (JSON.parse(JSON.stringify(this.requestUserLogin.userLanguage)));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            getCompanyName(){
                this.selectedCompanyName = UserData.getCompanyName();
            },

            getCompanyList(){
                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getCompanyList");
                formData.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getCompanyListArr = response.data;
                        this.companyList = this.getCompanyListArr.companyList;
                        this.$localStorage.set('getCompanyList', JSON.stringify(this.getCompanyListArr))
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getLatestNotifications(){
                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getLatestNotifications");
                formData.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getLatestNotificationsArr = response.data;
                        this.$localStorage.set('getLatestNotifications', JSON.stringify(this.getLatestNotificationsArr))
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
                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getRecentDocuments");
                formData.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getRecentDocumentsArr = response.data;
                        this.$localStorage.set('getRecentDocuments', JSON.stringify(this.getRecentDocumentsArr))
                        })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getCalendarEvents(){
                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getCalendarEvents");  
                formData.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getCalendarEventsArr = response.data;
                        this.eventArray = this.getCalendarEventsArr.eventList;
                        this.$localStorage.set('getCalendarEvents', JSON.stringify(this.getCalendarEventsArr));
                        this.eventArray=this.eventArray.map((element)=>{                     
                            return { 
                                title:element.eventTitle, 
                                date:moment(parseInt(element.eventBeginDate*1000, 10)).format('YYYY-MM-DD'),
                                color:`rgb(element.eventColor)`, 
                                textColor:'#fff' 
                            }
                        })
                    })
                    .catch(e => {
                        console.log('Error', e);
                })
            },

            changeCompanyDetails(item){
                this.seen1 = false;
                this.dashboardMenuList = 0;
                this.dashboardMenuList = item.dashboardMenuList;                
                UserData.setCompanyId(item.companyId);
                UserData.setCompanyName(item.companyName);
                // this.selectedCompanyName = item.companyName;
                // alert(item.companyId);
                // alert(this.selectedCompanyName);
                this.getCompanyList();
                this.getLatestNotifications();
                this.getRecentDocuments();
                this.getCalendarEvents();
                this.selectedCompanyName = UserData.getCompanyName();
                alert("Changing company to: " + this.selectedCompanyName);


                //GET COMPANY LIST
                // const formData = new FormData();
                // formData.append('userId', UserData.getUserId());
                // formData.append('companyCode', UserData.getCompanyCode());
                // formData.append('accessToken', UserData.getAccessToken());
                // formData.append('model', "getCompanyList");
                // formData.append('companyId', UserData.getCompanyId());

                // axios.post(UserData.getBaseUrl(), formData)
                //     .then(response => {
                //         this.getCompanyList = response.data;
                //         this.companyList = this.getCompanyList.companyList;
                //         this.$localStorage.set('getCompanyList', JSON.stringify(this.getCompanyList))
                //     })
                //     .catch(e => {
                //         console.log('Error', e);
                //     });
                

                // //GET NOTIFICATIONS/TASKS
                // const formData2 = new FormData();
                // formData.append('userId', UserData.getUserId());
                // formData.append('companyCode', UserData.getCompanyCode());
                // formData.append('accessToken', UserData.getAccessToken());
                // formData.append('model', "getLatestNotifications");
                // formData.append('companyId', UserData.getCompanyId());

                // axios.post(UserData.getBaseUrl(), formData2)
                //     .then(response => {
                //         this.getLatestNotifications = response.data;
                //         this.$localStorage.set('getLatestNotifications', JSON.stringify(this.getLatestNotifications))
                //     })
                //     .catch(e => {
                //         console.log('Error', e);
                //     });

                // // RECENT DOCUMENTS
                // const formData3 = new FormData();
                // formData.append('userId', UserData.getUserId());
                // formData.append('companyCode', UserData.getCompanyCode());
                // formData.append('accessToken', UserData.getAccessToken());
                // formData.append('model', "getRecentDocuments");
                // formData.append('companyId', UserData.getCompanyId());

                // axios.post(UserData.getBaseUrl(), formData3)
                //     .then(response => {
                //         this.getRecentDocuments = response.data;
                //         this.$localStorage.set('getRecentDocuments', JSON.stringify(this.getRecentDocuments))
                //         })
                //     .catch(e => {
                //         console.log('Error', e);
                //     });

                // // CALENDAR
                // const formData4 = new FormData();
                // formData.append('userId', UserData.getUserId());
                // formData.append('companyCode', UserData.getCompanyCode());
                // formData.append('accessToken', UserData.getAccessToken());
                // formData.append('model', "getCalendarEvents");  
                // formData.append('companyId', UserData.getCompanyId());

                // axios.post(UserData.getBaseUrl(), formData4)
                //     .then(response => {
                //         this.getCalendarEvents = response.data;
                //         this.eventArray = this.getCalendarEvents.eventList;
                //         this.$localStorage.set('getCalendarEvents', JSON.stringify(this.getCalendarEvents));
                //         this.eventArray=this.eventArray.map((element)=>{                     
                //             return { 
                //                 title:element.eventTitle, 
                //                 date:moment(parseInt(element.eventBeginDate*1000, 10)).format('YYYY-MM-DD'),
                //                 color:`rgb(element.eventColor)`, 
                //                 textColor:'#fff' 
                //             }
                //         })
                //     })
                //     .catch(e => {
                //         console.log('Error', e);
                //     })                
            },

            clearExpired(){
                this.oldPass = '';
                this.newPass = '';
                this.confirmPass = '';
            },

            expiredPassword(){
                const formData = new FormData;
                formData.append('oldPassword', this.oldPass);
                formData.append('newPassword', this.newPass);
                formData.append('confirmPassword', this.confirmPass);
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('userName', UserData.getUserName());
                formData.append('model', 'changePassword');
                formData.append('passwordExpiry', 0);

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                    this.expiredPasswordArr = response.data;
                    this.expiredMessage = this.expiredPasswordArr.message;
                    this.expiredSuccess = this.expiredPasswordArr.success;
                    this.clearExpired();
                })
            },

            getLink(){
                let routeData = this.$router.resolve({name: this.getRecentDocumentsArr.recentDocumentsList.itemUrl, query: {data: this.getRecentDocumentsArr.recentDocumentsList.itemUrl}});
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

            // getSharePeople(){
            //     axios.get("https://eserver1.stl-horizon.com/pspdfkit/shareAnnotation.php")
            //         .then(response => {
            //             this.sharePeople = response.data;
            //             console.log(this.sharePeople);
            //         })
            //         .catch(e => {
            //             console.log('Error', e);
            //         })
            // },

            sendSharePeople(){
                // this.checkNames.length = 0;
                // alert(this.checkNames);
                if(this.checkNames == 0){
                    alert("Select persons to share to!");
                }
                else{
                    const formData = new FormData;
                    formData.append("document_id", UserData.getDocumentId());
                    formData.append("company_code", UserData.getCompanyCode());
                    formData.append("id_users", this.checkNames);

                    axios.post("https://eserver1.stl-horizon.com/pspdfkit/shareAnnotation.php", formData)
                        .then(response => {
                            this.sendSharePeopleArray = response.data;
                        })
                        .catch(e => {
                            console.log('Error', e);
                        })
                        this.checkNames.length=0;
                        this.shareDocument = false;
                    // alert(this.checkNames);
                }
            },

            openShareButton(){
                const formData = new FormData();
                formData.append("company_code", UserData.getCompanyCode());
                formData.append("document_id", UserData.getDocumentId());

                axios.post("https://eserver1.stl-horizon.com/pspdfkit/shareAnnotation.php", formData)
                    .then(response => {
                        this.sharePeople = response.data;
                        console.log(this.sharePeople);  
                        this.shareDocument = !this.shareDocument;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })

                // shareDocument = !shareDocument;
            },

            

    //    input(input){
    //    var output= input.replace(/[.*+?^$()|[\.]\\]/g, '\\$&')
    //         return output;
    //           },
  

            openPDF: function openPDF(e) {
                this.pdf = window.URL.createObjectURL(e.target.files[0])
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            }        
        },
      
        beforeMount(){
            this.getRequestUserLogin();
            this.getLatestNotifications();
            this.getRecentDocuments();
            this.getCalendarEvents();
            this.getCompanyName();
        },

        mounted() {
            // const getRecentDocuments = JSON.parse(this.$localStorage.get('getRecentDocuments'));
            // const getLatestNotifications = JSON.parse(this.$localStorage.get('getLatestNotifications'))
            
            // if (getRecentDocuments) {  
            //     this.getRecentDocuments = getRecentDocuments;
            // }

            // if (getLatestNotifications) {  
            //     this.getLatestNotifications = getLatestNotifications;
            // }
        },

        components: {
            FullCalendar, // make the <FullCalendar> tag available
            pspdfkit: pspdfkit,
            // pspdfkit2: pspdfkit2
        },
    }

</script>

<style scoped>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';


    body{
        padding: 0px;
        margin: 0px;
    }

    .fixed_header{
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
    }

    .fixed_header tbody{
        display:block;
        width: 100%;
        height: 190px;
        overflow-y: scroll;  
        overflow-x: hidden; 
    }

    .fixed_header thead tr {
        display: block;
    }

    .fixed_header thead {
        background: black;
        color:#fff;
    }

    .fixed_header th, .fixed_header td {
        text-align: left;
        height:40px;
    }

    .nav-menu{
        margin-top:0px; 
        background-color: #e33333;
    }

    .nav-menu .btn{
        background-color:#e33333;
        border:none;
        padding:0px;    
        margin-right:15px;
        color:white;
        outline:none;
    }

    .col-left .left-menu{
        background-color: #f5f5f5 ;
        align-content: center;
        margin-bottom:10px;
        font-size:20px;
    }

    .col-right{
        float:left;
        width:73%;
        overflow:hidden;
        height: auto;
        margin-top:1%;
        position: relative;
        /* z-index: -1; */
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
        background-color: #f5f5f5;
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
        width:100%;
        height: auto;
        padding:2%;
    }

    .filler {
        flex-grow: 1;
    }

   </style>