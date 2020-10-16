<template>    
    <div>
        <v-app>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">           
            <router-link to="/dashboard" style="text-decoration:none;"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
            <p style="font-weight:bold; font-size:24px; margin-left:40%;">Evaluation</p>
        </div>

        <!-- COMPONENT -->
            <div style="height:850px; margin-top:0.5%; margin-bottom:0.5%; background-color:#f8f9f9; border-top:5px solid rgb(72,61,139); width:98%; margin-left:1%; margin-right:1%;">
                <div class="two" v-if="two" style="margin-top:7px; position:absolute; background-color:#f5f5f5; width:98%; height:900px; margin-right:1%; z-index:3;">
                    <div style="display:flex; margin-left:1%; margin-bottom:10px;">
                        <v-icon @click="two = !two; categories = []; evaluateeName=''; comm=''; categoryId=0; evaluationId='';" style="color:#fff; background-color:rgb(72,61,139);">mdi-chevron-left</v-icon>
                        <h4 style="margin-left:10px; color:rgb(72,61,139);">{{ evalName }} {{"   => " + evaluateeName }}</h4>
                    </div>
                    <div>
                        <div class="left1" style="float:left; width:11%; height:700px; overflow:auto; margin-left:1%; margin-right:1%; margin-bottom:20px; text-align:center">
                            <!-- Use Computed Property -->
                            <!-- <v-card v-for="(item, index) in evalArray" :key="index" style="width:100%; height:auto; padding:5px; background-color:#fff; margin-bottom:7px;">
                                <img src="./male-icon.png" style="height:90px; width:80px; margin-top:7px; border:1px solid #000; border-radius:50%;">
                                <p>{{item.userName}}</p>
                            </v-card> -->
                            <div v-for="(items, index) in evaluatees" :key="index">
                                <v-card v-for="(item, index) in items" :key="index" @click="tab = 0; questionArr = []; setEvaluateeId(item.userId); setEvaluateeName(item.userName); getEvaluationDetail();" style="width:100%; height:auto; padding:5px; background-color:#fff; margin-bottom:7px; cursor:pointer;">
                                    <img v-if="item.userImageURL" :src="item.userImageURL" style="height:90px; width:80px; margin-top:7px; border:1px solid #000; border-radius:50%;">
                                    <img v-else src="./male-icon.png" style="height:90px; width:80px; margin-top:7px; border:1px solid #000; border-radius:50%;">
                                    <p>{{item.userName}}</p>
                                    <!-- <p :class="clicked ? 'blue' : ''" @click="clicked = !clicked;" >{{item.userName}}</p> -->
                                </v-card>
                            </div>
                        </div>
                        <div class="right1" style="float:left; width:86%; height:700px; overflow:auto; background-color:#f5f5f5; margin-right:1%;">
                            <v-card>
                                <v-card-text v-if="setsttId == 3" style="color:red; font-weight:bold; font-size:19px;">Evaluation Completed!</v-card-text>
                                <v-tabs grow show-arrows v-model="tab" background-color="rgb(220,220,220)" color="rgb(72,61,139)" style="font-weight:bolder;">
                                <v-tabs-slider></v-tabs-slider>
                                    <!-- <v-tab v-for="(item, index) in categories" :key="index" style="">
                                        <p v-if="item.isComplete == 0" style="margin-top:10px; pointer-events:none;">{{ item.categoryName }}</p>
                                        <p v-else style="margin-top:10px; color:green;">{{ item.categoryName }}</p>
                                    </v-tab> -->

                                    <div v-for="(item, index) in categories" :key="index">
                                        <v-tab v-if="item.isComplete == 0" style="pointer-events:none;">
                                            <p style="margin-top:10px;">{{ item.categoryName }}</p>
                                        </v-tab>
                                        <v-tab v-else style="">
                                            <p style="margin-top:10px; color:green;">{{ item.categoryName }}</p>
                                        </v-tab>
                                    </div>
                                </v-tabs>
                                <v-tabs-items v-model="tab">
                                    <!-- <v-card-text v-if="quesLength != ansLength" style="color:red; font-weight:bold; font-size:19px;">Answer all questions!</v-card-text> -->
                                    <v-tab-item v-for="(item, index) in categories" :key="index">
                                        <v-card v-if="setsttId == 1 || setsttId == 7">
                                            <v-card flat v-for="(itemy, index) in item.questions" :key="index" style="display:flex; border-bottom:1px solid rgb(220,220,220)">
                                                <v-card-text style="font-size:19px;">
                                                    {{ index + 1 + "." }} {{ itemy.questionName }} 
                                                </v-card-text>

                                                <button v-for="(item, index) in itemy.buttonLoop" :key="index" :id="itemy.questionId" class="targety" style="border-radius:60%;" 
                                                    @click="saveContinue(itemy.questionId, item.val)">
                                                    {{item.val}}
                                                </button>
                                            </v-card>
                                            <!-- <v-btn v-if="(categories[categories.length - 1]) == item" v-bind="attrs" v-on="on" @click="clickMe(item, index, categories)" color="rgb(220,220,220)" style="width:100%; display:flex; padding-top:10px;">
                                                <p style="color:rgb(72,61,139);">Review</p>
                                            </v-btn>
                                            <v-btn v-else @click="tab++; clickMe(item, index, categories)" color="rgb(220,220,220)" style="width:100%; display:flex; padding-top:10px;">
                                                <p style="color:rgb(72,61,139);">Save and Continue</p>
                                            </v-btn> -->

                                            <template v-if="item.isComplete == 0">
                                                <div class="text-center">
                                                    <v-dialog v-model="dialogg" width="1200">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn v-if="(categories[categories.length - 1]) == item" v-bind="attrs" v-on="on" @click="setCategoryId(item.categoryId); clickMe(item, index, categories);" color="rgb(220,220,220)" style="width:100%; display:flex; padding-top:10px; border:1px solid rgb(72,61,139);">
                                                                <p style="color:rgb(72,61,139);">Review</p>
                                                            </v-btn>
                                                            <v-btn v-else @click="tab++; setCategoryId(item.categoryId); clickMe(item, index, categories)" color="rgb(220,220,220)" style="width:100%; display:flex; padding-top:10px; border:1px solid rgb(72,61,139)">
                                                                <p style="color:rgb(72,61,139);">Save and Continue</p>
                                                            </v-btn>
                                                        </template>

                                                        <div class="grey lighten-2" style="height:700px; border-top:5px solid rgb(72,61,139);">
                                                            <div style="height:8%; background-color:purple;">
                                                                <v-card-title class="headline grey lighten-2" style="color:rgb(72,61,139); margin-bottom:15px; padding-bottom:15px;">
                                                                    <v-btn @click="dialogg = false" color="rgb(72,61,139)" dark style="margin-right:10px;">
                                                                        <v-icon>mdi-close-outline</v-icon>
                                                                    </v-btn>
                                                                    Category wise questions list
                                                                </v-card-title>
                                                            </div>
                                                            <div style="height:87%; overflow:auto;">
                                                                <v-card class="grey lighten-2" style="padding-bottom:20px;">
                                                                    <div style="overflow:auto;" v-for="(item, index) in categories" :key="index">
                                                                        <v-card-text style="color:rgb(72,61,139); font-size:19px; font-weight:bold;">{{ item.categoryName }}</v-card-text>
                                                                        <div v-for="(itemy, index) in item.questions" :key="index" style="background-color:#fff; width:96%; margin-left:2%; margin-right:2%;">
                                                                            <div style="display:flex;">
                                                                                <v-card-text style="">{{ itemy.questionName }}</v-card-text>
                                                                                <div style="flex-grow:1"></div>
                                                                                <button class="targety" style="border-radius:60%;">1</button>
                                                                                <button class="targety" style="border-radius:60%;">2</button>
                                                                                <button class="targety" style="border-radius:60%;">3</button>
                                                                                <button class="targety" style="border-radius:60%;">4</button>
                                                                                <button class="targety" style="border-radius:60%;">5</button>
                                                                            </div>
                                                                            <v-divider style="margin:0px;"></v-divider>
                                                                        </div>
                                                                    </div>
                                                                </v-card>
                                                            </div>
                                                            <div style="height:5%;">
                                                                <v-btn color="rgb(220,220,220)" style="width:100%; display:flex; padding-top:10px; border:2px solid rgb(72,61,139)">
                                                                    <p style="color:rgb(72,61,139);">Submit Evaluation</p>
                                                                </v-btn>
                                                            </div>
                                                        </div>
                                                    </v-dialog>
                                                </div>
                                            </template>

                                            <template v-else></template>

                                        </v-card>
                                        <v-card v-else>
                                            <v-card flat v-for="(itemy, index) in item.questions" :key="index" style="display:flex; border-bottom:1px solid rgb(220,220,220)">
                                                <v-card-text style="font-size:19px;">
                                                    {{ index + 1 + "." }} {{ itemy.questionName }} 
                                                </v-card-text>

                                                <button v-for="(item, index) in itemy.buttonLoop" :key="index" :id="itemy.questionId" class="targety" style="border-radius:60%; pointer-events:none" 
                                                    @click="saveContinue(itemy.questionId, item.val)">
                                                    {{item.val}}
                                                </button>
                                            </v-card>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                            
                        </div>
                    </div>

                    <!-- COMMENTS POPUP ONCLICK FOOTER-->
                    <div v-if="comments"> 
                        <div v-if="comm == 0">
                            <v-card elevation="20" style="display:flex; position:absolute; margin-left:13%; margin-top:29%; z-index:3;">
                                <v-card-text style="color:red; font-weight:bold;">Select an evaluatee to enable comments.</v-card-text>
                                <span style="flex-grow:1;"></span>
                                <v-btn @click="comments=!comments;" color="red"><v-icon>mdi-close-outline</v-icon></v-btn>
                            </v-card>
                        </div>

                        <div v-else>
                            <div v-if="canComment == 1">
                                <v-card elevation="20" style="position:absolute; margin-left:13%; margin-top:27%; z-index:3;">
                                    <table class="table-striped" style="background-color:#cfcfc4;">
                                        <tbody>
                                            <v-dialog v-model="commentsDialog" persistent width="390" height="390">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <tr @click="categoryId = 0" v-bind="attrs" v-on="on" onMouseOver="this.style.backgroundColor='#fff';" onMouseOut="this.style.backgroundColor='#cfcfc4';">
                                                        <td style="padding:14px; font-size:19px; cursor:pointer;">Comment on Evaluation</td>
                                                    </tr>
                                                </template>
                                                <v-card class="grey lighten-2">
                                                    <form @submit.prevent> 
                                                        <v-card-title style="display:flex;">
                                                            Comments for this evaluation
                                                            <span style="flex-grow:1"></span>
                                                            <v-btn @click="commentsDialog=!commentsDialog; cancel();" dark color="red"><v-icon>mdi-close-outline</v-icon></v-btn>
                                                        </v-card-title>
                                                        <v-card-text v-if="success == 1" style="color:green; font-weight:bold;">{{ commentMessage }}</v-card-text>
                                                        <v-card-text v-else style="color:red; font-weight:bold;">{{ commentMessage }}</v-card-text>
                                                        <v-textarea v-model="commentsTextarea" solo placeholder="Evaluation Comments" style="margin:15px; margin-bottom:0px;"></v-textarea>
                                                        <v-card-actions style="margin-left:10px; margin-right:10px;">
                                                            <v-btn @click="commentsDialog=!commentsDialog; comments=!comments; cancel();" style="color:blue;">Cancel</v-btn>
                                                            <v-spacer></v-spacer>
                                                            <v-btn @click="commentEvaluation();" style="color:blue;">Submit</v-btn>
                                                        </v-card-actions>
                                                    </form>
                                                </v-card>
                                            </v-dialog>

                                            <v-dialog v-model="commentsDialog2" width="390" height="390">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <tr v-bind="attrs" v-on="on" onMouseOver="this.style.backgroundColor='#fff';" onMouseOut="this.style.backgroundColor='#ebecf0';">
                                                        <td style="padding:14px; font-size:19px; cursor:pointer;">Comment on current category</td>
                                                    </tr>
                                                </template>
                                                <v-card class="grey lighten-2">
                                                    <form @submit.prevent> 
                                                        <v-card-title style="display:flex;">
                                                            Comments for this category
                                                            <span style="flex-grow:1"></span>
                                                            <v-btn @click="commentsDialog2=!commentsDialog2; cancel();" dark color="red"><v-icon>mdi-close-outline</v-icon></v-btn>
                                                        </v-card-title>
                                                        <v-card-text v-if="success == 1" style="color:green; font-weight:bold;">{{ commentMessage }}</v-card-text>
                                                        <v-card-text v-else style="color:red; font-weight:bold;">{{ commentMessage }}</v-card-text>
                                                        <v-textarea v-model="commentsTextarea" solo placeholder="Category Comments" style="margin:15px; margin-bottom:0px;"></v-textarea>
                                                        <v-card-actions style="margin-left:10px; margin-right:10px;">
                                                            <v-btn @click="commentsDialog2=!commentsDialog2; comments=!comments; cancel();" style="color:blue;">Cancel</v-btn>
                                                            <v-spacer></v-spacer>
                                                            <v-btn @click="commentEvaluation();" style="color:blue;">Submit</v-btn>
                                                        </v-card-actions>
                                                    </form>
                                                </v-card>
                                            </v-dialog>

                                            <v-dialog v-if="isChairman == 1" v-model="commentsDialog3" width="390" height="390">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <tr @click="categoryId = 0" v-bind="attrs" v-on="on" onMouseOver="this.style.backgroundColor='#fff';" onMouseOut="this.style.backgroundColor='#cfcfc4';">
                                                        <td style="padding:14px; font-size:19px; cursor:pointer;">Comment as chairman</td>
                                                    </tr>
                                                </template>
                                                <v-card class="grey lighten-2">
                                                    <form @submit.prevent> 
                                                        <v-card-title style="display:flex;">
                                                            Comment as chairman
                                                            <span style="flex-grow:1"></span>
                                                            <v-btn @click="commentsDialog3=!commentsDialog3; cancel();" dark color="red"><v-icon>mdi-close-outline</v-icon></v-btn>
                                                        </v-card-title>
                                                        <v-card-text v-if="success == 1" style="color:green; font-weight:bold;">{{ commentMessage }}</v-card-text>
                                                        <v-card-text v-else style="color:red; font-weight:bold;">{{ commentMessage }}</v-card-text>
                                                        <v-textarea v-model="commentsTextarea" solo placeholder="Chairman Comments" style="margin:15px; margin-bottom:0px;"></v-textarea>
                                                        <v-card-actions style="margin-left:10px; margin-right:10px;">
                                                            <v-btn @click="commentsDialog3=!commentsDialog3; comments=!comments; cancel();" style="color:blue;">Cancel</v-btn>
                                                            <v-spacer></v-spacer>
                                                            <v-btn @click="commentEvaluation();" style="color:blue;">Submit</v-btn>
                                                        </v-card-actions>
                                                    </form>
                                                </v-card>
                                            </v-dialog>
                                        </tbody>
                                    </table>
                                </v-card>
                            </div>

                            <div v-else>
                                <v-card elevation="20" style="display:flex; position:absolute; margin-left:13%; margin-top:29%; z-index:3;">
                                    <v-card-text style="color:red; font-weight:bold;">Comments are disabled for this evaluation</v-card-text>
                                    <span style="flex-grow:1;"></span>
                                    <v-btn @click="comments=!comments;" color="red"><v-icon>mdi-close-outline</v-icon></v-btn>
                                </v-card>
                            </div>
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div style="display:flex; margin-left:1%; margin-right:1%; color:rgb(72,61,139); margin-top:15px; height:90px; width:99%;">
                        <!-- COMMENTS -->
                        <v-card @click="comments = !comments" style="width:19%; margin-right:1.5%; color:rgb(72,61,139); text-align:center; cursor:pointer; padding-top:7px;">
                            <!-- <v-icon size="45" color="rgb(72,61,139)">mdi-cryengine</v-icon> -->
                            <v-icon size="45" color="rgb(72,61,139)">mdi-forum</v-icon>
                            <h6>Evaluation Comments</h6>
                        </v-card>

                        <!-- SCALES -->
                        <v-dialog v-model="dialog" persistent max-width="290">
                            <template v-slot:activator="{ on }">
                                <v-card v-on="on" style="width:19%; margin-right:1.5%; color:rgb(72,61,139); text-align:center; cursor:pointer; padding-top:7px;">
                                    <v-icon size="45" color="rgb(72,61,139)">mdi-numeric</v-icon>
                                    <h6>Scales</h6>
                                </v-card>
                            </template>
                            <v-card style="text-align:center;">
                                <v-card-title class="headline grey lighten-2 justify-center" style="font-weight:bold; font-size:24px;">Scale Information</v-card-title>
                                <v-card-text v-for="(item, index) in scaleInfo" :key="index" style="font-size:17px;">
                                    {{item.scale}} {{ " - " }} {{item.description}}
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn dark color="rgb(72,61,139)" @click="dialog = false">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <!-- REPORTS -->
                        <v-card @click="getEvaluationReport()" style="width:19%; margin-right:1.5%; color:rgb(72,61,139); text-align:center; cursor:pointer; padding-top:7px;">
                            <v-icon size="45" color="rgb(72,61,139)">mdi-file-document</v-icon>
                            <h6>Reports</h6>
                        </v-card>
                        
                        <!-- GUIDELINES -->
                        <v-dialog v-model="dialog2" persistent max-width="330">
                            <template v-slot:activator="{ on }">
                                <v-card v-on="on" style="width:19%; margin-right:1.5%; color:rgb(72,61,139); text-align:center; cursor:pointer; padding-top:7px;">
                                    <v-icon size="45" color="rgb(72,61,139)">mdi-glass-stange</v-icon>
                                    <h6>Guidelines</h6>
                                </v-card>
                            </template>
                            <v-card style="text-align:center;">
                                <v-card-title class="headline grey lighten-2" style="font-weight:bold; font-size:24px;">Evaluation Guidelines</v-card-title>
                                <v-card-text style="font-size:17px; text-align:justify;">
                                    <p v-if="guidelines.length == 0" style="color:red;">This evaluation has no guidelines</p>
                                    <p v-else>{{guidelines}}</p>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn dark color="rgb(72,61,139)" @click="dialog2 = false">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        
                        <!-- QUESTIONS -->
                        <v-dialog v-model="dialog3" persistent max-width="900">
                            <template v-slot:activator="{ on, attrs }">
                                <v-card v-bind="attrs" v-on="on" @click="logCategories()" style="width:19%; color:rgb(72,61,139); text-align:center; cursor:pointer; padding-top:7px;">
                                    <v-icon size="45" color="rgb(72,61,139)">mdi-format-list-text</v-icon>
                                    <h6>Questions</h6 >
                                </v-card>
                            </template>

                            <div style="height:700px; border-top:5px solid rgb(72,61,139);">
                                <div style="height:8%; background-color:purple;">
                                    <v-card-title class="headline grey lighten-2" style="color:rgb(72,61,139); margin-bottom:15px; padding-bottom:15px;">
                                        <v-btn @click="dialog3 = false" color="red" dark style="margin-right:10px;">
                                            <v-icon>mdi-close-outline</v-icon>
                                        </v-btn>
                                        Category wise questions list
                                    </v-card-title>
                                </div> 
                                <div style="height:92%; overflow:auto;">
                                    <v-card class="grey lighten-2" style="padding-bottom:20px;">
                                        <div style="overflow:auto;" v-for="(item, index) in categories" :key="index">
                                            <v-card-text style="color:rgb(72,61,139); font-size:19px; font-weight:bold;">{{ item.categoryName }}</v-card-text>
                                            <div v-for="(itemy, index) in item.questions" :key="index" style="background-color:#fff; width:96%; margin-left:2%; margin-right:2%;">
                                                <div style="display:flex;">
                                                    <v-card-text style="">{{ itemy.questionName }}</v-card-text>
                                                </div>
                                                <v-divider style="margin:0px;"></v-divider>
                                            </div>
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                        </v-dialog>
                    </div>
                    <!-- END OF FOOTER -->
                </div>

                <div class="one">
                    <div class = "parent" style="height:45px; width:100%; margin-top:7px; background-color:#fff;">
                        <div class="left-buttons">                
                            <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">Evaluation</p>              
                        </div>
                            <div class="filler"></div>
                        <div class="right-buttons" style="display:inline;">            
                            <div class="dropdown-table" style="display:inline;">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="#000" 
                                            text
                                            v-on="on"
                                        >
                                            Descending
                                            <v-icon>mdi-swap-vertical-bold</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item style="display:block;">     
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                                v-on:click="doSort('itemName')" href="javascript:">Name
                                                <span v-if="sort.field=='itemName'">({{sort.desc?'desc':'asc'}})</span>
                                            </v-list-item-title>

                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                                v-on:click="doSort('itemSize')" href="javascript:">Size
                                                <span v-if="sort.field=='itemSize'">({{sort.desc?'desc':'asc'}})</span>
                                            </v-list-item-title>

                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                                v-on:click="doSort('itemLastUpdatedOn')" href="javascript:">Modified On
                                                <span v-if="sort.field=='itemLastUpdatedOn'">({{sort.desc?'desc':'asc'}})</span>
                                            </v-list-item-title>

                                            <v-list-item-title style="padding: 12px; font-size:16px; cursor:pointer" 
                                                v-on:click="doSort('itemUploadedBy')" href="javascript:">Submitted By
                                                <span v-if="sort.field=='itemUploadedBy'">({{sort.desc?'desc':'asc'}})</span>
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>       
                            </div> 
                        
                            <div style="display:inline; margin-right:10px;">
                                <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Created On</button>
                            </div>
                            <!-- <div style="display:inline; margin-right:10px;">
                                <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">All</button>
                            </div>
                            <div style="display:inline; margin-right:10px;">
                                <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Open</button>
                            </div>
                            <div style="display:inline; margin-right:10px;">
                                <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Ongoing</button>
                            </div>
                            <div style="display:inline; margin-right:10px;">
                                <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Completed</button>
                            </div> -->
                        </div> 
                    </div> 

                    <div class="blackish" style="width:100%; margin-right:1%;">                    
                        <table width="100%" style="overflow-y:auto; overflow-x:auto;">
                            <tr>
                                <td>
                                    <div style="width:100%;">
                                        <table style="width:100%;">
                                            <tr style="color:#fff; background-color:rgb(72,61,139);">
                                                <th style="padding:7px; width:50%; padding-left:15px;">Name</th>
                                                <th style="width:10%;">From</th> 
                                                <th style="width:10%;">To</th>
                                                <th style="width:10%;">Created On</th>
                                                <th style="width:10%;">% Done</th>
                                                <th style="width:10%;">Status</th>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="width:100%; height:700px; overflow:auto;">
                                        <table class="table-striped" style="width:100%;">
                                            <tbody>
                                                <tr v-for="(item, index) in sortedData2" :key="index" @click="two = !two; tab = 0; questionArr = [];
                                                        setEvaluationId(item.evaluationId); setSttId(item.stt_id); setEvalName(item.evaluationName); 
                                                        setGuidelines(item.evaluationGuidelines); setScales(item.scaleInformation); setCanComment(item.canComment);
                                                        setIsChairman(item.isChairman);" style="cursor:pointer;">
                                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:50%; padding-left:15px;">
                                                        {{ item.evaluationName }}
                                                    </td>
                                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                        {{ parseInt(item.dateStarted, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                    </td>
                                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                        {{ parseInt(item.dateEnding, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                    </td>
                                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                        {{ parseInt(item.dateCreated, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                    </td>
                                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:10%;">{{ item.donePercent}} {{" %"}}</td>
                                                    <td v-if="item.stt_id == 1" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                        <v-btn color="primary" style="width:100px;">Open</v-btn>
                                                    </td>
                                                    <td v-else-if="item.stt_id == 7" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                        <v-btn color="warning" style="width:100px;">Ongoing</v-btn>
                                                    </td>
                                                    <td v-else style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                        <v-btn color="error" style="width:100px;">Completed</v-btn>
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
            </div>  
                
            <div v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:98%; height:850px; padding:1%; margin-left:1%; margin-right:1%; z-index:2;">
                <button class="btn btn-lg" v-on:click="closePDF = !closePDF;" style="background-color:red; float:right; margin-right:10px;">
                    <v-icon>mdi-close-outline</v-icon>
                </button>              
                <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl">
                </pspdfkit> 
            </div>
        <!-- END OF COMPONENT -->

        <!-- FOOTER -->
        <!-- <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; padding-left:40%;">
            <v-icon color="#fff" style="margin-right:5px;">mdi-file-pdf-outline</v-icon>
            <p style="font-weight:bold; font-size:19px;">Matters Arising Report</p>
        </div> -->
        </v-app>
    </div>       
</template>

<script>
    var moment = require('moment');
    import axios from 'axios';
    import UserData from './repository/UserData';
    import Vue from 'vue';
    import PSPDFKit from "pspdfkit";

    // const LICENSE_KEY = "H8E3jzmVoQoKTpdmwIL-fp3l4tIXnqDrMQX2iyEpWQDWkgbJ1xho58ylym0MVf1AVcCkze3LIlMvZ7SjQwo9wrkaIq8CtOP2_jKSiXyms44dQq9CXTicGr1nPn8gZrAb4_C9pikBx8K6Vn90vswIM9cxHReanwhwx6np0W9bvQwgj0mgqWrgm_ay96va6pYgPNSz6f-V-XlCdiCm8V1m3xKLN-Iu7Fw5dSGFO7jaFVKMzxmPuqXAbmmsV6RHcuqv6mKVbC_zgT-9FmJsp-ppBiRKWTefb9Shk_7-a-PmUXf4ZbTC_9c5g-n0ExH-e6h8PbHrLiOSOkkxMHK288aRHT2EwTleY1RnULGKXmc2dmpgWkSarBsfVFV6_FAHO5FE57AfGDDlCgyYqaFz5hOcNOBR178CBBBhjGvxrYwmL-0R3KsOq_5Q5VHAcYB1k-z6";
    const LICENSE_KEY = "Ni5LCTkSzrHKL3GnUlgVXV-Nt0-8cc5vbAlHmT6bRZZsheHGsPidBAsVHH7EbGm6krygVYe1_nAyLUlRZ4OUN9xBGmFpOiLJbNNvfnzJFkg3HwNvhVr0pNcug-kq6qFZMefIjdFy6-51sEWAD6nFfaRAFr0ihgzQ_Qf7o43DSWakOaAFFk6THvYiEAiwlDeTR-ggbcRf3orhW58EWXjqc8d1Ez1iy3SJtFsy0ReQcWBlkV2r_0HzjWzc1mvO4fDFSmYJvZ7DiL9MAtoEXyy14hpwaGW4uliBV6-JeCdjz64pzuEqhYql2EgzbG0r2eLGHIeDyrYtkA20c_Zyd_zbf4Vtbd31PPuPymL-75ZIcXtoIhlUcKLxMTEUcL8KiXgx7zEHWU4ajjtH2uPXNHkBnxyUL4K9OH7WxmV5k2nxAjqHLOf9bPIf0q61OJyejnmO";
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
        this.getImportedData((annotations)=>{
            try{
                this.load(JSON.parse(annotations))
            }
            catch(error){
                this.load(JSON.parse(null))
            }
        }); 
    },

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
            })
            .then(function (instance) {
                // that._instance = instance;
                that.$parent.errorMsg = ''
                instance.addEventListener("annotations.didSave", async () => {
                instance.exportInstantJSON().then(function (instantJSON) {
                console.log(instantJSON)
                const form = new FormData();
                form.append("payload", JSON.stringify(instantJSON));
                form.append("document_id", UserData.getDocumentId());
                form.append("user_id", UserData.getUserId());
                form.append("company_code", UserData.getCompanyCode());

                axios.post("https://eserver1.stl-horizon.com/pspdfkit/saveAnnotation.php", form)
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
                    var data = response.data;
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
                })
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
    });

    export default{
        data: () => ({
            moment: moment,
            getRecentDocuments: [],
            itemSubArray: [],
            itemSubArray2: [],
            itemSubArray3: [],
            evaluationList: [],
            evaluatees: [],
            evaluationDetail: [],
            categories: [],
            questions: [],
            buttonLoop: [],
            scaleInformation: [],
            questionArr: [],
            scaleInfo: [],
            ansLength: '',
            quesLength: '',
            valSelect: '',
            questionX: '',
            stt_id: '',
            setsttId: '',
            evaluateeName: '',
            evalName: '',
            guidelines: '',
            canComment: '',
            isChairman: '',
            categoryId: 0,
            commentsTextarea: '',
            comm: '',
            commentMessage: '',
            evaluationId: '',
            success: '',
            navigationPath:[
                {
                    "itemName": "...",
                    "localUrl": "0"
                }
            ],
            parentItemId:"",
            items2: [
                { title: 'Name' },
                { title: 'Size' },
                { title: 'Modified On' },
                { title: 'Submitted By' },
            ],
         
            currentComponent: null,

            componentsArray: ['comp1', 'comp2'],

            dynamicComponent: {
                template: `<p>Wheee</p>`
            },

            sort: {
                field: '',
                desc: true        
            },

            items: [
                { id: 1, name: 'Person 1', leave: 123.45 },
                { id: 2, name: 'John Smith', leave: 13.45 },
                { id: 3, name: 'Bill Smith', leave: 23.45 },
                { id: 4, name: 'John Doe', leave: 133.53 }
            ],

            tabItems: [
                { tab: 'One', content: 'Tab 1 Content' },
                { tab: 'Two', content: 'Tab 2 Content' },
                { tab: 'Three', content: 'Tab 3 Content' },
                { tab: 'Four', content: 'Tab 4 Content' },
                { tab: 'Five', content: 'Tab 5 Content' },
                { tab: 'Six', content: 'Tab 6 Content' },
                { tab: 'Seven', content: 'Tab 7 Content' },
                { tab: 'Eight', content: 'Tab 8 Content' },
                { tab: 'Nine', content: 'Tab 9 Content' },
                { tab: 'Ten', content: 'Tab 10 Content' },
            ],

            // buttonLoop: [
            //     {val: "1"},
            //     {val: "2"},
            //     {val: "3"},
            //     {val: "4"},
            //     {val: "5"},
            // ],

            load:{
                userId: '45',
                companyCode: '010',
                accessToken: '97f914eb1ceb1867e3824f647f7e589b',
                model: 'getMeetingPackFolder',
                companyId: '2',
                itemId: '0'
            },

            userdata:{                
                rootUrl:"https://eserver1.stl-horizon.com/api_v13/frontend/web/index.php/user/create"
            },

            pdf:'example.pdf',
            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',

            two: false,
            closePDF: false,
            tab: 0,
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialogg: false,
            comments: false,
            commentsDialog: false,
            commentsDialog2: false,
            commentsDialog3: false,
        }),

        methods: {
            logCategories(){
                console.log(this.categories);
            },

            alerty(){
                console.log("itemy");
            },

            reloadPage(){
                window.location.reload();
            }, 

            clickMe(item, index, catg){
                // console.log(item);
                console.log(index);
                console.log(catg[catg.length - 1]);
            },

            cancel(){
                this.commentsTextarea = '';
                this.commentMessage = '';
            },

            // getEvaluationList () {
            //     axios.get("../assets/json-APIs/getEvaluationList.json")
            //         .then(response => {
            //             console.log(response.data);
            //             this.getEvaluationList = response.data;
            //             this.evaluationList = this.getEvaluationList.evaluationList;    
            //             this.evaluatees = this.evaluationList.map(evaluate => evaluate.evaluatees);
            //             this.scaleInformation = this.evaluationList.map(scale => scale.scaleInformation);
            //         });
            // },

            getEvaluationList () {
                const formData = new FormData;
                formData.append("userId", UserData.getUserId());
                // formData.append("userId", "45");
                formData.append("companyCode", UserData.getCompanyCode());
                // formData.append("companyCode", "viz");
                formData.append("accessToken", UserData.getAccessToken());
                // formData.append("accessToken", "97f914eb1ceb1867e3824f647f7e589b");
                formData.append("model", "getEvaluationList");
                formData.append("companyId", UserData.getCompanyId());
                // formData.append("companyId", "2");

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getEvaluationListArr = response.data;
                        this.evaluationList = this.getEvaluationListArr.evaluationList;    
                        this.evaluatees = this.evaluationList.map(evaluate => evaluate.evaluatees);
                        this.scaleInformation = this.evaluationList.map(scale => scale.scaleInformation);
                        this.stt_id = this.getEvaluationListArr.evaluationList;
                        console.log(this.stt_id);
                        console.log(this.scaleInformation);

                        /* 
                        for(var i=0; i<this.evaluatees.length; i++){
                             console.log(this.evaluatees[i]); 
                            }  
                        */

                        /* 
                        for(var i in this.evaluatees){
                        //     var Brooke = this.evaluatees[i];
                        //     for(var j in Brooke){
                        //         var userName = Brooke[j].userName;
                        //         console.log(userName);
                        //         var userId = Brooke[j].userId;
                        //         console.log(userId);
                        //         var userImageURL = Brooke[j].userImageURL;
                        //         console.log(userImageURL);
                        //     }
                            } 
                        */

                        /* 
                        Object.keys(this.evaluatees).forEach(i => {
                        //     Object.keys(this.evaluatees[i]).forEach(j => {
                        //         var {userName, userId, userImageURL} = this.evaluatees[i][j];
                        //         this.userName = userName;
                        //         console.log(this.userName, userId, userImageURL);
                        //         // alert(this.userName);
                        //     })
                        // })
                        // this.evalName = this.evaluatees.map(popcorn => popcorn.userName);
                        // console.log(this.evaluatees[0]);
                           console.log(this.evaluatees[16].map(movie => movie.userName));
                        */   

                    })
                    .catch(e => { 
                        console.log('Error', e);
                    })
            }, 

            setEvaluationId(item){
                this.evaluationId = UserData.setEvaluationId(item);
                // console.log(item);
            },

            setSttId(item){
                this.setsttId = item;
                console.log(this.setsttId);
            },

            setEvaluateeId(item){
                this.comm = UserData.setEvaluateeId(item);
                // console.log(item);
                // console.log(this.scaleInformation);
            },

            setEvalName(item){
                this.evalName = item;
            },
            
            setEvaluateeName(item){
                this.evaluateeName = item;
            },

            setGuidelines(item){
                this.guidelines = item;
            },

            setScales(item){
                this.scaleInfo = item;
            },

            setCanComment(item){
                this.canComment = item;
            },

            setIsChairman(item){
                this.isChairman = item;
            },

            setCategoryId(item){
                this.categoryId = item;
                // alert(this.categoryId);
            },

            getEvaluationDetail(){
                const formData = new FormData;
                formData.append("userId", UserData.getUserId());
                // formData.append("userId", "45");
                formData.append("companyCode", UserData.getCompanyCode());
                // formData.append("companyCode", "viz");
                formData.append("accessToken", UserData.getAccessToken());
                // formData.append("accessToken", "97f914eb1ceb1867e3824f647f7e589b");
                formData.append("model", "getEvaluationDetail");
                formData.append("companyId", UserData.getCompanyId());
                // formData.append("companyId", "2");
                formData.append("evaluationId", UserData.getEvaluationId());
                // formData.append("evaluationId", "408");
                formData.append("evaluateeId", UserData.getEvaluateeId());
                // formData.append("evaluateeId", "17");

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getEvaluationDetailArray = response.data;
                        this.evaluationDetail = this.getEvaluationDetailArray.evaluationDetail;
                        this.categories = this.getEvaluationDetailArray.evaluationDetail.categories
                            .map(category => {
                                return {
                                    ...category,
                                    "questions": [...category.questions.map(question => {
                                        return {
                                            ...question,
                                            "buttonLoop": [
                                                {val: "1"},
                                                {val: "2"},
                                                {val: "3"},
                                                {val: "4"},
                                                {val: "5"},
                                            ]
                                        }
                                    })]
                                }
                            });
                        console.log(this.getEvaluationDetailArray);

                        //    this.categories =this.getEvaluationDetailArray.evaluationDetail.categories.map((category)=>{
                        //        return {  
                        //            ...category,
                        //              "questions":[...category.questions.map(question=>{
                        //                  return {
                        //                      ...question,
                        //                      "answer":null
                        //                  }
                        //              })]
                        //            }
                        //     });
                        // console.log("original",this.categories);
                        //console.log("modified",modifiedCategory);
                

                        // for(var i in this.questions){
                        //     var name = this.questions[i];
                        //     for(var j in name){
                        //         var questionName = name[j].questionName;
                        //         console.log(questionName);
                        //     }
                        // }
                    })
            },

            // saveContinue(questionId, val){
            //     this.valSelect = val;
            //     this.questionX = questionId;
            //     console.log(val);
            // },

            saveContinue(itemy, val){   //itemy is the question array
                var choice = {"answer":val, "question":itemy}
                this.categories = this.categories.map((category)=>{
                    return {
                        ...category,
                            "questions":[...category.questions.map(question => {
                                return {
                                ...question,
                                "answer":val
                                }
                            })]
                        }
                    });

                var index = this.questionArr.findIndex((c)=>{
                    if(c.question==choice.question){
                        return true;
                    }  
                    return false;
                })

                if(index==-1){
                    this.questionArr.push(choice)
                }
                else{
                    this.questionArr[index]={...choice}
                }
                    
                var apiData = {    
                    "answer" : this.questionArr.map(ans => ans.answer).toString(), 
                    "refreshArr" : this.questionArr.map(ans => ans.answer).toString(),
                    "evaluateeId" : "17", 
                    "evaluationId" : "408", 
                    "question" : this.questionArr.map(ques => ques.question).toString(),
                }
                console.log(choice.answer);
                console.log(apiData);
            },

            checkUnanswered(item){
                var ans = this.questionArr.map(ans => ans.answer);
                this.ansLength = ans.length;
                this.quesLength = item.questions.length;
                console.log(this.ansLength);
                console.log(this.quesLength);
                ans.length = 0;
            },

            updateAllQuestions(){
                const formData = new FormData;
                formData.append("userId", "45");
                formData.append("companyCode", "010");
                formData.append("accessToken", "97f914eb1ceb1867e3824f647f7e589b");
                formData.append("model", "updateAllQuestions");
                formData.append("companyId", "2");
                formData.append("evaluations", 
                    JSON.stringify( [
                        { 
                            "answer" : this.questionArr.map(ans => ans.answer).toString(), 
                            "userId" : 17, 
                            "evaluationId" : 408, 
                            "question" : this.questionArr.map(ques => ques.question).toString()
                        }
                    ]))
                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.updateAllQuestionsArray = response.data;
                        console.log(this.updateAllQuestionsArray);
                    })
            },

            commentEvaluation(){
                const formData = new FormData;
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', 'commentEvaluation');
                formData.append('companyId', UserData.getCompanyId());
                formData.append('evaluationId', UserData.getEvaluationId());
                formData.append('comment', this.commentsTextarea);
                formData.append('isChairman', this.isChairman);
                formData.append('categoryId', this.categoryId);
                formData.append('evaluateeId', UserData.getEvaluateeId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.commentEvaluationArr = response.data;
                        this.commentMessage = this.commentEvaluationArr.message;
                        this.success = this.commentEvaluationArr.success;
                        console.log(this.commentEvaluationArr);
                        this.commentsTextarea = '';
                        // this.cancel();
                    })
                    .catch(e => {
                        console.log("Error", e);
                    });
            },

            getEvaluationReport(){
                const formData = new FormData;
                formData.append("userId", UserData.getUserId());
                formData.append("companyCode", UserData.getCompanyCode());
                formData.append("accessToken", UserData.getAccessToken());
                formData.append("model", "getEvaluationReport");
                formData.append("companyId", UserData.getCompanyId());
                formData.append("evaluationId", UserData.getEvaluationId());
                formData.append("evaluateeId", UserData.getEvaluateeId());
                
                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getEvaluationReportArr = response.data;
                        this.evaluationUrl = this.getEvaluationReportArr.evaluationUrl;
                        console.log(this.getEvaluationReportArr);
                        window.open(this.evaluationUrl);
                    })
                    .catch(e => {
                        console.log("Error", e);
                    })
            },

            joinNames(){
                return [...this.navigationPath.map((value)=>{
                    return value.itemName
                })].join("/")
            },
            
            sortBySize(){
                this.itemSubArray2.itemSize.sort(function (a,b) {
                    return a - b;                                                                     
                });
            },

            doSort (field) {
                if(field == this.sort.field){
                    this.sort.desc = !this.sort.desc
                }else{
                    this.sort.field = field;
                    this.sort.desc = true;
                }
            },     
            
            openPDF: function openPDF(e) {
                this.pdf = window.URL.createObjectURL(e.target.files[0])
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            }    
        },

        computed: {
            sortedData2 () {
                if(!this.sort.field){
                    return this.evaluationList
                }

                return this.evaluationList.concat().sort((a,b)=>{
                    if(this.sort.desc){
                        return a[this.sort.field] > b[this.sort.field] ? -1:1        
                    }
                    else{
                        return a[this.sort.field] > b[this.sort.field] ? 1:-1                  
                    }
                })
            },

            evalArray:function(){
                var evalArray = [];
                Object.keys(this.evaluatees).forEach(i => {
                    Object.keys(this.evaluatees[i]).forEach(j => {
                        // var {userName, userId, userImageURL} = this.evaluatees[i][j];
                        evalArray.push(this.evaluatees[i][j]);
                        // console.log(userName, userId, userImageURL);
                    })
                })
                return evalArray;
            }
        },
      
        beforeMount(){
            this.getEvaluationList();
        },

        mounted() {
            const getRecentDocuments = JSON.parse(this.$localStorage.get('getRecentDocuments'));
            
            if (getRecentDocuments) {  
                this.getRecentDocuments = getRecentDocuments;
            }
        },

        components: {
            pspdfkit: pspdfkit            
        },
    }

