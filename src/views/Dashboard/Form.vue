<template>

    <b-form> 
        <b-row>
           <b-col>
           <b-button @click="$bvModal.show('modal-scoped')" variant="info" class="float-left"><font-awesome-icon icon="plus-square" /> Add tasks</b-button> 
        </b-col>
 
        </b-row>
        
        <b-modal id="modal-scoped" title="Add tasks">
            <b-form-group inline>
            <h4>Task Information</h4>
            <b-form-group
            label="Task:"
            >
                <b-form-input
                v-model="$v.form.toDo.$model"
                placeholder="Introduce the name of the task..."
                ></b-form-input>
                <p v-if="errors" class="error">
                    <span v-if="!$v.form.toDo.required">The name of the task is required</span>
                </p>
            </b-form-group>
            <b-form-group>
                <b-form-checkbox
                id="checkbox-1"
                v-model="form.finished"
                >
                Finished task
                </b-form-checkbox>
            </b-form-group>
            <b-form-group
            label="Date of Work"
            >
                <datetime type="datetime" placeholder="click to add the date" v-model="$v.form.date.$model"></datetime>
                <p v-if="errors" class="error">
                    <span v-if="!$v.form.date.required">The date is required</span>
                </p>
            </b-form-group>
            <b-form-group
            label="Building name:"
            >
                <b-form-select v-model="$v.selectedBuilding.$model">
                    <option value="">Select a building</option>
                    <option v-for="(building_obj, building) in buildings" :value="building">{{building}}</option>
                </b-form-select>
                <p v-if="errors" class="error">
                    <span v-if="!$v.selectedBuilding.required">Choosing a building is required</span>
                </p>
            </b-form-group>
            <b-form-group
            label="Apartment name:"
            >
                <b-form-select :disabled="apartment.length == 0" v-model="$v.selectedApartment.$model">
                    <option value="">Select an apartment</option>
                    <option v-for="(room_obj, apartment) in apartment">{{apartment}}</option>
                </b-form-select>
                <p v-if="errors" class="error">
                    <span v-if="!$v.selectedRoom.required">Choosing an apartment is required</span>
                </p>
            </b-form-group>
            <b-form-group
            label="Room name:">
                <b-form-select :disabled="rooms.length == 0" v-model="$v.selectedRoom.$model">
                    <option value="">Select a room</option>
                    <option v-for="room in rooms">{{room}}</option>
                </b-form-select>
                <p v-if="errors" class="error">
                    <span v-if="!$v.selectedRoom.required">Choosing a room is required</span>
                </p>
            </b-form-group>
            </b-form-group>
                <b-col>
                <b-form-group>
                    <h4>Responsable Information</h4>
                    <b-form-group
                    label="Name">
                        <b-form-input id="name-responsable" placeholder="Name of the responsible" v-model="$v.form.nameResponsible.$model"></b-form-input> 
                        <p v-if="errors" class="error">
                        <span v-if="!$v.form.nameResponsible.required">The name is required</span>
                        </p>       
                    </b-form-group>
                    <b-form-group
                    label="Email"
                    type="email">
                        <b-form-input id="email-responsable" type="email" placeholder="responsible@ecobuilders.com" v-model="$v.form.emailResponsible.$model"></b-form-input>  
                        <p v-if="errors" class="error">
                        <span v-if="!$v.form.emailResponsible.required">The email is required</span>
                        </p>       
                    </b-form-group>
                    <b-form-group
                    label="Phone">
                        <b-form-input id="phone-responsable" placeholder="+33" v-model="$v.form.phoneResponsible.$model"></b-form-input>  
                        <p v-if="errors" class="error">
                        <span v-if="!$v.form.emailResponsible.required">The phone is required</span>
                        </p>       
                    </b-form-group>
                </b-form-group>  
                <b-form-group>
                    <!-- TODO -->
                <!-- <b-form-file
                v-model="form.files"
                :state="Boolean(file)"
                multiple
                placeholder="Choose or drop the files here..."
                drop-placeholder="Drop file here..."
                ></b-form-file> -->
                </b-form-group>
                
                
                
            </b-col> 
            <template v-slot:modal-footer= "{ok, cancel}">
                    <b-button variant="primary" type="submit" @click.prevent="onSubmit(); $bvToast.show('toastCreated')">Submit task</b-button> 
                    <b-button @click="ok()">Finish adding tasks</b-button>
            </template>         
        </b-modal>
            <b-toast v-if="this.errors === false && this.formTouched === false" id="toastCreated" title="Creation of the task">The task was created</b-toast>    
        </b-form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { db, tasksCollection } from '../../db.js'
export default {
    data: function() {
        return {
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
            selectedBuilding: "",
            selectedApartment: "",
            selectedRoom: "",
            show: false, //showing close 

            // input from the user
            form: {
                buildingName: "",
                apartmentName: "",
                roomName: "",
                toDo: "",
                finished: false,
                date: "",
                nameResponsible:"",
                emailResponsible:"",
                phoneResponsible: "",
                files: []

            },
            uiState: "submit not clicked",
            errors: false,
            empty: true,
            


        }
    }, 
    methods: {
        onSubmit() {
            this.form.buildingName = this.selectedBuilding
            this.form.apartmentName = this.selectedApartment
            this.form.roomName = this.selectedRoom

            this.formTouched = !this.$v.form.$anyDirty;
            this.errors = this.$v.form.$anyError;
            this.uiState = "submit clicked";

            //validation
            if (this.errors === false && this.formTouched === false) {
                    tasksCollection.add({
                    task: this.form.toDo,
                    finished: this.form.finished,
                    date: this.form.date,
                    building: this.form.buildingName,
                    apartment: this.form.apartmentName,
                    room: this.form.roomName,
                    nameResponsible: this.form.nameResponsible,
                    emailResponsible: this.form.emailResponsible,
                    phoneResponsible: this.form.phoneResponsible,
                    createdAt: new Date(),
                    
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                })

                

                this.form.toDo = ""
                this.form.finished = ""
                this.form.date = ""
                this.form.buildingName = ""
                this.form.apartmentName = ""
                this.form.roomName = ""
                this.form.nameResponsible = ""
                this.form.emailResponsible = ""
                this.form.phoneResponsible = ""

            }
           
            
        },


    },
    watch: { //list of buildings, apartments, rooms
        selectedBuilding: function() {
            
            this.apartment = [];
            this.rooms = [];
            this.selectedApartment = "";
            this.selectedRoom = "";
            
            if (this.selectedBuilding.length > 0) {
                this.apartment = this.buildings[this.selectedBuilding]
            }
        },
        selectedApartment: function() {
            
            this.rooms = [];
            this.selectedroom = "";

            if (this.selectedApartment.length > 0) {
                this.rooms = this.buildings[this.selectedBuilding][this.selectedApartment]
            }
        }
    },
    validations: {
        form: {
            toDo:{
                required
            },
            date:{
                required
            },
            nameResponsible: {
                required
            },
            phoneResponsible: {
                required
            },
            emailResponsible: {
                required
            }

        },
        selectedBuilding: {
            required
        },
        selectedApartment: {
            required
        },
        selectedRoom: {
            required
        }

    }
}

</script>

<style>
 h1 {
     font-family: 'Montserrat', sans-serif;
 }

 .error {
     color:red;
 }
</style>