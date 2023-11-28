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
                    v-model="userData.user.termUser"
                    :rules="[v => !!v || 'Este campo é obrigatório']"
                    label="Aceito os termos e serviços da vagacerta"
                    color="indigo">
                </v-checkbox>
                <v-checkbox 
                v-model="userData.user.termService"
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

    <m-message v-model="alertMsg" :datamsg=datamsg />
</template>

<script setup lang="ts">
import { CompanyRegister, UserRegister } from '@/types/register.types';
import { ref } from 'vue';
import { cnpj } from 'cpf-cnpj-validator';
import { computed } from 'vue';
import MMessage from '@/components/shared/MMessage.vue';
import companyService from '@/services/company.service';
import userService from '@/services/user.service';
import { Msg } from '@/types/generic.types';


const emit = defineEmits(['next']);
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const datamsg = ref<Msg>({});
const alertMsg = ref<boolean>(false);

const props = defineProps({
    userData: {
        type: Object as () => UserRegister,
        required: true,
    }
});

const company = ref<CompanyRegister>({
    socialReason: '',
    cnpj: '',
    areaOfActivity: ''
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
        ...socialReasonRules.map((rule) => rule(company.value.socialReason)), 
        ...cnpjRules.map((rule) => rule(company.value.cnpj)), 
        ...areaOfActivityRules.map((rule) => rule(company.value.areaOfActivity)), 
        ...passwordRules.map((rule) => rule(props.userData.user.password!)), 
        props.userData.user.termUser
    ];

    return arrayValidations.every(result => result === true);
})

async function clickButton() 
{
    loading.value = true;
    const response:any = await userService.create(props.userData.user);

    const responseToken: any = await userService.login({email: response.data.email, password: props.userData.user.password}); 

    company.value.user = response.data.id;

    const responseCompany:any = await companyService.create(company.value);

    datamsg.value = {message:"Empresa cadastrada com sucesso", color:"success", time: 3000};
    
    alertMsg.value = true;
    loading.value = false;
    emit('next');
    
    // if (response && typeof response === 'object' && 'data' in response) {
    //     //Get token
    //     const responseToken: any = await userService.login({email: response.data.email, password: props.userData.user.password}); 
        
    //     if(responseToken!=null || responseToken.data.token) {
    //         company.value.user = response.data.id;

    //         createCompany(company.value);
    
    //     }
        
        
    // } else {
    //     if(response.response.data.errors.includes("already exists"))
    //         datamsg.value = {message:"Ops! Email já cadastrado", color:"primary", time: 3000};
    //     else
    //         datamsg.value = {message:"Error: "+response.response.data.errors, color:"erromsg", time: 3000};
    // }
   
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

