<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <h2 class="text-primary  fw-bold ">Add Contact</h2>
                <p class="fst-italic">Add Your Contact information Below</p>
            </div>
        </div>

        <div class="row">
            <div class="row">
                <div class="col-md-5">
                    <form @submit.prevent="createAddContact()">
                        <div class="mb-2">
                            <input required v-model="contact.name" type="text" class="form-control" placeholder="Name">
                        </div>
                        <div class="mb-2">
                            <input required v-model="contact.photo" type="text" class="form-control" placeholder="Photo URL">
                        </div>
                        <div class="mb-2">
                            <input required v-model="contact.email" type="text" class="form-control" placeholder="Email">
                        </div>
                        <div class="mb-2">
                            <input required v-model="contact.mobile" type="number" class="form-control" placeholder="Mobile">
                        </div>
                        <div class="mb-2">
                            <input required v-model="contact.company" type="text" class="form-control" placeholder="Company">
                        </div>
                        <div class="mb-2">
                            <input required v-model="contact.title" type="text" class="form-control" placeholder="Title">
                        </div>
                        <div class="mb-2">
                            <select name="" v-model="contact.groupId" class="form-control" v-if="groups.length > 0" >
                                <option value="">Select Group</option>
                                <option :value="group.id" v-for="group of groups" :key="group.id">{{ group.name }}</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <input type="submit" class="btn btn-primary" value="Create">
                        </div>
                    </form>
                </div>

                <div class="col-md-5">
                    <img :src="contact.photo ? contact.photo : rescueImg" alt="profile" class="contact-img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService';

export default {
    name: "AddContact",
    data : () => {
        return {
            contact: {
                name: '',
                company: '',
                email: '',
                title: '',
                mobile: '',
                photo: '',
                groupId: '',
            },
            groups : [],
            rescueImg: '../assets/ImageNotAvail.jpg'
        }
    },
    created: async function (){
        try {
            let response = await ContactService.getAllGroups();
            this.groups = response.data;
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        createAddContact : async function() {
            try {
                let response = await ContactService.createContact(this.contact);
                if(response) {
                    return this.$router.push('/');
                }
                else {
                    return this.$router.push('/contacts/add');
                }
            } catch (error) {
                console.log(error);
            }
        },
    },  
    }
</script>

<style scoped>

</style>