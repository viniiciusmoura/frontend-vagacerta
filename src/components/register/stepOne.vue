<template>
    <v-form fast-fail @submit.prevent class="mt-3">
        <v-text-field
            v-model="userData.user.email"
            label="Email"
            type="email"
            variant="outlined"
            :rules="emailRules"
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
                    Continuar
                <template v-slot:loader>
                    <v-progress-circular indeterminate></v-progress-circular>
                </template>
            </v-btn>
        </v-row>
    </v-form>
</template>
<script setup lang="ts">

import { UserRegister } from '@/types/register.types';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const loading = ref<boolean>(false);

const emit = defineEmits(['next']);

const props = defineProps({
    userData: {
        type: Object as () => UserRegister,
        required: true,
    }
});

const emailRules = [
    (v:string) => !!v || 'Email é obrigatório',
    (v:string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
];

//Check
const disableButton = computed(() => {
    return !emailRules.every((rule) => rule(props.userData.user?.email) === true);
})

function clickButton() {
    loading.value = true;
    emit('next');
}

</script>

