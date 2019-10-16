<template>
    <div >
        <h2>Tasks</h2>
        <b-card-group columns>
            <b-card 
            v-for="task in tasksToDo" :key="task.id" 
            style="max-width: 40rem;"
            class="mb-2">
                <b-card-title>
                    <b-row>
                        <b-col>
                            {{task.task}}
                            <b-badge v-if="task.finished === true" variant="success">Done</b-badge>
                        </b-col>
                        <b-col class="ml-auto">
                            <b-button variant="info" class="mr-2" @click="$bvModal.show('modal-edit'); editTask(task)" >
                                <font-awesome-icon icon="edit"/>
                            </b-button>
                            <b-button>
                                <font-awesome-icon icon="times" @click="deleteTask(task); $bvToast.show('toastDeleted')"/>
                            </b-button> 

                            
                        </b-col>
                    </b-row>  
                </b-card-title>
                <b-row>
                    <b-col>
                        <font-awesome-icon icon="address-card" size="2x" class="mr-2" />
                        <b>Responsable</b>
                        <p class="mb-0">Name: {{task.nameResponsible}}</p>
                        <p class="mb-0">Phone: {{task.phoneResponsible}}</p>
                        <p class="mb-0">Email: {{task.emailResponsible}}</p>
                    </b-col>
                    <b-col>
                        <font-awesome-icon icon="map-marker-alt" size="2x" class="mr-2" />
                        <b>Location</b>
                        <p class="mb-0">Room: {{task.room}}</p>
                        <p class="mb-0">Apartment: {{task.apartment}}</p>
                        <p class="mb-0">Building: {{task.building}}</p>
                    </b-col>
                </b-row>
                <template v-slot:footer>
                    <small class="text-muted">
                        <b-row>
                            <b-col>
                                <font-awesome-icon icon="calendar-check" size="2x" />
                                <span class="ml-3">{{ task.date | moment("dddd, MMMM Do YYYY") }}</span>
                            </b-col>
                            <!-- <b-col>
                                NOT IMPLEMENTED YET , TO DO
                               <b-button variant="info">
                                    <font-awesome-icon icon="folder-open"  />
                                    Files
                                </b-button>
                                
                            </b-col> -->
                        </b-row>
                        
                    </small>                    
                </template>     
            </b-card>
        </b-card-group>
        <b-toast id="toastDeleted" title="Deletion of the task">The task was deleted</b-toast>  
        <b-modal id="modal-edit" title="Edit the task">
            <b-form-group inline>
            <h4>Task Information</h4>
            <b-form-group
            label="Task:">
                <b-form-input
                v-model="$v.taskEdit.$model"
                placeholder="Introduce what must be done..."
                ></b-form-input>
                <p v-if="errors" class="error">
                    <span v-if="!$v.taskEdit.required">This field is required</span>
                </p>
            </b-form-group>
            <b-form-group>
                <b-form-checkbox
                id="checkbox-1"
                v-model="finishedEdit"
                >
                Finished task
                </b-form-checkbox>
            </b-form-group>
            <b-form-group
            label="Date of Work"
            >
                <datetime type="date" v-model="$v.dateEdit.$model"></datetime>
                <p v-if="errors" class="error">
                    <span v-if="!$v.dateEdit.required">The date is required</span>
                </p>
            </b-form-group>
                </b-form-group>
                <b-col>
                <b-form-group>
                    <h4>Responsable Information</h4>
                    <b-form-group
                    label="Name">
                        <b-form-input id="name-responsable" v-model="$v.nameEdit.$model"></b-form-input>  
                        <p v-if="errors" class="error">
                            <span v-if="!$v.nameEdit.required">The name is required</span>
                        </p>      
                    </b-form-group>
                    <b-form-group
                    label="Email"
                    type="email">
                        <b-form-input id="email-responsable" v-model="$v.emailEdit.$model"></b-form-input>
                        <p v-if="errors" class="error">
                            <span v-if="!$v.emailEdit.required">The email is required</span>
                        </p>        
                    </b-form-group>
                    <b-form-group
                    label="Phone">
                        <b-form-input id="phone-responsable" v-model="$v.phoneEdit.$model"></b-form-input> 
                        <p v-if="errors" class="error">
                            <span v-if="!$v.phoneEdit.required">The phone is required</span>
                        </p>       
                    </b-form-group>
                </b-form-group>  
            </b-col>    
            <template v-slot:modal-footer= "{ok, cancel}">
                    <b-button variant="primary" type="submit" @click.prevent="updateTask(); $bvToast.show('toastEdited'); ok()">Edit task</b-button> 
            </template>        
        </b-modal>
        <b-toast v-if="this.errors === false && this.formTouched === false" id="toastEdited" title="Edition of the task">The task was edited</b-toast> 
    </div>
    
    

    
    
