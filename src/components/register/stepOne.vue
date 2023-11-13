<template>
    <v-form fast-fail @submit.prevent class="mt-3">
        <v-text-field
            v-model="userData.email"
            label="Email"
            type="email"
            variant="outlined"
            :rules="emailRules"
            required />

        <v-btn
            class="mt-4"
            min-width="164"
            color="primary"
            :disabled="disableButton"
            @click="clickButton"
            variant="flat">
                Continuar
        </v-btn>
    </v-form>
</template>
<script setup lang="ts">

import { User } from '@/types/user.types';
import { computed } from '@vue/reactivity';

const emit = defineEmits(['next']);

const props = defineProps({
    userData: {
        type: Object as () => User,
        required: true,
    }
});


const emailRules = [
    (v:string) => !!v || 'Email é obrigatório',
    (v:string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
];

//Check
const disableButton = computed(() => {
    return !emailRules.every((rule) => rule(props.userData?.email) === true);
})

function clickButton() {
    emit('next');
}

</script>