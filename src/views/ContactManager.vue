<template>
    <div class="container mt-3">
        <div class="row d-flex justify-content-between">
            <div class="col d-flex">
                <p class="h3 text-primary fw-bold mx-3">Contact Manager</p>
                <router-link to="/contacts/add" class="btn btn-primary" ><i class="fa fa-plus-circle"></i> Add New</router-link>
            </div>

            <div class="col">
                <form class="d-flex justify-content-end">
                    <div class="row">
                        <div class="col mx-3">
                            <input type="text" class="form-control" placeholder="Search" name="search">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button type="submit" class="btn btn-success"><i class="fa fa-search "></i> Submit</button>
                        </div>
                    </div>
                </form>
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

        <!-- Error -->
        <div v-if="!loading && errorMessage">
            <div class="container mt-5">
                <div class="row">
                    <div class="col">
                        <p class="h4 text-danger fw-bold text-center">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card -->

        <div class="container mt-3" v-if="contacts.length > 0">
            <div class="row">
                <div class="col-md-6"  v-for="contact of contacts" :key="contact">
                    <div class="card my-3 list-group-item-primary shadow-lg">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-sm-4">
                                <img :src="contact.photo" alt="profile" class="contact-img" title="Profile">
                                </div>
                                <div class="col-sm-7">
                                    <ul class="list-group">
                                        <li class="list-group-item">Name: <span class="fw-bold">{{ contact.name }}</span></li>
                                        <li class="list-group-item">Email: <span class="fw-bold">{{ contact.email }}</span></li>
                                        <li class="list-group-item">Mobile: <span class="fw-bold">{{ contact.mobile }}</span></li>
                                    </ul>
                                </div>
                                <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                                    <router-link :to="`/contacts/view/${contact.id}`" class="btn btn-warning my-1" title="view Contact">
                                        <i class="fa fa-eye text-white"></i>
                                    </router-link>
                                    <router-link :to="`/contacts/edit/${contact.id}`" class="btn btn-primary my-1" title="Add Contact">
                                        <i class="fa fa-pen text-white"></i>
                                    </router-link>
                                    <button class="btn btn-danger my-1" title="Delete Contact" @click="clickDeleteContact(contact.id)">
                                        <i class="fa fa-trash text-white"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '../services/ContactService';
import Spinner from '@/components/SpinnerLoad.vue'

    export default {
        name: "ContactManager",
        components : {
            Spinner
        },
        data: function() {
            return {
                loading: false,
                contacts: [],
                errorMessage : null,
            }
        },
        created: async function() {
            try {
                this.loading = true;
                let response = await ContactService.getAllContacts()
                this.contacts = response.data;
                this.loading = false;
            } catch (error) {
                this.errorMessage = error;
                this.loading = false;
            }
        },
        methods: {
            clickDeleteContact : async function(contactId) {
                try {
                    this.loading = true;
                    let response = await ContactService.deleteContact(contactId);
                    if(response){
                    let response = await ContactService.getAllContacts(); //Getting fresh Data
                    this.contacts = response.data;
                    this.loading = false;
                    }
                } catch (error) {
                    this.errorMessage = error;
                    this.loading = false;
                }
            }
        },
        // computed: {
            
        // },
    }
</script>

<style >

</style>