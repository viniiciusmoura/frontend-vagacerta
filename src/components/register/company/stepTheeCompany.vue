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
        <v-row v-if="!$props.company">
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

        <Address v-if="!$props.company" @address="setAddress"/>

        <v-row class="row d-flex mt-5" >
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
                :disabled="props.company ? !disableButtonEdit : !disableButton"
                :loading="loading"
                @click="clickButton">
                {{ !$props.company ? 'Criar conta' : 'Salvar' }}
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
import Address from '@/components/shared/Address.vue';
import { AddressType } from '@/types/address.types';
import addressService from '@/services/address.service';
import { onMounted } from 'vue';


const emit = defineEmits(['next']);
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const datamsg = ref<Msg>({});
const alertMsg = ref<boolean>(false);


const address = ref<AddressType>();
const props = defineProps({
    userData: {
        type: Object as () => UserRegister,
        required: true,
    },
    company: Boolean
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

const disableButtonEdit = computed(() => {

    const arrayValidations = [
        ...socialReasonRules.map((rule) => rule(company.value.socialReason)), 
        ...cnpjRules.map((rule) => rule(company.value.cnpj)), 
        ...areaOfActivityRules.map((rule) => rule(company.value.areaOfActivity)),
    ];

    return arrayValidations.every(result => result === true);
})

async function clickButton() 
{
    loading.value = true;

    if(props.company){
        const responseCompany:any = await companyService.update(company.value);
        if (responseCompany != null) {
            const userDataStore = localStorage.getItem("userData");

            datamsg.value = {message:"Empresa atualizada com sucesso", color:"info", time: 3000};

            alertMsg.value = true;
            loading.value = false;
        }
        return
    }

    console.log("criar user");

    const response:any = await userService.create(props.userData.user);

    const responseToken: any = await userService.login({email: response.data.email, password: props.userData.user.password}); 

    company.value.user = response.data.id;

    const responseCompany:any = await companyService.create(company.value);
    
    if (address?.value !== undefined) {
        address.value.company = responseCompany.data.id;
        const responseAddress: any = await addressService.create(address.value);
    }   

    datamsg.value = {message:"Empresa cadastrada com sucesso", color:"success", time: 3000};
    
    alertMsg.value = true;
    loading.value = false;
    emit('next');
}

function setAddress(addresst:AddressType) 
{
    if (validadtionsAddress(addresst)) {
        address.value = addresst;    
    }
}

function validadtionsAddress(objeto:Object) {
  return Object.values(objeto).every(valor => valor !== '');
}

onMounted(() => {
  const userDataStore = localStorage.getItem("userData");
  
  if (userDataStore) {
    const objetoUser = JSON.parse(userDataStore);

    company.value = objetoUser;
  }

});
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

