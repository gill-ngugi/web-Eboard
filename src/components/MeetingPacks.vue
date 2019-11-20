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
                        <router-link to=""><v-icon v-on:click="loadItemFromHistory()" style="float:left; margin-left:10px; background-color:rgb(86,182,229); color:#fff" size="30">mdi-chevron-left</v-icon></router-link> 
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

                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                                v-on:click="doSort('itemUploadedBy')" href="javascript:">Submitted By
                                                <span v-if="sort.field=='itemUploadedBy'">({{sort.desc?'desc':'asc'}})</span>
                                            </v-list-item-title>

                                    <!--    <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortByName()">Name</v-list-item-title>
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortBySize()">Size</v-list-item-title>
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortByModifiedOn()">Modified On</v-list-item-title>
                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" v-on:click="sortBySubmittedBy()">Submitted By</v-list-item-title> -->
                                        </v-list-item>
                                    </v-list>
                                </v-menu>       
                            </div> 
                        
                        <div style="display:inline;"><button class="btn btn-lg" text
                            v-on:click="doSort('itemName')" href="javascript:">Name
                            </button></div>
                        <!-- <div style="display:inline;"><button class="btn btn-lg" text>List</button></div>
                        <div style="display:inline;"><button class="btn btn-lg" text>Grid</button></div> -->
                    </div> 
                </div> 
            
                <div class = "parent" style="height:55px; width:100%; background-color:#f1f1f1;">
                    <p style="font-weight:bold; font-size:24px; margin-left:10px; float:left;">{{joinNames()}}</p>                
                </div>

        <!--  VUE ARRAY SORTING EXAMPLE             
                <a v-on:click="doSort('id')" href="javascript:">ID<span v-if="sort.field=='id'">({{sort.desc?'desc':'asc'}})</span></a>
                <a v-on:click="doSort('name')" href="javascript:">User<span v-if="sort.field=='name'">({{sort.desc?'desc':'asc'}})</span></a>
                <a v-on:click="doSort('leave')" href="javascript:">Leave Owing<span v-if="sort.field=='leave'">({{sort.desc?'desc':'asc'}})</span></a>

                <div id="page_list">
                    <div class="user_row" v-for="(item,index) in sortedData" :key="index">
                        <div class="user_status">{{ item.id }}</div>
                        <div class="username">{{ item.name }}</div>
                        <div class="leave_owing">{{ item.leave }}</div>
                    </div>
                </div>     -->
            
                <div class="blackish" style="width:100%;">
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
                            <tr v-for="(item, index) in sortedData2" :key="index" 
                                style="width:100%;">
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">{{ index + 1 + "." }}</td>
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">    
                                    <span class="input-group-addon"><v-icon color="rgb(86,182,229)" style="margin-right:5px;">mdi-folder-open</v-icon></span>
                                </td>
                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:650px; max-width:650px;">
                                    <!-- <a v-bind:href="item.itemUrl" v-on:click="loadItem(item.itemId)"> -->
                                    <a href="#" v-on:click="loadItem(item.localUrl)">
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
import { basename } from 'path';

    export default{
        data: () => ({
            moment: moment,
            test: true,
            getRecentDocuments: [],
            // getMeetingPackFolder: [],
            itemSubArray: [],
            itemSubArray2: [],
            itemSubArray3: [],
            navigationPath:[{"itemName":"...","localUrl":"0"}],
            currentParent:"",
           

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

            load:{
                userId: '45',
                companyCode: '010',
                accessToken: '97f914eb1ceb1867e3824f647f7e589b',
                model: 'getMeetingPackFolder',
                companyId: '2',
                itemId: '0'
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
                let baseUrl="../assets/json-APIs/0-getMeetingPackFolder.json"
                axios.get(baseUrl)
                    .then(response => {
                        this.getMeetingPackFolder = response.data;
                        this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray;
                        this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray.map((value)=>{
                                 return  {...value,"localUrl":"../assets/json-APIs/1-getMeetingPackFolder-boardMeetings.json"}
                                });
                                this.parentUrl=baseUrl;
                                
                                this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"localUrl":"../assets/json-APIs/0-getMeetingPackFolder.json"})
                       // this.itemName = this.getMeetingPackFolder.data.itemName;
                        // this.$localStorage.set('getMeetingPackFolder', JSON.stringify(this.getMeetingPackFolder))
                        // console.log(this.itemSubArray);
                        //console.log(this.navigationPath);
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
                        //this.itemName2 = this.getSubMeetingPackFolder.data.itemName;
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
            },

            doSort (field) {
                if(field == this.sort.field){
                    this.sort.desc = !this.sort.desc
                }else{
                    this.sort.field = field;
                    this.sort.desc = true;
                }
            },

            loadItem(childrenUrl){                                      
                //let newItemId={"itemId":itemdId}
                    axios.get(childrenUrl).then(response => {
                    this.getSubMeetingPackFolder = response.data;
                    this.itemSubArray = this.getSubMeetingPackFolder.data.itemSubArray.map((value)=>{
                    return  {...value,"localUrl":"../assets/json-APIs/1-getMeetingPackFolder-boardMeetings.json"}
                    });
                   
                this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"localUrl":this.parentUrl})
                        
                    //console.log(this.response);
                }, error => {
                    console.error(error);
                });
            },

            joinNames(){
                return [...this.navigationPath.map((value)=>{
                    return value.itemName
                })].join("/")
            },

            loadItemFromHistory(){
                
                let currentTop=this.navigationPath.pop();
                console.log(currentTop)
               let currentParent=this.navigationPath.peek
                  axios.get(currentTop.localUrl).then(response => {
                        this.getSubMeetingPackFolder = response.data;
                        this.itemSubArray = this.getSubMeetingPackFolder.data.itemSubArray.map((value)=>{
                         return  {...value,"localUrl":"../assets/json-APIs/1-getMeetingPackFolder-boardMeetings.json"}
                        });
                       this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"localUrl":currentParent.localUrl})
                            
                        console.log(this.response);
                    }, error => {
                        console.error(error);
                    });

            }
                        // loadItem(itemdId){
            //     let newItemId={"itemId":itemdId}
            //         axios.get("../assets/json-APIs/0-getMeetingPackFolder.json", {"data": {...this.load,...newItemId}}).then(result => {
            //          this.getSubMeetingPackFolder = response.data;
            //         this.itemSubArray2 = this.getSubMeetingPackFolder.data.itemSubArray;
            //         this.itemName2 = this.getSubMeetingPackFolder.data.itemName;     
            //         console.log(this.response);
            //     }, error => {
            //         console.error(error);
            //     });
            // }
        },

        computed: {
            sortedData () {
                if(!this.sort.field){
                    return this.items
                }

                return this.items.concat().sort((a,b)=>{
                    if(this.sort.desc){
                        return a[this.sort.field] > b[this.sort.field] ? -1:1        
                    }
                    else{
                        return a[this.sort.field] > b[this.sort.field] ? 1:-1                  
                    }
                })
            },

            sortedData2 () {
                if(!this.sort.field){
                    return this.itemSubArray
                }

                return this.itemSubArray.concat().sort((a,b)=>{
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
            // itemSubArray2: function() {
            //     function compare(a, b) {
            //         if (a.item < b.item)
            //         return -1;
            //         if (a.item > b.item)
            //         return 1;
            //         return 0;
            //     }
            //     return this.arrays.sort(compare);
            // }

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

    .user_row{
        display:flex;
    }
    .user_row>div{
        flex:1;
        text-align: center;
    }


   </style>
