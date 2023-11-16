<template>
    <v-form>
        <v-row class="mt-3" >
            <v-col>
                <v-text-field
                    v-model="company.socialReason"
                    label="Razão Social"
                    type="text"
                    variant="outlined"
                    :rules="socialReasonRules"
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
                    :rules="cnpjRules"
                    required />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="company.areaOfActivity"
                    label="Área de atuação"
                    type="text"
                    variant="outlined"
                    :rules="areaOfActivityRules"
                    required />
            </v-col>
        </v-row>
        <v-row >
            <v-col>
                <v-text-field
                    v-model="userData.user.email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    readonly
                    required />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="userData.user.password"
                    label="Senha"
                    class="pwdInput"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    :rules="passwordRules"
                    variant="outlined"
                    required />
            </v-col>
        </v-row>

        <v-row class="row d-flex">
            <v-col cols="12">
                <v-checkbox 
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
        {{ disableButton }}
        <v-row class="d-flex justify-center align-center mb-4 mt-4">
            <v-btn
                min-width="250"
                elevation="2"
                color="primary"
                variant="flat"
                :disabled="!disableButton"
                @click="clickButton">
                Criar conta
            </v-btn>
        </v-row>    
    </v-form>
</template>

<script setup lang="ts">
import { CompanyRegister, UserRegister } from '@/types/register.types';
import { ref } from 'vue';
import { cnpj } from 'cpf-cnpj-validator';
import { computed } from 'vue';

const emit = defineEmits(['next']);
const showPassword = ref<boolean>(false);

const props = defineProps({
    userData: {
        type: Object as () => UserRegister,
        required: true,
    }
});

const company = ref<CompanyRegister>({
    socialReason: '',
    cnpj: '',
    areaOfActivity: '',
});


//validadtions
const socialReasonRules = [
    (v:string) => !!v || 'Razão social é obrigatório',
    (v:string) => v.length > 3 || 'Deve ter no minimo 3 letras',
];

const cnpjRules = [
    (v:string) => !!v || 'CNPJ é obrigatório',
    (v:string) => cnpj.isValid(v) || 'Deve ser um cnpj válido', 
];

const areaOfActivityRules = [
    (v:string) => !!v || 'Área de atuação é obrigatório',
    (v:string) => v.length > 3 || 'Deve ter no minimo 3 letras',
];

const passwordRules = [
    (v:string) => !!v || 'Senha é obrigatório',
    (v:string) => v.length > 6 || 'Deve ter no minimo 6 caracteres',
];

const disableButton = computed(() => {
    const arrayValidations = [
        ...socialReasonRules.map((rule) => rule(company.value.socialReason)), // Substitua 'valueForValidation' pelo valor que deseja validar
        ...cnpjRules.map((rule) => rule(company.value.cnpj)), // Substitua 'valueForValidation' pelo valor que deseja validar
        ...areaOfActivityRules.map((rule) => rule(company.value.areaOfActivity)), // Substitua 'valueForValidation' pelo valor que deseja validar
        ...passwordRules.map((rule) => rule("123464")), // Substitua 'valueForValidation' pelo valor que deseja validar
        props.userData.user.termService 
    ];

    return arrayValidations.every((result) => !result);

})

function clickButton() {
    emit('next');    
}
</script>

<style lang="scss" scoped>
.pwdInput{
    position: relative;

    
   .v-input__icon{
        position: absolute;
        right: 10p;
   }
}
</style>

