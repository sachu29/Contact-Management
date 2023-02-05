<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <h2 class="text-primary fw-bold ">View Contact information</h2>
                <p class="fst-italic">You Can View all your Information here:</p>
            </div>
        </div>

        <!-- Spinner -->

        <div v-if="loading">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <Spinner/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message-->
        <div v-if="!loading && errorMessage">
            <div class="container mt-5">
                <div class="row">
                    <div class="col">
                        <p class="h4 text-danger fw-bold text-center">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" v-if="!loading && isDone()">
            <div class="row align-items-center">
            <div class="col-md-3">
                <img :src="contact.photo" alt="profile" class="contact-img-big">
            </div>

            <div class="col-md-5">
                <ul class="list-group shadow">
                    <li class="list-group-item">Name :  <span class="fw-bold">{{ contact.name }}</span></li>
                    <li class="list-group-item">Mobile : <span class="fw-bold">{{ contact.mobile }}</span></li>
                    <li class="list-group-item">Email : <span class="fw-bold">{{ contact.email }}</span></li>
                    <li class="list-group-item">Company : <span class="fw-bold">{{ contact.company }}</span></li>
                    <li class="list-group-item">Job Title : <span class="fw-bold">{{ contact.title }}</span></li>
                    <li class="list-group-item">Group : <span class="fw-bold">{{ group.name }}</span></li>
                </ul>
            </div>

            <div class="row">
                <div class="col">
                    <router-link to="/contacts" class="btn btn-primary mt-5"><i class="fa fa-arrow-circle-left"></i> Back</router-link>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService';
import Spinner from '../components/SpinnerLoad';

    export default {
        name: 'ViewContact',
        components: {
            Spinner
        },
        data() {
            return {
                contactId : this.$route.params.contactId, 
                name: "ViewContact",
                loading : false,
                contact : {},
                group : {}
            }
        },
        created: async function() {
            try {
                this.loading = true;
                let response = await ContactService.getContact(this.contactId);
                let groupResponse = await ContactService.getGroup(response.data);
                this.contact = response.data;
                this.group = groupResponse.data; 
                this.loading = false;
            } catch (error) {
                this.errorMessage = error;
                this.loading = false;
            } 
        },
        methods : {
            isDone : function (){
               return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
            }
        }
    }
</script>

<style scoped>

</style>