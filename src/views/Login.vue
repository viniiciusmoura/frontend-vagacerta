<template>
    <v-container >
        <h2>Fazer login</h2>
        <v-form fast-fail @submit.prevent class="mt-3">
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                :rules="emailRules"
                required />
            <v-text-field
                v-model="password"
                label="Senha"
                class="pwdInput mt-2"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
                @click:append="showPassword=!showPassword"
                :rules="passwordRules"
                variant="outlined"
                required />

            <v-row class="d-flex justify-center align-center mb-4 mt-4">    
                <v-btn
                    color="primary"
                    min-width="250"
                    elevation="2"
                    :disabled="disableButton"
                    :loading="loading"
                    @click="clickButton"
                    variant="flat">
                        Fazer login
                    <template v-slot:loader>
                        <v-progress-circular indeterminate></v-progress-circular>
                    </template>
                </v-btn>
            </v-row>
        </v-form>
    </v-container>

    <m-message v-model="alertMsg" :datamsg=datamsg />

</template>
<script setup lang="ts">
import userService from '@/services/user.service';
import { UserRegister } from '@/types/register.types';
import { Msg } from '@/types/generic.types';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import MMessage from '@/components/shared/MMessage.vue';
import { useRouter } from 'vue-router';


const loading = ref<boolean>(false);
const alertMsg = ref<boolean>(false);
const datamsg = ref<Msg>({});
const showPassword = ref<boolean>(false);
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');

const emit = defineEmits(['next']);

const props = defineProps({
    userData: {
        type: Object as () => UserRegister,
        required: true,
    }
});


//validadtions
const passwordRules = [
    (v:string) => !!v || 'Senha é obrigatório',
    (v:string) => v.length > 6 || 'Deve ter no minimo 6 caracteres',
];

const emailRules = [
    (v:string) => !!v || 'Email é obrigatório',
    (v:string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
];

//Check
const disableButton = computed(() => {
    const arrayValidations = [
        ...emailRules.map((rule) => rule(email.value)),
        ...passwordRules.map((rule) => rule(password.value))
    ];

    return !arrayValidations.every(result => result === true);
})

async function clickButton() {
    loading.value = true;

    const response: any = await userService.login({email: email.value, password: password.value})
    if (response) {
        router.push('/').then(() => {
            window.location.reload(); // Recarrega a página
        });
    }else{
        datamsg.value = {message:"Credenciais incorretas. Favor conferir", color:"erromsg", time: 3000};
        alertMsg.value = true   
    }
    loading.value = false;
    
}

</script>

<style scoped>
@media (min-width: 1280px) {
    .v-container {
        max-width: 500px;
    }
}
</style>