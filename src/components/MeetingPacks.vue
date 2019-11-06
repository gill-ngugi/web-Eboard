<template>    
    <div>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">
            <router-link to="/"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
            <p style="font-weight:bold; font-size:24px; margin-left:40%;">Meeting Packs</p>
        </div>

        <!-- COMPONENT -->
              <div style="height:850px; margin-top:0.5%; margin-bottom:0.5%; background-color:#f8f9f9; border-top:5px solid rgb(86,182,229); width:98%; margin-left:1%; margin-right:1%;">
                <div class = "parent" style="height:45px; width:100%; margin-top: 7px; background-color:#fff;">
                    <div class="left-buttons">                
                        <router-link to=""><v-icon style="float:left; margin-left:10px; background-color:rgb(86,182,229); color:#fff" size="30">mdi-chevron-left</v-icon></router-link> 
                        <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">Meeting Packs</p>              
                    </div>
                        <div class="filler"></div>
                    <div class="right-buttons" style="display:inline;">                
                        
                        <div class="dropdown-table" style="display:inline;">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="primary" 
                                            text
                                            v-on="on"
                                        >
                                            Acsending
                                            <v-icon>mdi-swap-vertical-bold</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <!-- <v-list-item v-for="(item, index) in items" :key="index"> -->
                                        <v-list-item style="display:block;">    
                                            <!-- <v-list-item-title>{{ item.title }}</v-list-item-title> -->
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortByName()">Name</v-list-item-title>
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortBySize()">Size</v-list-item-title>
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortByModifiedOn()">Modified On</v-list-item-title>
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortBySubmittedBy()">Submitted By</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>       
                            </div> 
                        
                        <div style="display:inline;"><button class="btn btn-lg" text>Name</button></div>
                        <div style="display:inline;"><button class="btn btn-lg" text>List</button></div>
                        <div style="display:inline;"><button class="btn btn-lg" text>Grid</button></div>
                    </div> 
                </div> 
            
                <div class = "parent" style="height:55px; width:100%; background-color:#f1f1f1;">
                    <p style="font-weight:bold; font-size:24px; margin-left:10px; float:left;">{{itemName}}{{"/"}}{{itemName2}}</p>                
                </div>

            
                <div class="p[oopl" style="width:100%;">

                    <table class="table-striped" style="width:100%; display:block; overflow-y:auto; overflow-x:auto;">
                        <tr style="background-color:rgb(86,182,229); width:100%; height:auto; display:block; line-height:30px; overflow-y:hidden; overflow-x:hidden; color:#ffffff;">
                            <th style="padding:7px; min-width:70px;">No.</th>
                            <th style="padding:7px; min-width:70px;"></th>
                            <th style="padding:7px; min-width:650px;">Name</th>
                            <th style="padding:7px; min-width:200px;">Size</th>
                            <th style="padding:7px; min-width:200px;">Modified On</th>
                            <th style="padding:7px; min-width:200px;">Submitted By</th>
                            <th style="padding:7px; min-width:200px;">Briefcase</th>
                        </tr>

                        <tbody style="overflow-y:auto; overflow-x:auto; height:670px; display:block;">
                            <tr v-for="(item, index) in itemSubArray2" :key="index" 
                                style="width:100%;">
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">{{ index + 1 + "." }}</td>
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">    
                                    <span class="input-group-addon"><v-icon color="rgb(86,182,229)" style="margin-right:5px;">mdi-folder-open</v-icon></span>
                                </td>
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:650px; max-width:650px;">
                                    <a v-bind:href="item.itemUrl">
                                        {{ item.itemName }}
                                    </a>
                                </td>
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                    {{ item.itemSize | prettyBytes }} 
                                </td>
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                    {{ parseInt(item.itemLastUpdatedOn, 10) |  moment('DD-MMM-YYYY') }}                                 
                                </td>
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                    {{ item.itemUploadedBy }}                                 
                                </td>
                                <td style="padding-right:10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                    <button class="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>  
        <!-- END OF COMPONENT -->

        <!-- FOOTER -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; padding-left:40%;">
            <v-icon color="#fff" style="margin-right:5px;">mdi-file-pdf-outline</v-icon>
            <p style="font-weight:bold; font-size:19px;">Maters Arising Report</p>
        </div>
    </div>       
