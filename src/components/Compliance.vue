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
            <div class="compliance-one" v-if="complianceOne">
                <!-- Header 1 -->
                <div class = "parent" style="height:45px; width:99%; background-color:#fff; border-top:5px solid rgb(162,29,33); margin-bottom:7px;">
                    <div class="left-buttons">                
                        <v-icon style="float:left; margin-top:5px; margin-left:10px; background-color:rgb(162,29,33); color:#fff" size="30">mdi-bell-outline</v-icon>
                        <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">{{this.bodyCode }}</p>              
                    </div>
                    <div class="filler"></div>
                    <div class="right-buttons" style="display:inline;"> 
                        <div class="text-center">
                            <v-dialog v-model="dialog" width="830">
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on" @click="getComplianceReportData1" style="float:left; margin-top:5px; margin-left:10px; background-color:rgb(162,29,33); color:#fff" size="30">mdi-file-document</v-icon>
                                </template>
                                <v-card style="">
                                    <div class="header" style="display:flex; padding-left:10px;">
                                        <v-icon size="30" color="rgb(162,29,33)">mdi-file-document</v-icon>
                                        <p style="color:rgb(162,29,33); margin-left:10px; margin-top:10px; font-weight:24px; font-weight:bold;">Compliance Report</p>
                                        <!-- <p style="color:rgb(162,29,33); margin-left:10px; margin-top:10px; font-weight:24px; font-weight:bold;">{{getty()}}</p> -->
                                        <v-spacer></v-spacer>
                                        <v-icon @click="dialog=false" color="rgb(162,29,33)" style="margin-right:10px;">mdi-close-outline</v-icon>
                                    </div>

                                    <div class="graph" 
                                        style="height:400px; width:800px; background-color:rgb(235,235,235); margin-left:10px; margin-right:10px; margin-bottom:15px;">
                                        <!-- <graph-bar
                                            :width="800"
                                            :height="400"
                                            :axis-min="0"
                                            :axis-max="100"
                                            :labels="[ 'The 100', 'The Blacklist', 'Vampire Diaries', 'Pretty Little Liars' ]"
                                            :colors="[ '#9EDE00', '#ECE100', '#EC9800', '#EC2500' ]"
                                            :values="values">
                                            <note :text="'Bar Chart'"></note>
                                            <tooltip :names="names" :position="'left'"></tooltip>
                                            <legends :names="names" :filter="true"></legends>
                                        </graph-bar> -->

                                        <graph-bar   
                                            :width="800"
                                            :height="400"
                                            :axis-min="0"
                                            :axis-max="100"
                                            :labels="this.bodyName"
                                            :values="[this.compliancePercentage, this.nonCompliancePercentage]"
                                            :colors="[ '#9EDE00', '#ECE100', '#EC9800', '#EC2500' ]"
                                        >
                                            <note :text="'Bar Graph'"></note>
                                            <tooltip :names="['Compliance', 'Non-Compliance']" :position="'left'"></tooltip>
                                            <legends :names="['Compliance', 'Non-Compliance']" :filter="true"></legends>
                                        </graph-bar>
                                    </div>

                                    <div class="graph-title" style="height:400px; width:800px; margin-left:10px; margin-right:10px;">
                                        <table>
                                            <tr>
                                                <td>
                                                    <table style="width:800px;">
                                                        <tr style="background-color:rgb(162,29,33); color:#fff">
                                                            <th style="padding:7px; width:20%;">Authority</th>
                                                            <th style="width:20%">Compliance</th>
                                                            <th style="width:20%">Compliance%</th>
                                                            <th style="width:20%">Non_Compliance</th>
                                                            <th style="width:20%">Non_Compliance%</th>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr> 
                                            <tr>
                                                <td>
                                                    <table class="table-striped" style="width:800px; overflow:auto;">
                                                        <tbody>
                                                            <tr v-for="(item, index) in complianceReportData" v-bind:key="index">
                                                                <td style="padding:7px; width:20%">{{ item.bodyName }}</td>
                                                                <td style="width:20%">{{ item.compliance }}</td>
                                                                <td style="width:20%">{{ Math.round((item.compliance / (parseInt(item.compliance) + parseInt(item.nonCompliance))) *100)}} {{"%"}}</td>
                                                                <td style="width:20%">{{ item.nonCompliance }}</td>
                                                                <td style="width:20%">{{ Math.round((item.nonCompliance / (parseInt(item.compliance) + parseInt(item.nonCompliance))) *100)}} {{"%"}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </v-card>
                            </v-dialog>
                        </div>
                    </div> 
                </div> 

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
                                        <tr style="width:100%;">
                                            <v-expansion-panels>
                                                <v-expansion-panel  v-for="(item, index) in sortedData2" :key="index" style="margin-bottom:10px;">
                                                    <v-expansion-panel-header expand-icon="">
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:15%;">{{item.serialNumber}}</td>
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:15%;">{{item.complianceCode}}</td>
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:60%;">
                                                            <!-- <a href="#"> -->
                                                                {{item.codeDescription}}
                                                            <!-- </a> -->
                                                        </td>
                                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:10%;">
                                                            <v-btn class="white--text" color="rgb(162,29,33)" @click="complianceTwo = !complianceTwo; sendCdsId(item); getComplianceDetails();">{{item.frequencyName}}</v-btn>
                                                        </td>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        {{item.detailedDescription}}
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </tr>
                                    </tbody>                              
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>  

            <div class="compliance-two" v-if="complianceTwo">
                <!-- Header 1 -->
                <div class = "parent" style="height:45px; width:99%; background-color:#fff; border-top:5px solid rgb(162,29,33); margin-bottom:7px;">
                    <div class="left-buttons">                
                        <v-icon  @click="complianceTwo = !complianceTwo" style="float:left; margin-top:5px; margin-left:10px; background-color:rgb(162,29,33); color:#fff" size="30">mdi-chevron-left</v-icon>
                        <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">{{this.bodyCode }}</p>              
                    </div>
                        <div class="filler"></div>
                        <div class="right-buttons" style="display:inline;"> 
                            <div class="text-center">
                            <v-dialog v-model="dialog" width="820" >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        v-on="on" 
                                        @click="getComplianceReportData1"
                                        style="float:left; margin-top:5px; margin-left:10px; background-color:rgb(162,29,33); color:#fff" 
                                        size="30">
                                        mdi-file-document
                                    </v-icon>
                                </template>
                                <v-card>
                                    <div class="header" style="display:flex; padding-left:10px;">
                                        <v-icon size="30" color="rgb(162,29,33)">mdi-file-document</v-icon>
                                        <p style="color:rgb(162,29,33); margin-left:10px; margin-top:10px; font-weight:24px; font-weight:bold;">Compliance Report</p>
                                        <v-spacer></v-spacer>
                                        <v-icon @click="dialog=false" color="rgb(162,29,33)" style="margin-right:10px;">mdi-close-outline</v-icon>
                                    </div>

                                    <div class="graph" style="height:400px; width:800px; background-color:rgb(235,235,235); margin-left:10px; margin-right:10px; margin-bottom:15px;">
                                        <graph-bar   
                                            :width="800"
                                            :height="400"
                                            :axis-min="0"
                                            :axis-max="100"
                                            :labels="this.bodyName"
                                            :values="[this.compliancePercentage, this.nonCompliancePercentage]"
                                            :colors="[ '#9EDE00', '#ECE100', '#EC9800', '#EC2500' ]"
                                        >
                                            <note :text="'Bar Graph'"></note>
                                            <tooltip :names="['Compliance', 'Non-Compliance']" :position="'left'"></tooltip>
                                            <legends :names="['Compliance', 'Non-Compliance']" :filter="true"></legends>
                                        </graph-bar>
                                    </div>
 
                                    <div class="graph-title" style="height:400px; width:800px; margin-left:10px; margin-right:10px;">
                                        <table>
                                            <tr>
                                                <td>
                                                    <table style="width:800px;">
                                                        <tr style="background-color:rgb(162,29,33); color:#fff">
                                                            <th style="padding:7px; width:20%;">Authority</th>
                                                            <th style="width:20%">Compliance</th>
                                                            <th style="width:20%">Compliance%</th>
                                                            <th style="width:20%">Non_Compliance</th>
                                                            <th style="width:20%">Non_Compliance%</th>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table class="table-striped" style="width:800px; overflow:auto;">
                                                        <tbody>
                                                            <tr v-for="(item, index) in complianceReportData" v-bind:key="index">
                                                                <td style="padding:7px; width:20%">{{ item.bodyName }}</td>
                                                                <td style="width:20%">{{ item.compliance }}</td>
                                                                <td style="width:20%">{{ Math.round((item.compliance / (parseInt(item.compliance) + parseInt(item.nonCompliance))) * 100) }} {{" %"}}</td>
                                                                <td style="width:20%">{{ item.nonCompliance }}</td>
                                                                <td style="width:20%">{{ Math.round((item.nonCompliance / (parseInt(item.compliance) + parseInt(item.nonCompliance))) * 100) }} {{" %"}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </v-card>
                            </v-dialog>
                        </div>
                    </div>  
                </div> 

                <div class="mixedish">
                <h5 style="color:rgb(162,29,33);">Employment Income Tax</h5>
                    <!-- Table -->
                    <table style="width:100%;">
                        <tr>
                            <td>
                                <table style="width:100%;">
                                    <tr style="background-color:rgb(162,29,33); color:#fff;">
                                        <th style="padding:7px; width:40%;">Due Date</th>
                                        <th style="width:40%;">Complied On</th>
                                        <th style="width:20%;">Status</th>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="subMixedish" style="height:740px; overflow:auto;">
                                    <table class="table-striped" style="width:100%;">  
                                        <tbody>
                                            <tr style="width:100%;">
                                                <v-expansion-panels>
                                                    <v-expansion-panel v-for="(item, index) in sortedData3" :key="index" style="margin-bottom:10px;">
                                                        <v-expansion-panel-header expand-icon="">
                                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:40%">
                                                                {{ parseInt(item.dueDate*1000, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                            </td>
                                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:40%">
                                                                {{ parseInt(item.dateComplied*1000, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                            </td>
                                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:20%;">
                                                                <v-btn class="white--text" color="green">{{item.complianceStatus}}</v-btn>
                                                            </td>
                                                        </v-expansion-panel-header>
                                                        <v-expansion-panel-content v-for="(subItem, index) in item.documents" v-bind:key="index">
                                                            <v-icon color="#27ae60">mdi-file-pdf-outline</v-icon>
                                                            <a href="#" @click="clickPdf(subItem); closePDF=!closePDF;">{{subItem.itemName}} </a>
                                                        </v-expansion-panel-content>
                                                    </v-expansion-panel>
                                                </v-expansion-panels>
                                            </tr>
                                        </tbody>                              
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>    

            <div class="pdfClass" v-if="closePDF">
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
    import VueGraph from 'vue-graph'
    
    Vue.use(VueGraph)

    // const LICENSE_KEY = "vuF0E1oK-8zmH0-rz6t6lt5x3AowOhR0kRILumR6xH5T9Ctre9Fo8gkBb404wT0dORhQliyk5XuSMMayurmNTJi4GRIuHL92DKOflXw04fv1UWthdwqHGQ0wM-E_0xTt4sk1jk9pWSkN5im3J_XmU8frGN2NYiSu-LP2BF_SFitDv9E-TSJWExDAZJVh4x3djWVg0bKVI-Pv2uS7fTh8ynEe4_7ivc-SoqEldi7evAfvas4X1EPse0VhJYWtgzhIjNs4RoXAazz4j4xPRgAQEYSL4JG6ZnT2fwCNq8uTqsnxi77aP0NvM69CmaOm_h-4yL3xCpVWV0k6HEiwO-fgn0fFQeHHRemKeXlGWnjrCBob4s1bDgjh0VWkTHRmZIbEA3jt6Ehh1VZQrlVusPOJggRF63X3sTowcQM5dPae-bHLMhdOB6pov8PKEOaWoR1pRw64NheynDAaA5elyCbP_xnG5cCuzDekt6U5K9KZ-wdc3kQFgS4kgbA1Ox1n3k2zbag_mqPkNOhzQ9AzDehO8H6W8L49hvQCQtmGAcm6nuA=";
    // const LICENSE_KEY = "H8E3jzmVoQoKTpdmwIL-fp3l4tIXnqDrMQX2iyEpWQDWkgbJ1xho58ylym0MVf1AVcCkze3LIlMvZ7SjQwo9wrkaIq8CtOP2_jKSiXyms44dQq9CXTicGr1nPn8gZrAb4_C9pikBx8K6Vn90vswIM9cxHReanwhwx6np0W9bvQwgj0mgqWrgm_ay96va6pYgPNSz6f-V-XlCdiCm8V1m3xKLN-Iu7Fw5dSGFO7jaFVKMzxmPuqXAbmmsV6RHcuqv6mKVbC_zgT-9FmJsp-ppBiRKWTefb9Shk_7-a-PmUXf4ZbTC_9c5g-n0ExH-e6h8PbHrLiOSOkkxMHK288aRHT2EwTleY1RnULGKXmc2dmpgWkSarBsfVFV6_FAHO5FE57AfGDDlCgyYqaFz5hOcNOBR178CBBBhjGvxrYwmL-0R3KsOq_5Q5VHAcYB1k-z6";
    const LICENSE_KEY = "Ni5LCTkSzrHKL3GnUlgVXV-Nt0-8cc5vbAlHmT6bRZZsheHGsPidBAsVHH7EbGm6krygVYe1_nAyLUlRZ4OUN9xBGmFpOiLJbNNvfnzJFkg3HwNvhVr0pNcug-kq6qFZMefIjdFy6-51sEWAD6nFfaRAFr0ihgzQ_Qf7o43DSWakOaAFFk6THvYiEAiwlDeTR-ggbcRf3orhW58EWXjqc8d1Ez1iy3SJtFsy0ReQcWBlkV2r_0HzjWzc1mvO4fDFSmYJvZ7DiL9MAtoEXyy14hpwaGW4uliBV6-JeCdjz64pzuEqhYql2EgzbG0r2eLGHIeDyrYtkA20c_Zyd_zbf4Vtbd31PPuPymL-75ZIcXtoIhlUcKLxMTEUcL8KiXgx7zEHWU4ajjtH2uPXNHkBnxyUL4K9OH7WxmV5k2nxAjqHLOf9bPIf0q61OJyejnmO";
 
    const pspdfkit = Vue.component('pspdfkit', {
    template: 
        `
        <div class="container" style="height:100%; width:97%;">
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
            complianceList: [],
            complianceArray: [],
            complianceDetailsList: [],
            documents: [],
            complianceReportData: [],
            bodyName: [],
            compliancePercentage: [],
            nonCompliancePercentage: [],
            compliance: [],
            nonCompliance: [],
            bodyCode: '',
            pdf: '',
            complianceOne: true,
            complianceTwo: false,
            closePDF: false,
            dialog: false,

            sort: {
                field: '',
                desc: true        
            },

            userdata:{                
                rootUrl:"https://eserver1.stl-horizon.com/api_v13/frontend/web/index.php/user/create"
            },

            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',

            names: [ 'Compliance', 'Non-Compliance' ],
            values: [
                [ 40, 35, 65, 15 ], //item.compliance
                [ 70, 95, 42, 10 ], //item.nonCompliance
            ]
        }),

        methods: {
            // getty(){ 
            //     this.compliance = UserData.getComplianceReportData();
            // },

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
                        // console.log(this.complianceList);
                    })
            },

            getComplianceArray(item){
                this.complianceArray = item.complianceRules;
                this.bodyCode = item.bodyCode;
                let bodyId = item.bodyId;
                UserData.setBodyId(bodyId);
                // alert(item.bodyId);
                // console.log(this.complianceArray);
            },

            sendCdsId(item){
                let cdsId = item.cdsId;
                UserData.setCdsId(cdsId);
                // alert(cdsId);
                let cdsBsId = item.cdsBsid;
                UserData.setCdsBsId(cdsBsId);
                // alert(cdsBsId);
            },

            getComplianceDetails(){
                let formData = new FormData;
                formData.append("userId", UserData.getUserId());
                formData.append("companyCode", UserData.getCompanyCode());
                formData.append("accessToken", UserData.getAccessToken());
                formData.append("model", "getComplianceDetails");
                formData.append("companyId", UserData.getCompanyId());
                formData.append("cdsId", UserData.getCdsId());
                formData.append("cdsBsid", UserData.getCdsBsId());
                formData.append("bodyId", UserData.getBodyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getComplianceDetails = response.data;
                        this.complianceDetailsList = this.getComplianceDetails.complianceList;
                        // console.log(this.complianceDetailsList);
                    })
                    .catch(e => {
                        console.log("Error", e);
                    })
            },   

            getComplianceReportData1(){
                const formData = new FormData;
                formData.append("userId", UserData.getUserId());
                formData.append("companyCode", UserData.getCompanyCode());
                formData.append("accessToken", UserData.getAccessToken());
                formData.append("model", "getComplianceReportData");
                formData.append("companyId", UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getComplianceReportData = response.data;
                        this.complianceReportData = this.getComplianceReportData.ComplianceReportData;
                        // console.log(this.complianceReportData);
                        // this.compliance = this.complianceReportData.map(pizza => pizza.compliance);
                        this.bodyName = this.complianceReportData.map(movie => movie.bodyName);
                        this.compliancePercentage = this.complianceReportData.map(cakes => (Math.round((cakes.compliance/(parseInt(cakes.nonCompliance) + parseInt(cakes.compliance))) *100)));
                        this.nonCompliancePercentage = this.complianceReportData.map(cakes => (Math.round((cakes.nonCompliance/(parseInt(cakes.nonCompliance) + parseInt(cakes.compliance))) *100)));
                        console.log(this.bodyName);
                        console.log(this.compliancePercentage);
                        console.log(this.nonCompliancePercentage);
                        // console.log(parseInt(this.nonCompliance) + parseInt(this.compliance));
                        // this.compliancePercentage = Math.round((compliance / (parseInt(compliance) + parseInt(nonCompliance))) *100);
                        // this.compliancePercentage = parseInt(this.compliance) + parseInt(this.nonCompliance);
                        // this.compliancePercentage = this.compliance - 0;
                        // console.log(this.compliancePercentage);
                        // this.nonCompliancePercentage = Math.round((nonCompliance / (parseInt(compliance) + parseInt(nonCompliance))) *100);
                        // console.log(this.nonCompliancePercentage);
                    })
            },

            clickPdf(subItem){
                this.pdf = subItem.itemUrl;
                UserData.setDocumentId(subItem.itemId);
                // alert(this.pdf);
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
            },

            sortedData3 () {
                if(!this.sort.field){
                    return this.complianceDetailsList
                }
                return this.complianceDetailsList.concat().sort((a,b)=>{
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
        height: 850px;
    }

    .compliance-one{
        position: absolute;
        width: 99%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        height: 800px;
        background-color:#fff;
        z-index: 1;
    }

    .compliance-two{
        position: absolute;
        width: 99%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        height: 800px;
        background-color:#fff;
        z-index: 2;
    } 

    .pdfClass{
        position:absolute; 
        background-color:#f5f5f5; 
        width:98%; 
        height:880px; 
        margin-left: 0.5%;
        margin-right: 1.5%;
        /* padding:1%;  */
        overflow:hidden; 
        margin-right:0; 
        z-index:3;
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
    }

    .left a{
        color: #000;
        text-decoration: none;
    }

    .left a:hover{
        color: rgb(162,29,33);
    }

    .right{
        width: 88%;
        float: left;
        background-color:#f8f9f9;
        height: 100%;
        /* border-top: 5px solid rgb(162,29,33); */
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

    .mixedish{
        width: 99%;
        height: 100%
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