</script>

<style scoped>
    body { 
        margin:0;
        padding:0; 
    }

    .nav-menu{
        margin-top:0px; 
        background-color: rgb(72,61,139);
        color:#fff;
        display:flex;
    }

    .nav-menu .btn{
        background-color:rgb(72,61,139);
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
        border-top: 5px solid rgb(72,61,139);
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
        color:rgb(72,61,139);
    }

    table.scroll {
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
        color:rgb(72,61,139);
    }

    .parent {
        display: flex;
        width:100%;
    }

    .filler {
        flex-grow: 1;
    }

    .left-buttons{
        display: inline;
    }
    
    .right-buttons{
        display: inline;
    }

    .user_row{
        display:flex;
    }

    .user_row>div{
        flex:1;
        text-align: center;
    }

    .targety{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); 
        border-radius:60%; 
        background-color:#f5f5f5; 
        padding:10px; 
        padding-left:15px; 
        padding-right:15px; 
        margin:7px; 
        color:rgb(72,61,139);
    }

    .targety:focus{
        background-color:red;
        color:aqua;
    }
    .targety_highlighted{
       box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); 
        border-radius:60%; 
        background-color:#f5f5f5; 
        padding:10px; 
        padding-left:15px; 
        padding-right:15px; 
        margin:7px; 
        color:rgb(72,61,139); 
        background-color:red;
        color:aqua; 
    }
   </style>
