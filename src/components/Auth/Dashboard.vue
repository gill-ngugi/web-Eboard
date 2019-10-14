<template>    
    <div>
        <div class="wrap">    

          <div class="nav-menu">
                <button class="btn btn-lg" style="outline:none; border:none;" text v-on:click="seen1 = !seen1">
                    STL Vision
                    <span class="input-group-addon"><i class="fa fa-chevron-down"></i></span>                            
                </button>
                <!-- <v-spacer></v-spacer> -->
                <!-- <span style="width:200px"> </span> -->
                    <img class="bgimg-1" src="../img/eboard_Logo_new@2x.png" style="margin-left:30%; margin-right:17.5%; height:75%; width:auto; padding-top:5px">
                    <!-- <img class="bgimg-1" src="../img/eboard-sm.png" style="margin-left:30%; margin-right:20%;"> -->
                <!-- <v-spacer></v-spacer> -->
                <button class="btn btn-lg" style="outline:none; border:none;" text v-on:click="seen2 = !seen2; ">English</button>
                <button class="btn btn-lg" @click="reloadPage"><v-icon color="#ffffff">mdi-refresh</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen4 = !seen4;"><v-icon color="#ffffff">mdi-magnify</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen5 = !seen5"><v-icon color="#ffffff">mdi-contact-mail</v-icon></button>
                <button class="btn btn-lg" text v-on:click="seen6 = !seen6"><v-icon color="#ffffff">mdi-dip-switch</v-icon></button>
          </div>

            <!-- STL Vision -->
            <div style="height: auto; width: auto; position: absolute; z-index: 1;" v-if="seen1">
                <v-list>
                    <v-list-item-title style="color:#e33333; padding:15px;">Company List</v-list-item-title>
                    <!-- <v-list-item-subtitle style="color: #e33333; padding-bottom:15px; padding-left:15px;">STL Vision</v-list-item-subtitle> -->
                    <v-list-item
                        v-for="(item, index) in getCompanyList.companyList"
                        :key="index"                                
                    >
                    <v-list-item-title>{{ item.companyName }} <v-divider></v-divider></v-list-item-title>  
                    </v-list-item>
                </v-list>
            </div>

            <!-- English -->
            <div style="margin-left:80%; height:auto; width:20%; position:absolute; z-index:1;" 
                v-if="seen2">
                 <v-list style="position">
                    <v-list-item-title style="color:#e33333; padding:15px;">Select Language</v-list-item-title>
                     
                <!-- Loops from Static JSON -->
                    <v-list-item
                        v-for="(item, index) in getEboardUpdates.allLanguages" 
                        :key="index"                        
                    >
                    <v-list-item-title> {{item.language}} <v-divider></v-divider></v-list-item-title>  
                    </v-list-item>
                <!-- Loops from script below -->
                    <!-- <v-list-item
                        v-for="(language, index) in languages"
                        :key="index"                                
                    >
                    <v-list-item-title>{{ language.title }} <v-divider></v-divider></v-list-item-title>  
                    </v-list-item> -->
                </v-list>
            </div>

            <!-- Search -->
            <div style="margin-left: 70%; height:auto; width: 30%; position: absolute; z-index: 1;" 
                v-if="seen4">
                <v-list style="position; padding:5%; color:#e33333">
                    <div class="input-group-addon" style="margin-bottom:20px;">
                        <input type="text" placeholder="Search" style="width:84%; float:left; outline:none; border-bottom:2px solid #e33333;" >
                        <button class="btn btn-md" style="padding:0px; float:left; outline:none;" text><v-icon color="#e33333">mdi-magnify</v-icon></button>                    
                    </div>
                </v-list>
            </div>

            <!-- Profile -->
            <div style="margin-left:65%; height:auto; width:35%; position:absolute; z-index:1;" 
                v-if="seen5">
                <v-card style="padding:1%; color:#e33333; height:auto;">
                    <v-card-actions>
                    <div style="float:left; margin:0px;">
                        <!-- <v-icon size="55">mdi-contact-mail</v-icon> -->
                        <img src="../img/male-icon.png" style="height:85px; width:95px; background-color:cyan; border:1px solid black;">
                    </div>
                    <div style="float:left; position:relative; margin:0px;">    
                        <v-card-text>
                            <p style="font-size:21px; margin:0px;">{{userInfo.userDesignation}}</p>
                            <p style="font-size:13px; margin:0px;">{{userInfo.userPhone}}</p>
                            <p style="font-size:13px; margin:0px;">{{userInfo.userEmail}}</p> 
                        </v-card-text>
                    </div>
                    </v-card-actions>
                </v-card>
            </div>

            <!-- OPTIONS -->
            <div style="margin-left:75%; height:auto; width:25%; position:absolute; z-index:1;" v-if="seen6">
                <v-list style="padding:2%; background-color:#ffffff;">
                 
                    <div><p style="color:#e33333;">Options<span style="float:right;">v3.0.1</span></p></div>
                    
                    <div class="row" style="margin:0px; padding:0px;">
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
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">
                            Change Password
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
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
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                    <div class="row" style="margin:0px; margin-top:3px; margin-bottom:3px; padding:0px;">
                        <div class="col-md-12 col-sm-12" style="margin:0px; padding:0px;">                        
                            Logout
                        </div>                       
                    </div>
                    <v-divider style="margin:0px; padding:0px;"></v-divider>

                </v-list>
            </div>
        
            <div class="col-left">             
                    <div v-for="(item, index) in even(dashboardMenuList)" :key="index">
                        <router-link :to="{name : item.menuTitle}" style="text-decoration:none;" :style="{color:'rgb(' + item.menuColor + ')'}"> 
                            <div class="left-menu" style="border-top: 5px solid">
                                <div class="input-group" >
                                    <span class="input-group-addon">
                                        <img v-bind:src="item.menuImageUrl"  v-bind:alt="item.menuTitle" v-bind:style="{width:'50px', height:'40px' }">
                                        <!-- <img v-bind:src="{ 'background-image': 'url(' + item.menuImageUrl + ')' }" v-bind:alt="item.menuTitle"> -->
                                        <!-- <i class="fa fa-briefcase" style="font-size:48px;"></i> -->
                                        </span>
                                    <v-spacer></v-spacer>       
                                    <p> {{item.menuTitle}}</p>
                                </div>                        
                            </div>  
                        </router-link>
                    </div>

                    <!-- <div v-for="(item, index) in even(dashboardMenuList)" :key="index" style="color:purple">
                        <router-link to="/Briefcase" style="text-decoration:none; color:red;">     
                            <div class="left-menu" style="border-top: 5px solid">
                                <div class="input-group" >
                                    <span class="input-group-addon"><i class="fa fa-briefcase" style="font-size:48px;"></i></span>
                                    <v-spacer></v-spacer>                        
                                    <h5 style="margin-top:8px;"> {{item.menuTitle}}</h5> 
                                </div>                        
                            </div>                              
                        </router-link>
                    </div> -->

                <!-- <router-link to="/Briefcase" style="text-decoration:none;">      
                    <div class="left-menu" style="border-top: 5px solid #e67e22;">
                        <div class="input-group" >
                            <span class="input-group-addon"><i class="fa fa-briefcase" style="font-size:48px; color: #e67e22;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color: #e67e22;">Briefcase</h5> 
                        </div>                        
                    </div>
                </router-link> -->

                        
