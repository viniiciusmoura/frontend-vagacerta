<template>
    <v-card>
        <v-card-title>
          <span class="headline">Experiência Profissional</span>
        </v-card-title>

        <v-card-text>
            <v-form>
                <v-row >
                    <v-col>
                        <v-text-field
                            v-model="experiencie.company"
                            label="Empresa"
                            type="text"
                            :rules="isValidRules"
                            variant="outlined"
                            required />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="experiencie.office"
                            label="Cargo"
                            type="text"
                            :rules="isValidRules"
                            variant="outlined"
                            required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            v-model="experiencie.description"
                            label="Descrição"
                            :rules="isValidRules"
                            auto-grow
                            variant="outlined"
                            rows="3"
                            row-height="25"
                            shaped/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-mode="experiencie.startDate"
                            label="Data de inicio"
                            type="date"
                            variant="outlined"
                            required />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="experiencie.endDate"
                            label="Data fim"
                            type="date"
                            variant="outlined"
                            required />
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center align-center mb-4 mt-4">
                    <v-btn
                        min-width="250"
                        elevation="2"
                        color="primary"
                        variant="flat"
                        :disabled="!disableButton"
                        :loading="loading"
                        @click="clickButton">
                        Cadastrar
                        <template v-slot:loader>
                            <v-progress-circular indeterminate></v-progress-circular>
                        </template>
                    </v-btn>
                </v-row>    
            </v-form>
        </v-card-text>
    </v-card>    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Experience } from '@/types/register.types';
import { computed } from '@vue/reactivity';

const loading = ref<boolean>(false);

const experiencie = ref<Experience>({
    company: '',
    office: '',
    description: '',
    startDate: '',
    endDate: ''
})

const isValidRules = [
    (v:string) => !!v || 'campo obrigatório',
    (v:string) => v.length > 3 || 'Deve ter no minimo 3 letras',
];

const disableButton = computed(() => {

    const arrayValidations = [
        ...isValidRules.map((rule) => rule(experiencie.value.company)),
        ...isValidRules.map((rule) => rule(experiencie.value.office)),
        ...isValidRules.map((rule) => rule(experiencie.value.description)),
    ];

    return arrayValidations.every(result => result === true);
})

function clickButton() 
{
    loading.value = true
      
}
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>