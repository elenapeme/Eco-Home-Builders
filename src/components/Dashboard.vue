<template>
    <div>
        <b-card bg-variant="light">
            <b-form-group
            label="Building info"
            label-size="lg"
            >
                <b-form-group
                    label-cols-sm="3"
                    label="Building name:"
                    label-align-sm="right"
                >
                    <b-form-select v-model="building" :options="buildingList"></b-form-select>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Apartment name:"
                    label-align-sm="right"
                >
                    <b-form-select v-model="apartment" :options="apartmentList"></b-form-select>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Room name:"
                    label-align-sm="right"
                >
                    <b-form-select v-model="room" :options="roomList"></b-form-select>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Actions to do:"
                    label-align-sm="right"
                >
                    <b-form-textarea
                    id="todo"
                    v-model="todo"
                    placeholder="Introduce the things that still must be done..."
                    rows="3"
                    max-rows="6"
                    ></b-form-textarea>
                </b-form-group>
                <b-form-group
                    label-cols-sm="3"
                    label-align-sm="right"
                >
                    <b-form-checkbox
                    id="checkbox-1"
                    v-model="finished"
                    >
                    Finished room
                    </b-form-checkbox>
                </b-form-group>
            </b-form-group>

            <b-form-group
            label="Responsable info"
            label-size="lg"
            label-class="pt-0"
            >
                <b-form-group
                label-cols-sm="3"
                label="Name:"
                label-align-sm="right"
                >
                <b-form-input id="name-responsable" v-model="name"></b-form-input>
                </b-form-group>

                <b-form-group
                label-cols-sm="3"
                label="Email"
                label-align-sm="right"
                >
                <b-form-input id="email" v-model="email"></b-form-input>
                </b-form-group>

                <b-form-group
                label-cols-sm="3"
                label="Phone:"
                label-align-sm="right"
                >
                <b-form-input id="phone" v-model="phone"></b-form-input>
                </b-form-group>
                
                <button type="submit">Add</button>
            </b-form-group>
            
        </b-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Data from the the user
            form: {
                building: '',
                apartment: '',
                room: '',
                todo: '',
                finished: '',
                name: '',
                email: '',
                phone: '',
            },

            //Lists for the Select
            buildingList: [
               { value: null, text: "Select a building"},
               { value: '', text: "Aerial House"},
               { value: '', text: "The Glade"},
               { value: '', text: "Garden House"},
               { value: '', text: "House of Ribes street"},
               { value: '', text: "Primrose Cottage"},
               { value: '', text: "Meadow View"}
            ]
        }
    }

}
</script>

<style>
 h1 {
     font-family: 'Montserrat', sans-serif;
 }
</style>