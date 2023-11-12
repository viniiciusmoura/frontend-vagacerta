<template>
    <v-form>
        <v-row >
            <v-col>
                <v-text-field
                    v-model="company.socialReason"
                    label="Razão Social"
                    type="text"
                    variant="outlined"
                    required />
            </v-col>
        </v-row>

        <v-row >
            <v-col>
                <v-text-field
                    v-model="company.cnpj"
                    label="CNPJ"
                    type="text"
                    variant="outlined"
                    required />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="company.areaOfActivity"
                    label="Área de atuação"
                    type="text"
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
                    v-model="company.areaOfActivity"
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
                    
                    :v-model="company.user?.termUser"
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
import { CompanyRegister } from '@/types/register.types';
import { ref } from 'vue';

const emit = defineEmits(['next']);
const showPassword = ref<boolean>(false);

const company = ref<CompanyRegister>({
    socialReason: '',
    cnpj: '',
    areaOfActivity: '',
    user: {
        id: 1,
        email: '',
        password: '',
        termUser: true,
        termService: false
    }
});

function clickButton() {
    emit('next');    
}
</script>

