<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md12>
                <v-card class="elevation-12">
                    <v-toolbar dark color="blue">
                        <v-toolbar-title>
                            DASHBOARD
                        </v-toolbar-title>
                    </v-toolbar>    
                    <v-card-text>
                        <v-text-field label="Email" type="email" name="email">                            
                        </v-text-field>

                        <v-text-field label="Password" type="password" name="password">
                        </v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>                        
                            <v-spacer></v-spacer>
                        <v-btn to="/login" class="ma-2" color="primary" dark rounded>
                            Login <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card-actions>                    
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Dashboard'
}
</script>

<style>

</style>