<template>

    <b-container fluid>
        <b-row class="ml-1 mt-3">
            <Form class="mt-3"/>
            

        </b-row>
        <b-row>
            <Tasks />    
        </b-row>
    </b-container>
    

</template>

<script>
import Form from './Form'
import Tasks from './Tasks'


export default {
    components: {
        Form,
        Tasks,
        
    }
}
</script>