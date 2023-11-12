<template>
    <v-form>
        <v-card>
        <v-card-title>Escolha um tipo de registro</v-card-title>
        <v-card-text>
          <v-radio-group v-model="userData.typeRegister">
            <v-row>
                <v-col 
                    sm="3"
                    md="3">
                    <v-radio label="Candidato" value="candidate"></v-radio>
                </v-col>
                <v-col
                    sm="3"
                    md="3">
                    <v-radio label="Empresa" value="company"></v-radio>
                </v-col>
            </v-row>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
            <v-btn 
                color="primary"
                variant="flat"
                :disabled="userData.typeRegister == ''"
                @click="clickButton">
                    Continuar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
</template>
<script setup lang="ts">

import { User } from '@/types/user.types';

const emit = defineEmits(['next']);

const props = defineProps({
    userData: {
        type: Object as () => User,
        required: true,
    }
});

function clickButton() {
    emit('next');
}

</script>