<template>
    <b-row>
        <b-col>
            <font-awesome-icon icon="search" />
            <b-input type="text" v-model="search" placeholder="Search task" rows="3"/>
        </b-col>
    </b-row>
    

</template>

<script>
import { tasksCollection } from '../../db.js'
export default {
    data(){
        search: ""
    },
    computed: {
    // filteredList() {
    //   return this.tasks.filter(post => {
    //     return task.task.toLowerCase().includes(this.search.toLowerCase())
    //   })
    // }
    }

}
</script>