<!-- 
                <router-link to="/briefcase" style="text-decoration:none;">      
                    <div class="left-menu" style="border-top: 5px solid #e67e22;">
                        <div class="input-group" >
                            <span class="input-group-addon"><i class="fa fa-briefcase" style="font-size:48px; color: #e67e22;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color: #e67e22;">Briefcase</h5> 
                        </div>                        
                    </div>
                </router-link>

                <router-link to="/meeting-packs" style="text-decoration:none;">      
                    <div class="left-menu" style="border-top: 5px solid #3498db;">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-archive" style="font-size:48px; color:#3498db;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:#3498db;">Meeting Packs</h5> 
                        </div>
                    </div>
                </router-link>    

                <router-link to="/meetings" style="text-decoration:none;">
                    <div class="left-menu" style="border-top: 5px solid #3498db;">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-archive" style="font-size:48px; color:#3498db;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:#3498db;">Meetings</h5> 
                        </div>
                    </div>
                </router-link>    

                <router-link to="/resources" style="text-decoration:none;">
                    <div class="left-menu" style="border-top: 5px solid #e33333;">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-folder-open" style="font-size:48px; color: #e33333;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color: #e33333;">Resources</h5> 
                        </div>
                    </div>
                </router-link>    

                <router-link to="/approvals" style="text-decoration:none;">
                    <div class="left-menu" style="border-top: 5px solid #27ae60;">
                        <div class="input-group">
                            <span class="input-group-addon"><v-icon color="#27ae60" size="48">mdi-checkbox-multiple-marked-outline</v-icon></span>                       
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:#27ae60;">Approvals</h5> 
                        </div>
                    </div>
                </router-link>    

                <router-link to="/compliance" style="text-decoration:none;">
                    <div class="left-menu" style="border-top: 5px solid #a93226;">
                        <div class="input-group">
                            <span class="input-group-addon"><v-icon color="#a93226" size="48">mdi-file-document-box-check</v-icon></span>                       
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:#a93226;">Compliance</h5> 
                        </div>
                    </div>
                </router-link>

                <router-link to="/evaluation" style="text-decoration:none;">
                    <div class="left-menu" style="border-top: 5px solid #211e43;">
                        <div class="input-group">
                            <span class="input-group-addon"><v-icon color="#211e43" size="48">mdi-chart-bar</v-icon></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:#211e43;">Evaluation</h5> 
                        </div>
                    </div>
                </router-link>

                <router-link to="/discussion" style="text-decoration: none;">
                    <div class="left-menu" style="border-top: 5px solid purple;">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-comments" style="font-size:48px; color:purple;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:purple;">Discussion</h5> 
                        </div>
                    </div>
                </router-link>

                 <router-link to="/discussion" style="text-decoration: none;">
                    <div class="left-menu" style="border-top: 5px solid purple;">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-comments" style="font-size:48px; color:purple;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:purple;">Discussion</h5> 
                        </div>
                    </div>
                </router-link>

                 <router-link to="/discussion" style="text-decoration: none;">
                    <div class="left-menu" style="border-top: 5px solid purple;">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-comments" style="font-size:48px; color:purple;"></i></span>
                            <v-spacer></v-spacer>                        
                            <h5 style="margin-top:8px; color:purple;">Discussion</h5> 
                        </div>
                    </div>
                </router-link> -->
            </div>
            

            <div class="col-right">
                <div class="col-right-top" style="padding-bottom:10px;">

                    <div class="input-group" style="color: #27ae60; font-weight:bold;">
                        <span class="input-group-addon"><v-icon color="#27ae60">mdi-file-document</v-icon></span>
                        <p style="margin-left:20px; margin-right:20px;">My Inbox</p> 
                        <v-spacer></v-spacer>                        
                        <button class="btn btn-lg" text @click="reloadPage"><v-icon color="#27ae60">mdi-refresh</v-icon></button>
                    </div>


                    <table class="table table-striped scroll">
                        <thead>
                            <!-- <tr style="background-color:#27ae60; color:#ffffff;"> -->
                            <tr>
                                <th style="">No.</th>
                                <th style="padding-right:10px;"></th>
                                <th style="padding-right:405px;">Name</th>
                                <th style="padding-right:35px;">Size</th>
                                <th style="padding-right:10px;">Created On</th>
                                <th style="padding-right:30px;">Briefcase</th>
                            </tr>
                        </thead>

                        <tbody >
                            <tr v-for="(item, index) in getRecentDocuments.recentDocumentsList" :key="index">
                                <td>1.</td>
                                <td>    
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                </td>
                                <td style="max-width:450px;" >
                                    {{item.itemName}}
                                </td>
                                 <td style="max-width:210px;">
                                    {{item.itemSize}}
                                </td>
                                <td style="max-width:210px;" >
                                    {{item.itemCreatedOn}}
                                </td>
                                <td style="max-width:180px; padding-right:10px;">
                                    <button class="btn btn-danger">Remove</button>
                                </td>
                            </tr>

                            <!-- <tr>
                                <td style="max-width:40px;">Contentiuyjghfhgfhgfhgfbdhdhdhththteh 1</td>
                                <td style="max-width:40px;">Content 2</td>
                                <td style="max-width:380px;">Contekjhghg,jhhjgkjhbjkjhnt 3</td>
                                <td style="max-width:180px;">Content 4</td>
                                <td style="max-width:180px;">Content 5</td>
                                <td style="max-width:150px;">Content 5</td>
                            </tr>
                            <tr>
                                <td style="max-width:40px;">Content 1</td>
                                <td style="max-width:40px;">Lorem ipsum dolor sit amet.</td>
                                <td style="max-width:380px;">Content 3</td>
                                <td style="max-width:180px;">Content 4</td>
                                <td style="max-width:180px;">Content 5</td>
                                <td style="max-width:150px;">Content 5</td>
                            </tr>
                            <tr>
                                <td style="max-width:40px;">Content 1</td>
                                <td style="max-width:40px;">Content 2</td>
                                <td style="max-width:380px;">Content 3</td>
                                <td style="max-width:180px;">Content 4</td>
                                <td style="max-width:180px;">Content 5</td>
                                <td style="max-width:150px;">Content 5</td>
                            </tr> -->
                        </tbody>
                    </table>


                    <!-- <div style="padding:10px; height:170px; overflow:auto;"> -->
                     <!-- <table class="table table-striped"> -->
                        <!-- <thead> -->
                        <!-- <tr style="background-color:#27ae60; color:#ffffff; width:100%;">
                            <td>No.</td>
                            <td></td>
                            <td>Name</td>
                            <td>Size</td>
                            <td>Created On</td>
                            <td>Briefcase</td>
                        </tr> -->
                        <!-- </thead> -->

                        <!-- <tbody> -->
                          <!-- <span>   -->
                            <!-- <tr v-for="(item, index) in getRecentDocuments.recentDocumentsList" :key="index"
                                style="width:100%;">
                                <td>1.</td>
                                <td>    
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                </td>
                                <td>
                                    {{item.itemName}}
                                </td>
                                 <td>
                                    {{item.itemSize}}
                                </td>
                                <td>
                                    {{item.itemCreatedOn}}
                                </td>
                                <td>
                                    <button class="btn btn-danger">Remove</button>
                                </td>
                            </tr> -->
                          <!-- </span> -->

                            <!-- <tr>
                                <td>1</td>
                                <td>
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                    Doe
                                </td>
                                <td>0.18 MB</td>
                                <td>23-Aug-2019</td>
                                <td><button class="btn btn-danger">Remove</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                    Moe
                                </td>
                                <td>0.18 MB</td>
                                <td>23-Aug-2019</td>
                                <td><button class="btn btn-danger">Remove</button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                    Dooley
                                </td>
                                <td>0.18 MB</td>
                                <td>23-Aug-2019</td>
                                <td><button class="btn btn-danger">Remove</button></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                    Alhga
                                </td>
                                <td>0.18 MB</td>
                                <td>23-Aug-2019</td>
                                <td><button class="btn btn-danger">Remove</button></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>
                                    <span class="input-group-addon"><v-icon color="#27ae60" style="margin-right:5px;">mdi-file-pdf-outline</v-icon></span>
                                    Gaiah
                                </td>
                                <td>0.18 MB</td>
                                <td>23-Aug-2019</td>
                                <td><button class="btn btn-success">Add</button></td>
                            </tr> -->
                        <!-- </tbody> -->
                    <!-- </table>  -->
                    <!-- </div> -->
                </div>


                <div class="col-right-bottom">
                    <div class="col-right-bottom-left">                     
                        <div id="wrapper">
                            <div v-show="test" class="input-group" style="">
                                <span class="input-group-addon" ><v-icon style="color: #e33333; font-size:22px; margin-top:4px; font-weight:bold;">mdi-bell-outline</v-icon></span>
                                    <p v-on:click="test = !test" style="margin-left:9px; font-size:19px; color: #e33333; font-weight:bold; cursor: pointer;">Notifications</p> 
                                        <v-spacer></v-spacer>
                                    <p style="margin-right:9px; color: #e33333;">Tasks</p> 
                                <span class="input-group-addon" style="font-size:13px; font-weight:bold; color: #e33333; margin-top:4px;"><i class="fa fa-chevron-right"></i></span>
                               
                                <div style="height:380px; overflow:scroll;">
                                    <span style="margin:0px; padding:0px;" v-for="(notification, index) in getLatestNotifications.notificationsList" :key="index">
                                        <div class="row" style="width:100%; margin:0px; padding:0px;">
                                            <div class="col-md-2" style=" margin:0px; padding:0px;">
                                                <v-icon color="#E74343" style="margin-top:25px;">mdi-square</v-icon>
                                            </div>
                                            <div class="col-md-10" style="margin:0px; padding:0px;">
                                                <p style="font-size:17px; margin:0px; padding:0px;">{{ notification.notificationTitle }}</p> 
                                                <p style="font-size:12px; margin:0px; padding:0px;">{{ notification.notificationDateTime }}</p> 
                                                <p style="font-size:12px; margin:0px; padding:0px;">{{ notification.companyName }}</p>
                                            </div>
                                        </div>   
                                        <v-divider></v-divider>
                                    </span>    
                                </div>
                            </div>

                            <div v-show="!test" class="input-group" style="">
                                    <span class="input-group-addon" ><v-icon style="color: #e33333; margin-top:4px; font-size:22px; font-weight:bold;">mdi-bell-outline</v-icon></span>
                                    <p v-on:click="test = !test" style="margin-left:9px; font-size:19px; color: #e33333; font-weight:bold; cursor: pointer;">Tasks</p> 
                                        <v-spacer></v-spacer>
                                    <p style="margin-right:9px; color: #e33333;">Notifications</p> 
                                    <span class="input-group-addon" style="font-size:13px; font-weight:bold; margin-top:4px; color: #e33333;"><i class="fa fa-chevron-right"></i></span>
                               
                                <div style="height:380px; overflow:scroll;">
                                    <span style="margin:0px; padding:0px;" v-for="(task, index) in getLatestNotifications.taskList" :key="index">
                                        <div class="row" style="width:100%; margin:0px; padding:0px;">
                                            <div class="col-md-2" style=" margin:0px; padding:0px;">
                                                <v-icon color="#E74343" style="margin-top:25px;">mdi-radiobox-marked</v-icon>
                                            </div>
                                            <div class="col-md-10" style="margin:0px; padding:0px;">
                                                <p style="font-size:17px; margin:0px; padding:0px;">{{ task.taskTitle }}</p> 
                                                <p style="font-size:12px; margin:0px; padding:0px;">{{ task.taskDateTime }}</p> 
                                                <p style="font-size:12px; margin:0px; padding:0px;">{{ task.companyName }}</p>
                                            </div>
                                        </div>   
                                        <v-divider></v-divider>
                                    </span>    

                                </div>
                            </div>
                        </div>

                        
                    </div>

                    <div class="col-right-bottom-right"> 
                        <!-- <button v-on:click="getRequestUserLogin"> Get API Data </button> -->
                         <!-- <ul style=""> -->
                             <!--<li v-for="(item, index) in requestUserLogin.companyDetail" 
                             :key="index">{{item.companyName}}</li>
                             </ul> -->


                        <!-- <div v-for="(items, index) in requestUserLogin.allLanguages" :key="index" >
                            {{items.language}}
                        </div> -->
                          
                        <!-- <div v-for="(item, index) in even(dashboardMenuList)" :key="index">
                            <span>
                                {{item.menuId}} : {{item.menuTitle}}
                            </span>
                        </div> -->

                        <!-- <div v-bind:key="data.userId" v-for="data in stl" style="overflow:scroll;">{{data}}</div> -->
                        <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" />                      
                                               
                        <!-- <slider style="color:white;" :width="300" format="push" direction="right" :opacity="0.15"></slider> -->
                        <!-- <button class="btn btn-lg btn-primary" v-on:click="seen = !seen">Toggle</button> -->
                            <!-- <p v-if="seen">Message Can Be Seen!</p> -->
                        <!-- <button class="btn btn-lg btn-primary" v-on:click="seen3 = !seen3">Toggle2</button>
                            
                        <v-card height="350px" width="80px" v-if="seen">
                            <v-navigation-drawer
                            absolute
                            permanent
                            left
                            >
                            <template v-slot:prepend>
                                <v-list-item two-line>
                                <v-list-item-avatar>
                                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Jane Smith</v-list-item-title>
                                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                            </template>

                            <v-divider></v-divider>

                            <v-list dense>
                                <v-list-item
                                v-for="item in navDrawer"
                                :key="item.title"                                
                                > -->
                                <!-- @click="" -->
                                <!-- <v-list-item-icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            </v-navigation-drawer>
                        </v-card> -->

                        <!-- CARD 2 -->
                        <!-- <v-card height="350px" v-if="seen3" style="margin-top:20px;">
                            <v-navigation-drawer
                            absolute
                            permanent
                            left
                            >
                            <template v-slot:prepend>cd..
                                
                                <v-list-item two-line>
                                <v-list-item-avatar>
                                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Jane Smith</v-list-item-title>
                                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                            </template>

                            <v-divider></v-divider>

                            <v-list dense>
                                <v-list-item
                                v-for="item in navDrawer"
                                :key="item.title"                                
                                > -->
                                <!-- @click="" -->
                                <!-- <v-list-item-icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            </v-navigation-drawer>
                        </v-card> -->                          
                    </div>              
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
    // import Slider from '@jeremyhamm/vue-slider';
    import axios from 'axios';
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    // import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'
    // import requestUserLogin from "../../assets/requestUserLogin.json";


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
            

            // dashStyle:{
            //      color: "rgb(0,255,0)"
            // }

        }),

        mounted() {
          
        },

        methods: {
            reloadPage(){
                window.location.reload();
            },            

            getRequestUserLogin(){
                // fetch("../assets/json-APIs/requestUserLogin.json")
                // .then(response => response.json())
                // .then(data => (this.requestUserLogin = data))

                axios.get("../assets/json-APIs/requestUserLogin.json")
                    .then(response => {
                        this.requestUserLogin = response.data;
                        this.userInfo = (JSON.parse(JSON.stringify(this.requestUserLogin.userInfo)));
                        this.dashboardMenuList = this.requestUserLogin.dashboardMenuList;
                        // this.dashStyle={
                        //     // color: "rgb("+ this.dashboardMenuList.menuColor +")"    
                        //     color: "blue"                          
                        // };
                        // console.log(JSON.parse(JSON.stringify(this.requestUserLogin.userInfo)));
                        //userInfo=JSON.parse();
                    })

                    .catch(error => {
                        console.log(error);
                    })

                // this.$http.get("../assets/json-APIs/requestUserLogin.json", {responseType: 'json'}).then(response => {
                //     return response.json();
                // }).then(jsonData => {
                //     this.data = JSON.parse(jsonData);
                // }).catch(e => {
                //     console.log('Error', e);
                // });
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
            }
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
            // 'slider': Slider
        },

    }

</script>

<style scoped>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
 
    .wrap{
        /* margin: 0 auto; */
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
        float:left;
        width:26%;
        height: auto;
        overflow:hidden;
        margin-right: 1%;
        margin-bottom: 1%;
        margin-top:1%;
        position: relative;
        align-content: center;
        z-index: -1;
    } 

    .col-left .left-menu{
        background-color: #f5f5f5 ;
        align-content: center;
        /* border-top: 5px solid blue; */
        padding: 3%;
        margin-bottom:5px;
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
        width: 40%;
        height: 430px;
        background-color: #f5f5f5;
        margin-right:1%;
        float:left;
        padding:1%;
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
        height: 120px;
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


</style>