<template>
    <v-dialog width="800">
        <v-card :title="op=='editar' ? 'Editar' : 'Cadastrar'">
            <v-col
                v-if="op=='editar'">
                <stepFourCandidate :experience="props.experience"/>
            </v-col>
            <v-col v-else>
                <stepFourCandidate />
            </v-col>
            
        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            text="Fechar"
            @click="exitModal"
            ></v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { Experience } from '@/types/register.types';
import stepFourCandidate from '../register/candidate/stepFourCandidate.vue';

const emit = defineEmits(['exitModal']);
const props = defineProps({
    experience: {
        type: Object as () => Experience
    },
    op: {
        type: String
    }
});

function exitModal() {
    emit("exitModal");
}
</script>