<template>
    <div>
        <h1>Discussion Section</h1>
        <pspdfkit></pspdfkit>
    </div>
</template>

<script>
    import Vue from 'vue';
    import PSPDFKit from "pspdfkit";
    
    PSPDFKit.load({});
    
    const LICENSE_KEY = "H8E3jzmVoQoKTpdmwIL-fp3l4tIXnqDrMQX2iyEpWQDWkgbJ1xho58ylym0MVf1AVcCkze3LIlMvZ7SjQwo9wrkaIq8CtOP2_jKSiXyms44dQq9CXTicGr1nPn8gZrAb4_C9pikBx8K6Vn90vswIM9cxHReanwhwx6np0W9bvQwgj0mgqWrgm_ay96va6pYgPNSz6f-V-XlCdiCm8V1m3xKLN-Iu7Fw5dSGFO7jaFVKMzxmPuqXAbmmsV6RHcuqv6mKVbC_zgT-9FmJsp-ppBiRKWTefb9Shk_7-a-PmUXf4ZbTC_9c5g-n0ExH-e6h8PbHrLiOSOkkxMHK288aRHT2EwTleY1RnULGKXmc2dmpgWkSarBsfVFV6_FAHO5FE57AfGDDlCgyYqaFz5hOcNOBR178CBBBhjGvxrYwmL-0R3KsOq_5Q5VHAcYB1k-z6";

    const pspdfkit = Vue.component("pspdfkit", {
        template: '<div class="container"></div>',
        name: "pspdfkit",
        props: ["pdfUrl", "licenseKey", "baseUrl"],
        _instance: null,

        mounted() {
            this.load();
        },

        methods: {
            load() {
                PSPDFKit.load({
                // pspdfkit.load({
                    pdf: this.pdfUrl,
                    container: ".container",
                    licenseKey: this.licenseKey,
                    baseUrl: this.baseUrl
                })
                .then(instance => {
                    this._instance = instance;
                    this.$parent.errorMsg = "";
                })
                .catch(err => {
                    PSPDFKit.unload(".container");
                    // pspdfkit.unload(".container");
                    this.$parent.errorMsg = err.message;
                });
            },
            unload() {
                if (this._instance) {
                    PSPDFKit.unload(this._instance);
                    // pspdfkit.unload(this._instance);
                    this._instance = null;
                } else {
                    PSPDFKit.unload(".container");
                    // pspdfkit.unload(".container");
                }
            }
        }
    });

    export default{
        data: () => ({
            pdf: "../assets/json-APIs/BreathenPlay.pdf",
            LICENSE_KEY,
            baseUrl: "",
            errorMsg: ""
        }),

        components: { 
            pspdfkit 
        }
    }

</script>

<style scoped>
    body {
        height: 100vh;
    }

    #app,
        .App,
        .container {
        height: 100%;
    }
</style>