</template>


<script>
    var moment = require('moment');
    import axios from 'axios';

    export default{
        data: () => ({
            moment: moment,
            test: true,
            getRecentDocuments: [],
            // getMeetingPackFolder: [],
            itemSubArray: [],
            itemSubArray2: [],
            itemSubArray3: [],
            itemName: '',
            itemName2: '',
            itemName3: '',

            items: [
                { title: 'Name' },
                { title: 'Size' },
                { title: 'Modified On' },
                { title: 'Submitted By' },
            ],

            currentComponent: null,
            componentsArray: ['comp1', 'comp2'],

            dynamicComponent: {
                template: `<p>Wheee</p>`
            }
        }),


        methods: {
            reloadPage(){
                window.location.reload();
            },        
                        
            getRecentDocuments2(){
                axios.get("../assets/json-APIs/getRecentDocuments.json")
                    .then(response => {
                        this.getRecentDocuments = response.data;
                        this.$localStorage.set('getRecentDocuments', JSON.stringify(this.getRecentDocuments))
                        console.log(this.getRecentDocuments);
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },
            
            getMeetingPackFolder(){
                axios.get("../assets/json-APIs/0-getMeetingPackFolder.json")
                    .then(response => {
                        this.getMeetingPackFolder = response.data;
                        this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray;
                        this.itemName = this.getMeetingPackFolder.data.itemName;
                        // this.$localStorage.set('getMeetingPackFolder', JSON.stringify(this.getMeetingPackFolder))
                       // console.log(this.itemSubArray);
                        console.log(this.itemName);
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getSubMeetingPackFolder(){
                axios.get("../assets/json-APIs/1-getMeetingPackFolder-boardMeetings.json")
                    .then(response => {
                        this.getSubMeetingPackFolder = response.data;
                        this.itemSubArray2 = this.getSubMeetingPackFolder.data.itemSubArray;
                        this.itemName2 = this.getSubMeetingPackFolder.data.itemName;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getSubSubMeetingPackFolder(){
                axios.get("../assets/json-APIs/3-getMeetingPackFolder-boardMeetings-56thBM-pdfs.json")
                    .then(response => {
                        this.getSubSubMeetingPackFolder = response.data;
                        this.itemSubArray3 = this.getSubSubMeetingPackFolder.data.itemSubArray;
                        this.itemName3 = this.getSubSubMeetingPackFolder.data.itemName;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            sortBySize(){
                this.itemSubArray2.itemSize.sort(function (a,b) {
                    return a - b;
                });
            },

            swapComponent: function(component){
                this.currentComponent = component;
            }

        },
      
        beforeMount(){
            // this.getLatestNotifications();
            this.getRecentDocuments2();
            this.getMeetingPackFolder();
            this.getSubMeetingPackFolder();
            this.getSubSubMeetingPackFolder();
        },

        mounted() {
            const getRecentDocuments = JSON.parse(this.$localStorage.get('getRecentDocuments'));
            // const getLatestNotifications = JSON.parse(this.$localStorage.get('getLatestNotifications'))
            
            if (getRecentDocuments) {  
                this.getRecentDocuments = getRecentDocuments;
            }

            // if (getLatestNotifications) {  
            //     this.getLatestNotifications = getLatestNotifications;
            // }
        },

        components: {
            itemSubArray2: function() {
                function compare(a, b) {
                    if (a.item < b.item)
                    return -1;
                    if (a.item > b.item)
                    return 1;
                    return 0;
                }
                return this.arrays.sort(compare);
            }

            // 'comp1': {
            //     template: `
            //         <p>gfdfgdhjkjhj</p>
            //     `
            // },

            // 'comp2': {
            //     template: `
            //       <p>liugfdzdxfgh</p>
            //     `

            // }
        },
    }

</script>

<style scoped>
    .nav-menu{
        margin-top:0px; 
        background-color: rgb(86,182,229);
        color:#fff;
        display:flex;
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
        color:#27ae60;
    }

    .parent {
        display: flex;
        width:100%;
        /* height: auto; */
        /* padding:2%; */
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

   </style>
