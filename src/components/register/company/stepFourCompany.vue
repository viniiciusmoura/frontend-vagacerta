<template>
    <v-card>
        <v-card-title>
          <span class="headline">Gerar oportunidades</span>
        </v-card-title>

        <v-card-text>
            <v-form>
                <v-row >
                    <v-col>
                        <v-text-field
                            v-model="vacancies.office"
                            label="Cargo"
                            type="text"
                            variant="outlined"
                            :rules="isValidRules"
                            required />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="vacancies.salary"
                            label="Salário"
                            type="text"
                            variant="outlined"
                            required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            v-model="vacancies.description"
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
                        <v-checkbox
                            v-model="vacancies.foodVoucher"
                            label="Vale alimentação" />
                    </v-col>
                    <v-col>
                        <v-checkbox
                            v-model="vacancies.mealVoucher"
                            label="Vale refeição" />
                    </v-col>
                    <v-col>
                        <v-select
                            clearable
                            v-model="vacancies.formContract"
                            label="Forma de contrato"
                            :items="['CLT', 'CNPJ']"
                            variant="outlined"
                            required />
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center align-center mb-2 mt-4">
                    <v-btn
                        min-width="250"
                        elevation="2"
                        color="primary"
                        variant="flat"
                        :disabled="!disableButton"
                        :loading="loading"
                        @click="clickButton">
                        Criar oportunidade
                        <template v-slot:loader>
                            <v-progress-circular indeterminate></v-progress-circular>
                        </template>
                    </v-btn>
                </v-row>    
                <v-row class="d-flex justify-center align-center">
                    <v-btn
                        min-width="250"
                        color="primary"
                        variant="outlined"
                        to="/">
                        Pular
                        <template v-slot:loader>
                            <v-progress-circular indeterminate></v-progress-circular>
                        </template>
                    </v-btn>
                </v-row>    
            </v-form>
        </v-card-text>
    </v-card>    

    <m-message v-model="alertMsg" :datamsg=datamsg />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Vacancies } from '@/types/register.types';
import { computed } from 'vue';
import vacanciesService from '@/services/vacancies.service';
import MMessage from '@/components/shared/MMessage.vue';
import { Msg } from '@/types/generic.types';


const vacancies = ref<Vacancies>({
    office: '',
    description: '',
    salary: 0.00,
    foodVoucher: false,
    mealVoucher: false,
	formContract: ''
});

const datamsg = ref<Msg>({});
const alertMsg = ref<boolean>(false);

const isValidRules = [
    (v:string) => !!v || 'Razão social é obrigatório',
    (v:string) => v.length > 3 || 'Deve ter no minimo 3 letras',
];

const loading = ref<boolean>(false);


const disableButton = computed(() => {

    const arrayValidations = [ 
        ...isValidRules.map((rule) => rule(vacancies.value.office)),
        ...isValidRules.map((rule) => rule(vacancies.value.description)),
    ];

    return arrayValidations.every(result => result === true);
})

async function clickButton() 
{
    loading.value = true;
     
    vacancies.value.company = localStorage.getItem('companyid');

    const response: any = await vacanciesService.create(vacancies.value);
    console.log(response);
    if(response){
        datamsg.value = {message:"Oportunidade cadastrada com sucesso", color:"success", time: 3000};
        alertMsg.value = true;
    }
    
    loading.value = false;
}



</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>