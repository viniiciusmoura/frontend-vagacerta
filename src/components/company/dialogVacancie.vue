<template>
    <v-dialog width="800">
        <v-card :title="op=='editar' ? 'Editar oportunidade' : ''">
            <v-col
                v-if="op=='editar'">
                <stepFourCompany  :vacancies="props.vacancies" />
            </v-col>
            <v-col v-else>
                <stepFourCompany />
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
import { Vacancies } from '@/types/vacancies.types';
import stepFourCompany from '../register/company/stepFourCompany.vue';

const emit = defineEmits(['exitModal']);
const props = defineProps({
    vacancies: {
        type: Object as () => Vacancies
    },
    op: {
        type: String
    }
});

function exitModal() {
    emit("exitModal");
}

</script>