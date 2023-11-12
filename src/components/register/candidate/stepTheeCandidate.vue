<template>
    <v-form>
        <v-row >
            <v-col>
                <v-text-field
                    v-model="candidate.name"
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
                    type="email"
                    variant="outlined"
                    readonly
                    required />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="candidate.birthdate"
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
                    
                    :v-model="candidate.user?.termUser"
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
       
            <v-btn
                color="primary"
                variant="flat"
                @click="clickButton">
                Criar conta
            </v-btn>
    </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CandidateRegister } from "../../../types/register.types";


const emit = defineEmits(['next']);

const showPassword = ref<boolean>(false);

const candidate = ref<CandidateRegister>({
    name: '',
    generalRegister: '',
    cpf: '',
    sex: '',
    birthdate: '',
    user: {
        id: 1,
        email: '',
        password: '',
        termUser: true,
        termService: false
    }
})

function clickButton() {
    emit('next');    
}
</script>

<style scoped>

</style>