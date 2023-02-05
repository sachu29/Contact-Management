<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <h2 class="text-primary  fw-bold ">Edit Contact</h2>
                <p class="fst-italic">Edit Your information Below</p>
            </div>
        </div>



        <div class="row">
            <div class="row">
                <div class="col-md-5">
                    <form @submit.prevent="updateSubmit()">
                        <div class="mb-2">
                            <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
                        </div>
                        <div class="mb-2">
                            <input v-model="contact.photo" type="text" class="form-control" placeholder="Photo URL">
                        </div>
                        <div class="mb-2">
                            <input v-model="contact.email" type="text" class="form-control" placeholder="Email">
                        </div>
                        <div class="mb-2">
                            <input v-model="contact.mobile" type="number" class="form-control" placeholder="Mobile">
                        </div>
                        <div class="mb-2">
                            <input v-model="contact.company" type="text" class="form-control" placeholder="Company">
                        </div>
                        <div class="mb-2">
                            <input v-model="contact.title" type="text" class="form-control" placeholder="Title">
                        </div>
                        <div class="mb-2">
                            <select v-model="contact.groupId" name="" class="form-control" v-if="groups.length > 0">
                                <option value="">Select Group</option>
                                <option :value="group.id" v-for="group of groups" :key="group.id">{{ group.name }}</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <router-link to="/contacts" class=" btn btn-primary custom-mr-5"><i class="fa fa-arrow-circle-left" ></i> Back</router-link>
                            <input type="submit" class="btn btn-primary" value="Update">
                        </div>
                    </form>
                </div>

                <div class="col-md-5">
                    <img :src="contact.photo" alt="profile" class="contact-img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService';

    export default {
        name: "EditContact",
        data() {
            return {
                contactId : this.$route.params.contactId,
                loading: false,
                contact: {
                name: '',
                company: '',
                email: '',
                title: '',
                mobile: '',
                photo: '',
                groupId: '',
                },
                errorMessage : null,
                groups : [],
            }
        },
        created : async function() {
            try {
                this.loading = true;
                let response = await ContactService.getContact(this.contactId);
                let groupResponse = await ContactService.getAllGroups();
                this.contact = response.data;
                this.groups = groupResponse.data;
                this.loading = false;
            } catch (error) {
                this.errorMessage = error;
                this.loading = false;
            }
        },
        methods : {
            updateSubmit : async function (){
                try {
                let response = await ContactService.updateContact(this.contact, this.contactId);
                if(response) {
                    return this.$router.push('/');
                }
                else {
                    return this.$router.push(`/contacts/edit/${this.contactId}`);
                }
                } catch (error) {
                    console.log(error);
                }       
            }
        },

    }
</script>

<style scoped>
.custom-mr-5{
    margin-right: 10px;
}
</style>