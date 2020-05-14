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
                <div class="two" v-if="two" style="margin-top:7px; position:absolute; background-color:#f5f5f5; width:98%; height:840px; margin-right:1%; z-index:3;">
                    <div style="display:flex; margin-left:1%; margin-bottom:10px;">
                        <v-icon @click="two = !two" style="color:#fff; background-color:rgb(72,61,139);">mdi-chevron-left</v-icon>
                        <h4 style="margin-left:10px; color:rgb(72,61,139);">{{ evalName }}</h4>
                    </div>
                    <div>
                        <div class="left1" style="float:left; width:11%; height:780px; overflow:auto; margin-left:1%; margin-right:1%; text-align:center">
                            <!-- Use Computed Property -->
                            <!-- <v-card v-for="(item, index) in evalArray" :key="index" style="width:100%; height:auto; padding:5px; background-color:#fff; margin-bottom:7px;">
                                <img src="./male-icon.png" style="height:90px; width:80px; margin-top:7px; border:1px solid #000; border-radius:50%;">
                                <p>{{item.userName}}</p>
                            </v-card> -->
                            <div v-for="(items, index) in evaluatees" :key="index">
                            <v-card v-for="(item, index) in items" :key="index" @click="setEvaluateeId(item.userId); getEvaluationDetail()" style="width:100%; height:auto; padding:5px; background-color:#fff; margin-bottom:7px; cursor:pointer;">
                                <img v-if="item.userImageURL" :src="item.userImageURL" style="height:90px; width:80px; margin-top:7px; border:1px solid #000; border-radius:50%;">
                                <!-- <img :src="item.userImageURL" style="height:90px; width:80px; margin-top:7px; border:1px solid #000; border-radius:50%;"> -->
                                <img v-else src="./male-icon.png" style="height:90px; width:80px; margin-top:7px; border:1px solid #000; border-radius:50%;">
                                <p>{{item.userName}}</p>
                            </v-card>
                            </div>
                        </div>
                        <div class="right1" style="float:left; width:86%; height:780px; overflow:auto; background-color:#f5f5f5; margin-right:1%;">
                            <v-card>
                                <v-tabs grow show-arrows v-model="tab" background-color="rgb(220,220,220)" color="rgb(72,61,139)" style="font-weight:bolder;">
                                <v-tabs-slider></v-tabs-slider>
                                    <!-- <v-tab v-for="i in 20" :key="i" :href="'#tab-' + i">GIGI {{i}}</v-tab> -->
                                    <!-- <v-tab v-for="item in tabItems" :key="item.tab"> -->
                                    <v-tab v-for="(item, index) in categories" :key="index">
                                        {{ item.categoryName }}
                                    </v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="tab">
                                    <!-- <v-tab-item v-for="i in 3" :key="i" :value="'tab' + i"> -->
                                    <!-- <v-tab-item v-for="item in tabItems" :key="item.tab"> -->
                                    <v-tab-item v-for="(item, index) in categories" :key="index">
                                        <v-card flat v-for="(itemy, index) in item.questions" :key="index" style="display:flex; border-bottom:1px solid rgb(220,220,220)">
                                            <v-card-text style="font-size:19px;">
                                                {{ index + 1 + "." }} {{ itemy.questionName }}
                                            </v-card-text>
                                            <v-btn class="a" fab small style="margin:7px; color:rgb(72,61,139);">1</v-btn>
                                            <v-btn class="b" fab small style="margin:7px; color:rgb(72,61,139);">2</v-btn>
                                            <v-btn class="c" fab small style="margin:7px; color:rgb(72,61,139);">3</v-btn>
                                            <v-btn class="d" fab small style="margin:7px; color:rgb(72,61,139);">4</v-btn>
                                            <v-btn class="e" fab small style="margin:7px; color:rgb(72,61,139);">5</v-btn>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                            <v-btn color="rgb(220,220,220)" style="width:100%; display:flex; padding-top:10px;">
                                <!-- <span style="flex-grow:1"></span> -->
                                <p style="color:rgb(72,61,139);">Save and Continue</p>
                                <!-- <span style="flex-grow:1"></span> -->
                            </v-btn>
                        </div>
                    </div>
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
                            <div style="display:inline; margin-right:10px;">
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
                            </div>
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
                                                <tr v-for="(item, index) in sortedData2" :key="index" @click="two = !two; setEvaluationId(item.evaluationId); setEvalName(item.evaluationName);" style="cursor:pointer;">
                                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:50%; padding-left:15px;">
                                                        <!-- <a href="#"  v-on:click="getMeetingPack(item)"> -->
                                                            {{ item.evaluationName }}
                                                        <!-- </a> -->
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
                                                    <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                        <v-btn color="primary">Open</v-btn>
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
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; padding-left:40%;">
            <v-icon color="#fff" style="margin-right:5px;">mdi-file-pdf-outline</v-icon>
            <p style="font-weight:bold; font-size:19px;">Matters Arising Report</p>
        </div>
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
            scaleInformation: [],

            evalName: "",

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
            tab: null,
        }),

        methods: {
            reloadPage(){
                window.location.reload();
            },        

            getEvaluationList () {
                const formData = new FormData;
                formData.append("userId", UserData.getUserId());
                formData.append("companyCode", UserData.getCompanyCode());
                formData.append("accessToken", UserData.getAccessToken());
                formData.append("model", "getEvaluationList");
                formData.append("companyId", UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getEvaluationList = response.data;
                        this.evaluationList = this.getEvaluationList.evaluationList;    
                        this.evaluatees = this.evaluationList.map(evaluate => evaluate.evaluatees);
                        this.scaleInformation = this.evaluationList.map(scale => scale.scaleInformation);
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
                UserData.setEvaluationId(item);
                console.log(item);
            },

            setEvaluateeId(item){
                UserData.setEvaluateeId(item);
                console.log(item);
                console.log(this.scaleInformation);
            },

            setEvalName(item){
                this.evalName = item;
            },

            getEvaluationDetail(){
                const formData = new FormData;
                // formData.append("userId", UserData.getUserId());
                formData.append("userId", "45");
                // formData.append("companyCode", UserData.getCompanyCode());
                formData.append("companyCode", "010");
                // formData.append("accessToken", UserData.getAccessToken());
                formData.append("accessToken", "97f914eb1ceb1867e3824f647f7e589b");
                formData.append("model", "getEvaluationDetail");
                // formData.append("companyId", UserData.getCompanyId());
                formData.append("companyId", "2");
                // formData.append("evaluationId", UserData.getEvaluationId());
                formData.append("evaluationId", "408");
                // formData.append("evaluateeId", UserData.getEvaluateeId());
                formData.append("evaluateeId", "17");

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getEvaluationDetailArray = response.data;
                        this.evaluationDetail = this.getEvaluationDetailArray.evaluationDetail;
                        this.categories = this.getEvaluationDetailArray.evaluationDetail.categories;
                        this.questions = this.categories.map(mapCat => mapCat.questions);
                        // console.log(this.questions);

                        // for(var i in this.questions){
                        //     var name = this.questions[i];
                        //     for(var j in name){
                        //         var questionName = name[j].questionName;
                        //         console.log(questionName);
                        //     }
                        // }
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
   </style>
