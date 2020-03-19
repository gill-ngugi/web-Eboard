<template>
    <div>
        <v-app>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">
            <router-link to="/dashboard" style="text-decoration:none;"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
            <p style="font-weight:bold; font-size:24px; margin-left:40%;">Compliance</p>
        </div>

        <!-- COMPONENT -->
        <div class="component">
            <div class="left" style="color:#000000;">
                <div class="left-bottom">
                    <v-list style="background-color:#f8f9f9;">
                        <v-list-item v-for="(item, index) in complianceList" v-bind:key="index">
                            <v-list-item-title @click="getComplianceArray(item)">
                                <a href="#">{{ item.bodyCode }}</a>
                                <v-divider></v-divider>
                            </v-list-item-title>  
                        </v-list-item>
                    </v-list>
                </div>
            </div>

            <div class="right">
                <!-- Header 1 -->
                <div class = "parent" style="height:45px; width:100%; background-color:#fff;">
                    <div class="left-buttons">                
                        <v-icon style="float:left; margin-top:5px; margin-left:10px; background-color:rgb(162,29,33); color:#fff" size="30">mdi-bell-outline</v-icon>
                        <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">{{this.bodyCode }}</p>              
                    </div>
                        <div class="filler"></div>
                    <div class="right-buttons" style="display:inline;"> 
                        <v-icon style="float:left; margin-top:5px; margin-left:10px; background-color:rgb(162,29,33); color:#fff" size="30">mdi-file-document</v-icon>
                    </div> 
                </div> 

            <!-- Table -->
                <table style="width:100%;">
                    <tr>
                        <td>
                            <table style="width:100%;">
                                <tr style="background-color:rgb(162,29,33); color:#fff;">
                                    <th style="padding:7px; width:15%;">Sr.No</th>
                                    <th style="width:15%;">Code</th>
                                    <th style="width:60%;">Description</th>
                                    <th style="width:10%;">Frequency</th>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="table-striped" style="width:100%;">  
                                <tbody>
                                    <tr style="width:100%;" v-for="(item, index) in sortedData2" :key="index">
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:15%;">{{item.serialNumber}}</td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:15%;">{{item.complianceCode}}</td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:60%;">
                                            <a href="#">
                                                {{item.codeDescription}}
                                            </a>
                                        </td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:10%;">
                                            <v-btn class="white--text" color="rgb(162,29,33)">{{item.frequencyName}}</v-btn>
                                        </td>
                                    </tr>
                                </tbody>                              
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

            <div v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:100%; height:100%; padding:1%; overflow:hidden; margin-right:0; ">
                <button class="btn btn-lg" v-on:click="closePDF = !closePDF;" style="background-color:red; float:right; margin-right:10px;">
                    <v-icon>mdi-close-outline</v-icon>
                </button>               
                <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl">
                </pspdfkit>
            </div>
        </div>
        <!-- END OF COMPONENT -->
        </v-app>
    </div>
</template>

<script>
    var moment = require('moment');
    import axios from 'axios';
    import UserData from '../components/repository/UserData'
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
            test: true,
            complianceList: [],
            complianceArray: [],
            bodyCode: "",

            sort: {
                field: '',
                desc: true        
            },

            userdata:{                
                rootUrl:"https://eserver1.stl-horizon.com/api_v13/frontend/web/index.php/user/create"
            },

            closePDF: false,
            pdf:'',
            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',   
        }),

        methods: {
            reloadPage(){
                window.location.reload();
            },    

            getComplianceList(){
                const formData = new FormData;
                formData.append("userId", UserData.getUserId());
                formData.append("companyCode", UserData.getCompanyCode());
                formData.append("accessToken", UserData.getAccessToken());
                formData.append("model", "getComplianceList");
                formData.append("companyId", UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getComplianceList = response.data;
                        this.complianceList = this.getComplianceList.complianceList;
                        console.log(this.complianceList);
                    })
            },

            getComplianceArray(item){
                this.complianceArray = item.complianceRules;
                this.bodyCode = item.bodyCode;
                // alert(item.bodyId);
                console.log(this.complianceArray);
            },
            
            doSort (field) {
                if(field == this.sort.field){
                    this.sort.desc = !this.sort.desc
                }else{
                    this.sort.field = field;
                    this.sort.desc = true;
                }
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            }    
           
        },

        computed: {
            sortedData2 () {
                if(!this.sort.field){
                    return this.complianceArray
                }
                return this.complianceArray.concat().sort((a,b)=>{
                    if(this.sort.desc){
                        return a[this.sort.field] > b[this.sort.field] ? -1:1        
                    }
                    else{
                        return a[this.sort.field] > b[this.sort.field] ? 1:-1                  
                    }
                })
            }
        },
      
        beforeMount(){
            this.getComplianceList();
        },

        components: {
            pspdfkit: pspdfkit
        },
    }

</script>

<style scoped>
    .nav-menu{
        margin-top: 0px; 
        background-color: rgb(162,29,33);
        color:#fff;
        display: flex;
        margin-bottom: 1%;
    }

    .component{
        width: 99%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        height: 900px;
    }

    .left{
        width: 10%;
        margin-right: 1%;
        float: left;
        height: 100%;
    }

    .left-top{
        width: 100%;
        height: 49%;
        margin-bottom: 4%;
        background-color:#f8f9f9;
        border-top: 5px solid rgb(162,29,33);
    }

    .left-bottom{
        width: 100%;
        height: 100%;
        background-color:#f8f9f9;
        border-top: 5px solid rgb(162,29,33);
    }

    .left a{
        color: #000;
        text-decoration: none;
    }

    .left a:hover{
        color: rgb(162,29,33);
    }

    .right{
        width: 89%;
        float: left;
        background-color:#f8f9f9;
        height: 100%;
        border-top: 5px solid rgb(162,29,33);
    }

    .parent {
        display: flex;
        width: 100%;
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

    button:focus {
        outline: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
    }

    .table-striped a{
        text-decoration: none;
        color: #000;
    }

    .table-striped a:hover{
        color: rgb(162,29,33);
    }

</style>