</template>

<script>
import { db, tasksCollection } from '../../db.js'
import { required, minLength } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
    data() {
        return {
            tasksToDo: {},

            //editing the cards
            buildings: {
                "Aerial Residence": {
                    "1A": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Garden"],
                    "1B": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Garden"],
                    "1C": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Garden"],
                    "2A": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2"],
                    "2B": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2"],
                    "2C": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2"],
                    "3A": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Terrace"],
                    "3B": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Terrace"],
                    "3C": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Terrace"],
                },
                "Garden Apartments": {
                    "A": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Terrace"],
                    "B": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Terrace"],
                    "C": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Terrace"],
                    "D": ["Living Room", "Bathroom", "Bedroom", "Bedroom 2", "Terrace"],
                },
                "The Glade Penthouse": {
                    "1": ["Living Room", "Lounge", "Dining Room", "Bathroom", "Bathroom 2", "Suite", "Bedroom", "Bedroom 2", "Terrace"],
                    "2": ["Living Room", "Lounge", "Dining Room", "Bathroom", "Bathroom 2", "Suite", "Bedroom", "Bedroom 2", "Terrace"],
                    "3": ["Living Room", "Lounge", "Dining Room", "Bathroom", "Bathroom 2", "Suite", "Bedroom", "Bedroom 2", "Terrace"],
                    "4": ["Living Room", "Lounge", "Dining Room", "Bathroom", "Bathroom 2", "Suite", "Bedroom", "Bedroom 2", "Terrace"],
                }
            },
            apartment: [],
            rooms: [],
            tasks: [],

            currentlyEditing: null,
            taskEdit: "",
            finishedEdit: "",
            dateEdit: "",
            nameEdit: "",
            phoneEdit: "",
            emailEdit: "",
            id: "",

            uiState: "submit not clicked",
            errors: false,
            empty: true,

        }
    },
    validations: {
        taskEdit: {
            required
        },
        dateEdit: {
            required
        },
        nameEdit: {
            required
        },
        phoneEdit: {

        },
        emailEdit: {
            required
        }
    },
    firestore() {
        return {
            tasksToDo: tasksCollection.orderBy('createdAt', 'desc')
        }
    },
    methods: {
        deleteTask(task) {
            tasksCollection.doc(task.id).delete();
        },
        editTask(task) {
            this.currentlyEditing = task.id;
            this.taskEdit = task.task;
            this.finishedEdit = task.finished;
            this.dateEdit = task.edit;
            this.nameEdit = task.nameResponsible;
            this.emailEdit = task.emailResponsible;
            this.phoneEdit = task.phoneResponsible;


        },
        updateTask() {
            this.formTouched = !this.$v.$anyDirty;
            this.errors = this.$v.$anyError;
            this.uiState = "submit clicked";

            //validation
            if (this.errors === false && this.formTouched === false){
                tasksCollection.doc(this.currentlyEditing).update({
                task: this.taskEdit,
                finished: this.finishedEdit,
                date: this.dateEdit,
                nameResponsible: this.nameEdit,
                emailResponsible: this.emailEdit,
                phoneResponsible: this.phoneEdit
                })
                .then(function(docRef) {
                    console.log("Updated document text with ID: ", task.id);
                })
                .catch(function(error) {
                    console.error("Error updating document text: ", error);
                });
                this.currentlyEditing = null;
                this.taskEdit = '';
                this.finishedEdit = "";
                this.dateEdit = "";
                this.nameEdit = "";
                this.phoneEdit = "";
                this.emailEdit = "";
                this.roomEdit = "";
                this.apartmentEdit = "";
                this.buildingEdit = "";
                }

            
        }
    }
    
}
</script>