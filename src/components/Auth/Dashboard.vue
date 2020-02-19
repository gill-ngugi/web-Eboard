<template>    
    <div>
        <!-- <v-app> -->
        <div class = "nav-menu parent" style=" height:45px; width:98%; padding:0px; padding-top:0.3%; margin-left:1%; margin-right:1%;">
            <div class="left-buttons" style="margin-left:10px;">
                <button class="btn btn-lg" text v-on:click="seen1 = !seen1">
                    {{companyDetail.companyName}}
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

         <!-- Companies -->
            <div style="height: auto; width: auto; position: absolute; z-index: 1; margin-left:1%;" v-if="seen1">
                <v-list>
                    <v-list-item-title style="color:#e33333; padding:15px;">Company List</v-list-item-title>
                    <v-list-item
                        v-for="(item, index) in companyList"
                        :key="index"                                
                    >
                        <!-- START HERE!!! -->
                    <v-list-item-title v-on:click="changeCompanyDetails(item);" style="cursor:pointer;">{{ item.companyName }} <v-divider></v-divider></v-list-item-title>  
                    </v-list-item>
                </v-list>
            </div>

        <!-- English -->  
            <div style="margin-left:80%; height:auto; width:19%; position:absolute; z-index:1; margin-right:1%;" 
                v-if="seen2">
                 <v-list style="position">
                    <v-list-item-title style="color:#e33333; padding:15px;">Select Language</v-list-item-title>
                    <v-list-item
                        v-for="(item, index) in allLanguages" 
                        :key="index"                        
                    >
                    <v-list-item-title> {{item.language}} <v-divider></v-divider></v-list-item-title>  
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
                        <!-- <img src="../img/male-icon.png" style="height:85px; width:95px; background-color:cyan; border:1px solid black;"> -->
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
                    
                    <!-- <div class="row" style="margin:0px; padding:0px;">
                        <div class="col-md-8 col-sm-8" style="margin:0px; padding:0px;">
                            Notifications
                        </div>
                        <div class="col-md-4 col-sm-4" style="margin:0px; padding:0px;">
                            <div class="custom-control custom-switch" style="float:right;">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                <label class="custom-control-label" for="customSwitch1"></label>
                            </div>
                        </div>
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>
                    
                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-8 col-sm-8" style="margin:0px; padding:0px;">
                            Autobriefcase
                        </div>
                        <div class="col-md-4 col-sm-4" style="margin:0px; padding:0px;">
                            <div class="custom-control custom-switch" style="float:right;">
                                <input type="checkbox" class="custom-control-input" id="customSwitch2">
                                <label class="custom-control-label" for="customSwitch2"></label>
                            </div>
                        </div>
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-8 col-sm-8" style="margin:0px; padding:0px;">
                            Calendar Sync
                        </div>
                        <div class="col-md-4 col-sm-4" style="margin:0px; padding:0px;">
                            <div class="custom-control custom-switch" style="float:right;">
                                <input type="checkbox" class="custom-control-input" id="customSwitch3">
                                <label class="custom-control-label" for="customSwitch3"></label>
                            </div>
                        </div>
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>                    

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Contact Support
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Report an Issue
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            License & Policies
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Directory
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Links & News
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Change Applock PIN
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider> -->

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Change Password
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <!-- <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Manage Briefcase
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>
                     
                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-1 col-sm-1" style="margin:0px; padding:0px; ">
                           </div>
                        <div class="col-md-4 col-sm-4" style="margin:0px; padding:0px; ">
                            Backup
                        </div>
                        <div class="col-md-7 col-sm-7" style="margin:0px; padding:0px; color:#e33333;">
                           <div class="custom-control custom-switch" style="float:right;">
                               6 days ago
                            </div>                       
                        </div>
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-1 col-sm-1" style="margin:0px; padding:0px; ">
                           </div>
                        <div class="col-md-5 col-sm-5" style="margin:0px; padding:0px;">
                            Restore
                        </div>
                        <div class="col-md-6 col-sm-6" style="margin:0px; padding:0px; color:#e33333;">                        
                           <div style="margin:0px; padding:0px; float:right;">Never</div>                                                 
                        </div>
                    </div>   
                    <v-divider style="margin:0px; padding:0px;"></v-divider>
                    
                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">                        
                            Register of Interest
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">                        
                            Feedback
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider> -->

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">                        
                            <p style="cursor:pointer" v-on:click="logout()">Logout</p>
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                </v-list>
            </div>
  
            <div class="col-left" style="width:20%; height:900px; overflow:auto; margin-left:1%; margin-right:1%; margin-top:1%; float:left; position:relative;">
                <!-- <div v-for="(item, index) in dashboardMenuList" :key="index"> -->
                <div v-for="(item, index) in even(dashboardMenuList)" :key="index">
                    <router-link :to="{name : item.menuTitle}" style="text-decoration:none;" :style="{color:'rgb(' + item.menuColor + ')'}"> 
                        <div class="left-menu" style="border-top: 5px solid; padding:3.3%;">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <img v-bind:src="item.menuImageUrl"  v-bind:alt="item.menuTitle" v-bind:style="{width:'60px', height:'50px' }">
                                    </span>
                                <v-spacer></v-spacer>       
                                <p> {{item.menuTitle}}</p>
                            </div>                        
                        </div>  
                    </router-link>
                </div>
            </div>

            <div class="right" style="width:77%; height:900px; overflow:hidden; margin-right:1%; margin-top:1%; float:left; position:relative; z-index:-1">
                <div class="col-right-top" style="padding:1%; width:100%; height:35%;">
                    <div class="input-group" style="color: #27ae60; font-weight:bold;">
                        <span class="input-group-addon"><v-icon color="#27ae60">mdi-file-document</v-icon></span>
                        <p style="margin-left:20px; margin-right:20px;">My Inbox</p> 
                        <v-spacer></v-spacer>                        
                        <!-- <button class="btn btn-lg" text v-on:click="closePDF = !closePDF;" style="color:green">PSPDFK</button> -->
                        <button class="btn btn-lg" text @click="reloadPage"><v-icon color="#27ae60">mdi-refresh</v-icon></button>
                    </div>

                <!-- <div style="width:100%;">
                    <table width="100%">
                        <tr>
                            <td>
                                <table border="1" width="100%">
                                    <tr style="color:white; background-color:grey">
                                        <th style="width:10%">Header 1</th>
                                        <th style="width:10%">Header 2</th>
                                        <th style="width:60%">Header 3</th>
                                        <th style="width:10%">Header 4</th>
                                        <th style="width:10%">Header 5</th>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    <tr>
                        <td>
                            <div style="width:100%; height:190px; overflow:auto;">
                                <table border="1" width="100%" >
                                    <tr>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:60%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                    </tr>
                                    <tr>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:60%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                    </tr>   
                                        <tr>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:60%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                    </tr>
                                    <tr>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:60%">new item</td>
                                        <td style="width:10%">new item</td>
                                        <td style="width:10%">new item</td>
                                    </tr>
                                </table>  
                            </div>
                        </td>
                    </tr>
                </table>
            </div> -->

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
                                            <tr v-for="(item, index) in getRecentDocuments.recentDocumentsList" :key="index">
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:5%; padding:7px;">{{ index + 1 + "." }}</td>
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:5%">    
                                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                                </td>
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:60%">
                                                    <a href="#" v-on:click="openPdf(item.itemUrl)">
                                                    <!-- <a href="#" v-on:click="closePDF = !closePDF">-->
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

                    <!-- <div style="width:100%;">
                        <table class="table-striped" style="width:100%; display:block; overflow-y:auto; overflow-x:auto;">
                                <tr style="background-color:#27ae60; width:100%; height:auto; display:block; line-height:30px; overflow-y:hidden; overflow-x:hidden; color:#ffffff;">
                                    <th style="padding:7px; min-width:100px;">No.</th>
                                    <th style="padding:7px; min-width:100px;"></th>
                                    <th style="padding:7px; min-width:450px;">Name</th>
                                    <th style="padding:7px; min-width:200px;">Size</th>
                                    <th style="padding:7px; min-width:200px;" >Created On</th>
                                    <th style="padding:7px; min-width:200px;">Briefcase</th>
                                </tr>

                            <tbody style="overflow-y:auto; overflow-x:auto; height:190px; display:block;">
                                <tr v-for="(item, index) in getRecentDocuments.recentDocumentsList" :key="index" 
                                    style="width:100%;">
                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:100px; max-width:100px;">{{ index + 1 + "." }}</td>
                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:100px; max-width:100px;">    
                                        <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                    </td>
                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:450px; max-width:450px;">
                                        <a href="#" v-on:click="openPdf(item.itemUrl)">
                                            {{ item.itemName }}
                                        </a>
                                    </td>
                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                        {{ item.itemSize | prettyBytes }} 
                                    </td>
                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                        {{ parseInt(item.itemCreatedOn*1000, 10) |  moment('DD-MMM-YYYY') }}                                 
                                    </td>
                                    <td style="padding-right:10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                        <button class="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->
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
                                    <div class="parent" style="padding:4%; padding-bottom:1%;" v-for="(notification, index) in getLatestNotifications.notificationsList" :key="index">
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
                                <div class="parent" style="padding:4%; padding-bottom:1%;" v-for="(task, index) in getLatestNotifications.taskList" :key="index">
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
        
        <!-- <div v-if="closePDF" 
        style="position:absolute; background-color:#f5f5f5; width:77%; height:900px; padding:1%; overflow:hidden; margin-top:1%; margin-right:1%; margin-left:22%; z-index:-1" 
        :is="currentComponent" :swap-component="swapComponent">
        </div> -->
        
        <div v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:77%; height:900px; padding:1%; overflow:hidden; margin-top:1%; margin-right:1%; margin-left:22%; z-index:-1">
            <button class="btn btn-lg" v-on:click="closePDF = !closePDF;" style="background-color:red; float:right; margin-right:10px;">
                <v-icon>mdi-close-outline</v-icon>
            </button>               
            <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl">
            </pspdfkit>
        </div>
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

    // var pspdfkitComponent = {
    //     props: ['swapComponent'],
    //     data: () => ({
    //         closePDF: true,
    //     }),
    //     methods: {},
    //     template: `
    //         <div v-if="closePDF">
    //             <div>
    //                 PSPDFKIT SUCKERS!!!
    //                 <button class="btn btn-lg" text v-on:click="closePDF = !closePDF;" style="color:green; float:right; margin-right:10px;">CLOSE</button>
    //             </div>
    //         </div>
    //     `,
    // };

    const LICENSE_KEY = "H8E3jzmVoQoKTpdmwIL-fp3l4tIXnqDrMQX2iyEpWQDWkgbJ1xho58ylym0MVf1AVcCkze3LIlMvZ7SjQwo9wrkaIq8CtOP2_jKSiXyms44dQq9CXTicGr1nPn8gZrAb4_C9pikBx8K6Vn90vswIM9cxHReanwhwx6np0W9bvQwgj0mgqWrgm_ay96va6pYgPNSz6f-V-XlCdiCm8V1m3xKLN-Iu7Fw5dSGFO7jaFVKMzxmPuqXAbmmsV6RHcuqv6mKVbC_zgT-9FmJsp-ppBiRKWTefb9Shk_7-a-PmUXf4ZbTC_9c5g-n0ExH-e6h8PbHrLiOSOkkxMHK288aRHT2EwTleY1RnULGKXmc2dmpgWkSarBsfVFV6_FAHO5FE57AfGDDlCgyYqaFz5hOcNOBR178CBBBhjGvxrYwmL-0R3KsOq_5Q5VHAcYB1k-z6";
    // const LICENSE_KEY = "vuF0E1oK-8zmH0-rz6t6lt5x3AowOhR0kRILumR6xH5T9Ctre9Fo8gkBb404wT0dORhQliyk5XuSMMayurmNTJi4GRIuHL92DKOflXw04fv1UWthdwqHGQ0wM-E_0xTt4sk1jk9pWSkN5im3J_XmU8frGN2NYiSu-LP2BF_SFitDv9E-TSJWExDAZJVh4x3djWVg0bKVI-Pv2uS7fTh8ynEe4_7ivc-SoqEldi7evAfvas4X1EPse0VhJYWtgzhIjNs4RoXAazz4j4xPRgAQEYSL4JG6ZnT2fwCNq8uTqsnxi77aP0NvM69CmaOm_h-4yL3xCpVWV0k6HEiwO-fgn0fFQeHHRemKeXlGWnjrCBob4s1bDgjh0VWkTHRmZIbEA3jt6Ehh1VZQrlVusPOJggRF63X3sTowcQM5dPae-bHLMhdOB6pov8PKEOaWoR1pRw64NheynDAaA5elyCbP_xnG5cCuzDekt6U5K9KZ-wdc3kQFgS4kgbA1Ox1n3k2zbag_mqPkNOhzQ9AzDehO8H6W8L49hvQCQtmGAcm6nuA=";

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
        this.load()
    },

    methods: {
        load: function load() {
            const that = this;
            PSPDFKit.load({
                pdf: this.pdfUrl,
                container: '.container',
                licenseKey: this.licenseKey,
                baseUrl: this.baseUrl,
            })
            .then(function (instance) {
                that._instance = instance;
                that.$parent.errorMsg = ''
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
        }
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
            
            showMessages: false,

            calendarPlugins: [ dayGridPlugin ],

            requestUserLogin : [],
            userInfo : [],
            dashboardMenuList : [],
            eventArray: [],
            companyDetail: [],
            userLanguage: [],
            allLanguages: [],
            companyList: [],
            companyListId: "",

            moment: moment,
         
            date: 1570064727,

            // currentComponent: 'pspdfkitComponent',

            pdf:'example.pdf',
            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',
        }),

        filters: {
              moment: function(date){
                return moment(date).format('YYYY-MM-DD');
            },
        },


        methods: {
            openPdf(itemUrl){
                this.closePDF = !this.closePDF
                this.pdf=itemUrl;
                //window.open(itemUrl);
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

            logout(){
                this.$store.commit("setAuthentication", false)
                this.$router.replace('/')
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
                        this.userLanguage = (JSON.parse(JSON.stringify(this.requestUserLogin.userLanguage)));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            getCompanyList(){
                //check response
                //check if there is data inside the response object
                //remove console logging
                //error handling using user friendly language
                //sync, async
                //fd
                //axios interceptors
                //Vuex, redux
                //es6
                //developer edition of firefox

                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getCompanyList");
                formData.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getCompanyList = response.data;
                        this.companyList = this.getCompanyList.companyList;
                        // let companyId = this.companyList.companyId;
                        this.$localStorage.set('getCompanyList', JSON.stringify(this.getCompanyList))
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
                        this.getLatestNotifications = response.data;
                        this.$localStorage.set('getLatestNotifications', JSON.stringify(this.getLatestNotifications))
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
                // this.setCompanyId(companyId);
                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getRecentDocuments");
                formData.append('companyId', UserData.getCompanyId());
                // formData.append('companyId', UserData.getCompanyListId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getRecentDocuments = response.data;
                        this.$localStorage.set('getRecentDocuments', JSON.stringify(this.getRecentDocuments))
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
                        this.getCalendarEvents = response.data;
                        this.eventArray = this.getCalendarEvents.eventList;
                        this.$localStorage.set('getCalendarEvents', JSON.stringify(this.getCalendarEvents));
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
                // console.log(item);
                // let companyId = this.companyList;
                alert(item.companyId);
                // alert(this.dashboardMenuList.length);
                this.dashboardMenuList = 0;
                // this.dashboardMenuList = this.dashboardMenuList.splice(0, this.dashboardMenuList.length);
                // alert(this.dashboardMenuList.length);
                this.dashboardMenuList = item.dashboardMenuList;
                // alert(this.dashboardMenuList.length);

                //Recent Documents
                UserData.setCompanyId(item.companyId);
                
                // COMPANY LIST
                const formData1 = new FormData();
                formData1.append('userId', UserData.getUserId());
                formData1.append('companyCode', UserData.getCompanyCode());
                formData1.append('accessToken', UserData.getAccessToken());
                formData1.append('model', "getCompanyList");
                formData1.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData1)
                    .then(response => {
                        this.getCompanyList = response.data;
                        this.companyList = this.getCompanyList.companyList;
                        // let companyId = this.companyList.companyId;
                        this.$localStorage.set('getCompanyList', JSON.stringify(this.getCompanyList))
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })

                //NOTIFICATIONS AND TASKS
                const formData2 = new FormData();
                formData2.append('userId', UserData.getUserId());
                formData2.append('companyCode', UserData.getCompanyCode());
                formData2.append('accessToken', UserData.getAccessToken());
                formData2.append('model', "getLatestNotifications");
                formData2.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData2)
                    .then(response => {
                        this.getLatestNotifications = response.data;
                        this.$localStorage.set('getLatestNotifications', JSON.stringify(this.getLatestNotifications))
                    })
                    .catch(e => {
                        console.log('Error', e);
                    }) 

                //RECENT DOCUMENTS
                const formData3 = new FormData();
                formData3.append('userId', UserData.getUserId());
                formData3.append('companyCode', UserData.getCompanyCode());
                formData3.append('accessToken', UserData.getAccessToken());
                formData3.append('model', "getRecentDocuments");
                formData3.append('companyId', UserData.getCompanyId());
                // formData3.append('companyId', UserData.getCompanyListId());

                axios.post(UserData.getBaseUrl(), formData3)
                    .then(response => {
                        this.getRecentDocuments = response.data;
                        this.$localStorage.set('getRecentDocuments', JSON.stringify(this.getRecentDocuments))
                        })
                    .catch(e => {
                        console.log('Error', e);
                    })    

                //CALENDAR
                const formData4 = new FormData();
                formData4.append('userId', UserData.getUserId());
                formData4.append('companyCode', UserData.getCompanyCode());
                formData4.append('accessToken', UserData.getAccessToken());
                formData4.append('model', "getCalendarEvents");  
                formData4.append('companyId', UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData4)
                    .then(response => {
                        this.getCalendarEvents = response.data;
                        this.eventArray = this.getCalendarEvents.eventList;
                        this.$localStorage.set('getCalendarEvents', JSON.stringify(this.getCalendarEvents));
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

            setCompanyId(companyId){
                UserData.setCompanyId(companyId);
                // window.location.reload();
                // alert (UserData.getCompanyId());
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

            openPDF: function openPDF(e) {
                this.pdf = window.URL.createObjectURL(e.target.files[0])
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            }        
        },
      
        beforeMount(){
            this.getRequestUserLogin();
            this.getCompanyList();
            this.getLatestNotifications();
            this.getEboardUpdates();
            this.getRecentDocuments();
            this.getCalendarEvents();
        },

        mounted() {
            const getRecentDocuments = JSON.parse(this.$localStorage.get('getRecentDocuments'));
            const getLatestNotifications = JSON.parse(this.$localStorage.get('getLatestNotifications'))
            
            if (getRecentDocuments) {  
                this.getRecentDocuments = getRecentDocuments;
            }

            if (getLatestNotifications) {  
                this.getLatestNotifications = getLatestNotifications;
            }
        },

        components: {
            FullCalendar, // make the <FullCalendar> tag available
            // 'pspdfkitComponent': pspdfkitComponent,
            pspdfkit: pspdfkit
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
        /* overflow: auto; */
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
        /* padding: 5px; */
        text-align: left;
        height:40px;
        /* width: 200px; */
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

    .col-left{
        align-content: center;
        z-index: -1;
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

    /* table.scroll {
        width: 100%; 
        border-spacing: 0;
    }

    tbody tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    tbody td:last-child, thead th:last-child {
        border-right: none;
    } */

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
