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
                            v-model="experiencie.startDate"
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
                <v-row class="d-flex justify-center align-center mb-2 mt-4">
                    <v-btn
                        min-width="250"
                        elevation="2"
                        color="primary"
                        variant="flat"
                        :disabled="!disableButton"
                        :loading="loading"
                        @click="clickButton">
                        {{ !$props.experience ? 'Cadastrar' : 'Editar'}}
                        <template v-slot:loader>
                            <v-progress-circular indeterminate></v-progress-circular>
                        </template>
                    </v-btn>
                </v-row>   
                <v-row class="d-flex justify-center align-center">
                    <v-btn
                        v-if="!$props.experience"
                        @click="pular"
                        min-width="250"
                        color="primary"
                        variant="outlined">
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
import { Experience } from '@/types/register.types';
import { computed } from '@vue/reactivity';
import experinceService from '@/services/experince.service';
import { Msg } from '@/types/generic.types';
import MMessage from '@/components/shared/MMessage.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const loading = ref<boolean>(false);
const datamsg = ref<Msg>({});
const alertMsg = ref<boolean>(false);
const router = useRouter();

const props = defineProps({
    experience: {
        type: Object as () => Experience
    }
})

const experiencie = ref<Experience>({
    company: '',
    office: '',
    description: '',
    startDate: '',
    endDate: ''
})

const isValidRules = [
    (v:string) => !!v || 'Razão social é obrigatório',
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

async function clickButton() 
{
    loading.value = true

    const response: any = await experinceService.create(experiencie.value);
    if(response){
        if(props.experience){
            datamsg.value = {message:"Oportunidade alterada com sucesso", color:"info", time: 3000};
        }else{
            datamsg.value = {message:"Oportunidade cadastrada com sucesso", color:"success", time: 3000};
        }
        alertMsg.value = true;
    }
    
    loading.value = false;
}

function pular() {
    router.push('/').then(() => {
    window.location.reload(); // Recarrega a página
  });
}

onMounted(() => {
  const userDataStore = localStorage.getItem("userData");
  
    if (props.experience) {
        experiencie.value = props.experience;
    }
  
    if (userDataStore) {
        const objetoUser = JSON.parse(userDataStore);
        experiencie.value.candidate = objetoUser.id;
    }

});
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>