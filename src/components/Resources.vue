<template>
    <div>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">
            <router-link to="/"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
            <p style="font-weight:bold; font-size:24px; margin-left:40%;">Resources</p>
        </div>

        <!-- COMPONENT -->
        <div class="component">
            <div class="left">
                <div class="left-top">        
                    <v-list style="background-color:#f8f9f9;">
                        <v-list-item-title style="color:rgb(227,58,58); padding:15px;">
                            <v-icon style="margin-right:10px;" color="rgb(227,58,58)">mdi-server</v-icon>
                            Dynamic Resources
                        </v-list-item-title>
                        <v-list-item
                            v-for="(item, index) in itemSubArrayDynamicData"
                            :key="index"                                
                        >
                        <v-list-item-title>{{ item.itemName }} <v-divider></v-divider></v-list-item-title>  
                        </v-list-item>
                    </v-list>
                </div>

                <div class="left-bottom">
                    <v-list style="background-color:#f8f9f9;">
                        <v-list-item-title style="color:rgb(227,58,58); padding:15px;">
                            <v-icon style="margin-right:10px;" color="rgb(227,58,58)">mdi-server</v-icon>
                            Static Resources
                        </v-list-item-title>
                        <v-list-item
                            v-for="(item, index) in itemSubArrayStaticData"
                            :key="index"                                
                        >
                        <v-list-item-title>{{ item.itemName }} <v-divider></v-divider></v-list-item-title>  
                        </v-list-item>
                    </v-list>
                </div>
            </div>

            <div class="right">
                <!-- Header 1 -->
                <div class = "parent" style="height:45px; width:100%; background-color:#fff;">
                    <div class="left-buttons">                
                        <!-- <router-link to=""><v-icon style="float:left; margin-top:7px; margin-left:10px; background-color:rgb(227,58,58); color:#fff" size="30">mdi-chevron-left</v-icon></router-link>  -->
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
            
            <!-- Header 2 -->
                <div class = "parent" style="height:55px; width:100%; background-color:#f1f1f1;">
                    <p style="font-weight:bold; font-size:24px; margin-left:10px; float:left;">Directors/</p>                
                </div>

            <!-- Table -->
                <table class="table-striped" style="width:100%; display:block; overflow-y:auto; overflow-x:auto;">
                    <tr style="background-color:rgb(227,58,58); width:100%; height:auto; display:block; line-height:30px; overflow-y:hidden; overflow-x:hidden; color:#ffffff;">
                        <th style="padding:7px; min-width:70px;">No.</th>
                        <th style="padding:7px; min-width:70px;"></th>
                        <th style="padding:7px; min-width:450px;">Name</th>
                        <th style="padding:7px; min-width:200px;">Size</th>
                        <th style="padding:7px; min-width:200px;">Modified On</th>
                        <th style="padding:7px; min-width:200px;">Submitted By</th>
                        <th style="padding:7px; min-width:200px;">Briefcase</th>
                    </tr>

                    <tbody style="overflow-y:auto; overflow-x:auto; height:670px; display:block;">
                        <tr v-for="(item, index) in resourceDirectors" :key="index" 
                            style="width:100%;">
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">{{ index + 1 + "." }}</td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">    
                                <span class="input-group-addon"><v-icon color="rgb(227,58,58)" style="margin-right:5px;">mdi-folder-open</v-icon></span>
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:450px; max-width:450px;">
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
    </div>
</template>

<script>
    var moment = require('moment');
    import axios from 'axios';

    export default{
        data: () => ({
            moment: moment,
            test: true,
            itemSubArrayStaticData: [],
            itemSubArrayDynamicData: [],
            resourceDirectors: [],
            itemName: '',

            items: [
                { title: 'Name' },
                { title: 'Size' },
                { title: 'Modified On' },
                { title: 'Submitted By' },
            ],

        }),

        methods: {
            reloadPage(){
                window.location.reload();
            },    

            getResourcePackFolder(){
                axios.get("../assets/json-APIs/getResourcePackFolder.json")
                    .then(response => {
                        this.getResourcePackFolder = response.data;
                        this.$localStorage.set('getResourcePackFolder', JSON.stringify(this.getResourcePackFolder));
                        this.itemSubArrayStaticData = this.getResourcePackFolder.staticData.itemSubArray;
                        this.itemSubArrayDynamicData = this.getResourcePackFolder.dynamicData.itemSubArray;
                        console.log(this.getResourcePackFolder);
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },   
              
            getResourcePackFolderDirectors(){
                  axios.get("../assets/json-APIs/getResourcePackFolder-directors.json")
                    .then(response => {
                        this.getResourcePackFolderDirectors = response.data;
                        this.$localStorage.set('getResourcePackFolderDirectors', JSON.stringify(this.getResourcePackFolderDirectors));
                        this.resourceDirectors = this.getResourcePackFolderDirectors.data.itemSubArray;
                        console.log(this.resourceDirectors);
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            }, 
        },
      
        beforeMount(){
            this.getResourcePackFolder();
            this.getResourcePackFolderDirectors();
        },

        mounted() {
            const getResourcePackFolder = JSON.parse(this.$localStorage.get('getResourcePackFolder'));
            
            if (getResourcePackFolder) {  
                this.getResourcePackFolder = getResourcePackFolder;
            }

        }
    }

</script>

<style scoped>
    .nav-menu{
        margin-top: 0px; 
        background-color: rgb(227,58,58);
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
        width: 20%;
        margin-right: 1%;
        float: left;
        height: 100%;
    }

    .left-top{
        width: 100%;
        height: 49%;
        margin-bottom: 4%;
        /* background-color:lightgoldenrodyellow; */
        background-color:#f8f9f9;
        border-top: 5px solid rgb(227,58,58);
    }

    .left-bottom{
        width: 100%;
        height: 49%;
        /* background-color:rgb(240, 229, 233); */
        background-color:#f8f9f9;
        border-top: 5px solid rgb(227,58,58);
    }

    .right{
        width: 79%;
        float: left;
        /* background-color:lightcyan; */
        background-color:#f8f9f9;
        height: 100%;
        border-top: 5px solid rgb(227,58,58);
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

</style>
