<template>
    <v-form>
        <v-card>
        <v-card-title class="text-center">Escolha um tipo de registro</v-card-title>
        <v-card-text class="mt-5">
            <v-row class="d-flex justify-center align-center">
                <v-col sm="4" md="4">
                    <v-card
                        class="text-center pa-5"
                        :class="{borderCard: userData.user.typeRegister === 'company'}"
                        @click="setCard('company')">

                        <v-icon
                            class="mdi mdi-domain"
                            size="large">
                        </v-icon>

                        <v-card-title
                            class="caption">
                            Empresa
                        </v-card-title>
                    </v-card>
                </v-col>    

                <v-col sm="4" md="4">
                    <v-card
                        class="text-center pa-5" 
                        :class="{borderCard: userData.user.typeRegister === 'candidate'}"
                        @click="setCard('candidate')">
                        <v-icon
                            class="mdi mdi-account-search"
                            size="large">
                        </v-icon>

                        <v-card-title
                            class="caption">
                            Candidato
                        </v-card-title>
                    </v-card>
                </v-col> 
            </v-row>    
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-center mb-4 mt-4">
            <v-btn 
                min-width="250"
                elevation="2"
                color="primary"
                variant="flat"
                :disabled="userData.user.typeRegister == ''"
                @click="clickButton">
                    Continuar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
</template>
<script setup lang="ts">

import { UserRegister } from '@/types/register.types';
import { ref } from 'vue';

const showBorder = ref<boolean>(true);

const emit = defineEmits(['next']);

const props = defineProps({
    userData: {
        type: Object as () => UserRegister,
        required: true,
    }
});

function clickButton() {
    emit('next');
}

function setCard(cardName:string) 
{
   props.userData.user.typeRegister = cardName;
}

</script>

<style scoped>
.borderCard {
    border: 1px solid rgb(var(--v-theme-primary));
    box-shadow: 5px 8px 16px 5px rgba(0, 0, 0, 0.1); 
}
</style>