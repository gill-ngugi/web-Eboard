<template>
  <div id="app" style="padding:0px; margin:0px;">
      <router-view> </router-view> 
        <!-- <Gillian></Gillian> -->
    <!-- <div>
      <input type="file" id="selectPDF" v-on:change="openPDF" accept="application/pdf" />
      <span class="error">{{errorMsg}}</span>
      <p v-on:click="openThis()">Example.pdf</p>
    </div>
    <div class="App-viewer">
      <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl"></pspdfkit>
    </div> -->
  </div>
     <!-- "pspdfkit": "https://customers.pspdfkit.com/npm/TRIAL-QY-IaXkB716oT9IR3HopSWA4gUi77N7R_Y0ZzDoGQ0zr8Sg-RhmN7ZkBTYK01LOlMnw8GMj0tnHsiYAykQG9yYAJ2PY-BeNRm2pPe1nvQ-k/latest.tar.gz", -->

</template>

<script> 
//   import Vue from 'vue';
//   import PSPDFKit from "pspdfkit";

//   const LICENSE_KEY = "H8E3jzmVoQoKTpdmwIL-fp3l4tIXnqDrMQX2iyEpWQDWkgbJ1xho58ylym0MVf1AVcCkze3LIlMvZ7SjQwo9wrkaIq8CtOP2_jKSiXyms44dQq9CXTicGr1nPn8gZrAb4_C9pikBx8K6Vn90vswIM9cxHReanwhwx6np0W9bvQwgj0mgqWrgm_ay96va6pYgPNSz6f-V-XlCdiCm8V1m3xKLN-Iu7Fw5dSGFO7jaFVKMzxmPuqXAbmmsV6RHcuqv6mKVbC_zgT-9FmJsp-ppBiRKWTefb9Shk_7-a-PmUXf4ZbTC_9c5g-n0ExH-e6h8PbHrLiOSOkkxMHK288aRHT2EwTleY1RnULGKXmc2dmpgWkSarBsfVFV6_FAHO5FE57AfGDDlCgyYqaFz5hOcNOBR178CBBBhjGvxrYwmL-0R3KsOq_5Q5VHAcYB1k-z6";

//   const pspdfkit = Vue.component('pspdfkit', {
//   template: '<div class="container"></div>',
//   name: 'pspdfkit',
//   props: ['pdfUrl', 'licenseKey', 'baseUrl'],
//   _instance: null,

//   mounted: function mounted() {
//     this.load()
//   },

//   methods: {
//     load: function load() {
//       const that = this;
//       PSPDFKit.load({
//         pdf: this.pdfUrl,
//         container: '.container',
//         licenseKey: this.licenseKey,
//         baseUrl: this.baseUrl,
//       })
//         .then(function (instance) {
//           that._instance = instance;
//           that.$parent.errorMsg = ''
//         })
//         .catch(function (err) {
//           PSPDFKit.unload('.container')
//           that.$parent.errorMsg = err.message
//         });
//     },

//     unload: function unload() {
//       if (this._instance) {
//         PSPDFKit.unload(this._instance || '.container')
//         this._instance = null
//       }
//     }
//   },
  
//   watch: {
//     pdfUrl: function pdfUrl() {
//       this.unload()
//       this.load()
//     }
//   },

//   beforeDestroy: function beforeDestroy() {
//     this.unload()
//   }
// })

// export default{

//   components: { 
//     pspdfkit: pspdfkit 
//   },

//   data: function data() {
//     return {
//       pdf: 'http://eserver1.stl-horizon.com/api_v9/frontend/web/user/files?companyId=2&userId=45&companyCode=010&actionTypes=getDocDownload&DocId=1703',
//       LICENSE_KEY: LICENSE_KEY,
//       baseUrl: '',
//       errorMsg: 'Mayday Mayday, we got issues!!!',
//     }
//   },
//   methods: {
//     openPDF: function openPDF(e) {
//       this.pdf = window.URL.createObjectURL(e.target.files[0])
//     },
//     openThis(){
//       window.open(this.pdf);
//     },
//   }
// }

</script>

<style>

</style>
