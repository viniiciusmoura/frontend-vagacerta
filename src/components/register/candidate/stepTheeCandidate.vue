<template>
    <v-form >
        <v-row class="mt-1">
            <v-col >
                <v-text-field
                    v-model="candidate.name"
                    :rules="isValid"
                    label="Nome completo"
                    type="text"
                    variant="outlined"
                    required />
            </v-col>
        </v-row>

        <v-row >
            <v-col>
                <v-text-field
                    v-model="candidate.generalRegister"
                    :rules="isValid"
                    label="RG"
                    type="text"
                    variant="outlined"
                    required />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="candidate.cpf"
                    label="CPF"
                    type="text"
                    :rules="cpfRules"
                    variant="outlined"
                    required />
            </v-col>
        </v-row>

        <v-row >
            <v-col>
                <v-select
                    v-model="candidate.sex"
                    clearable
                    label="Sexo"
                    required
                    :items="['Feminino', 'Masculino']"
                    variant="outlined"/>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="candidate.birthdate"
                    label="Data nascimento"
                    type="date"
                    variant="outlined"
                    required />
            </v-col>
        </v-row>

        <v-row >
            <v-col>
                <v-text-field
                    label="Email"
                    v-model="userData.user.email"
                    type="email"
                    variant="outlined"
                    readonly
                    required />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="userData.user.password"
                    label="Senha"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    variant="outlined"
                    required />
            </v-col>
        </v-row>
    


        <v-row class="row d-flex">
            <v-col cols="12">
                <v-checkbox 
                    v-model="userData.user.termUser"
                    :rules="[v => !!v || 'Este campo é obrigatório']"
                    label="Aceito os termos e serviços da vagacerta"
                    color="indigo">
                </v-checkbox>
                <v-checkbox 
                    label="Receber emails da vagacerta"
                    color="indigo">
                </v-checkbox>
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
                Criar conta
                <template v-slot:loader>
                    <v-progress-circular indeterminate></v-progress-circular>
                </template>
            </v-btn>
        </v-row>    
    </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CandidateRegister, UserRegister } from "../../../types/register.types";
import { cpf } from 'cpf-cnpj-validator';
import { computed } from 'vue';


const emit = defineEmits(['next']);

const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);

const props = defineProps({
    userData: {
        type: Object as () => UserRegister,
        required: true,
    }
});

const candidate = ref<CandidateRegister>({
    name: '',
    generalRegister: '',
    cpf: '',
    sex: '',
    birthdate: ''
})

const isValid = [
    (v:string) => !!v || 'Nome é obrigatório',
    (v:string) => v.length > 3 || 'Deve ter no minimo 3 letras',
];

const cpfRules = [
    (v:string) => !!v || 'CNPJ é obrigatório',
    (v:string) => cpf.isValid(v) || 'Deve ser um cpf válido', 
];

const disableButton = computed(() => {

    const arrayValidations = [
        ...isValid.map((rule) => rule(candidate.value.name)),
        ...isValid.map((rule) => rule(candidate.value.generalRegister)),
        ...cpfRules.map((rule) => rule(candidate.value.cpf)),
        props.userData.user.termUser
    ];

    return arrayValidations.every(result => result === true);
})

function clickButton() 
{
    loading.value = false
    const candidateObj : CandidateRegister = {cpf: candidate.value.cpf, birthdate: candidate.value.birthdate, 
                                            name: candidate.value.name, sex: candidate.value.sex, generalRegister: candidate.value.generalRegister};
    props.userData.typeAccount = candidateObj;
    console.log("===>", props.userData)
    loading.value = false
    emit('next');    
}
</script>

<style scoped>

</style>