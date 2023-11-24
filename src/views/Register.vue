<template>
   <v-container max-width="700">
        <v-stepper :model-value="step">
            <v-stepper-header>
                <template v-for="item in steps" :key="item.value">
                    <v-stepper-item
                        :title="item.title"
                        :complete="step > item.value"
                        :step="item.value" 
                        :value="item.value"/>

                    <v-divider class="divider"
                        v-if="item.value !== steps.length"
                        :key="item.value"
                    />
                </template>

            </v-stepper-header>
            
            <v-stepper-window>
                <v-stepper-window-item 
                    v-for="item in stepsItems" 
                    :key="item.value" 
                    :value="item.value">
                    <component 
                        :is="item.componet" 
                        @next="nextStep"
                        :userData=userData />
                    
                </v-stepper-window-item>
            </v-stepper-window>
        </v-stepper>    
   </v-container>
</template>
<script setup lang="ts">

import stepOne from '@/components/register/stepOne.vue';
import stepTwo from '@/components/register/stepTwo.vue';

import stepTheeCandidate from '@/components/register/candidate/stepTheeCandidate.vue';
import stepFourCandidate from '@/components/register/candidate/stepFourCandidate.vue';

import stepTheeCompany from '@/components/register/company/stepTheeCompany.vue';
import stepFourCompany from '@/components/register/company/stepFourCompany.vue';

import { ref } from 'vue';
import { StepItem, StepWindow, UserRegister } from '@/types/register.types';

const step = ref<number>(1);

const userData = ref<UserRegister>({
    typeAccount: null,
    user: {
        email: '',
        typeRegister: '',
        password: '',
        termService: false,
        termUser: true
    }
});


const steps = ref<StepItem[]>([
    {title: "Informação pessoal", value: 1},
    {title: "Tipo de conta", value: 2},
    {title: "Criando a conta", value: 3}
]);

const stepsItems = ref<StepWindow[]>([
    {componet: stepOne, value: 1},
    {componet: stepTwo, value: 2}
])


function nextStep() {
    step.value+=1;

    if (step.value === 3) {
        
        let stepItem: StepItem;
        let stepWindows: StepWindow[] = [];

        if (userData.value.user.typeRegister === 'candidate') {
            stepItem = { title: "Experiência", value: 4 };
            stepWindows = [ { componet: stepTheeCandidate, value: 3 }, { componet: stepFourCandidate, value: 4 } ];
        }

        if (userData.value.user.typeRegister === 'company') {
            stepItem = {title: "Oportunidades", value: 4}; 
            stepWindows = [ { componet: stepTheeCompany, value: 3 }, {componet: stepFourCompany, value: 4} ]
        }    

        addSteps(stepItem, stepWindows);
    } 
}

function addSteps(stepItem:StepItem, stepWindows:StepWindow[]) 
{
    steps.value.push(stepItem);
    stepsItems.value.push(...stepWindows);    
}
</script>
<style>

.divider{
    color: white;
}

.v-stepper-header {
    background: rgb(var(--v-theme-primary));
    color: white;
    font-weight: 500;
}

.v-stepper-item--selected .v-stepper-item__avatar.v-avatar, .v-stepper-item--complete .v-stepper-item__avatar.v-avatar {
    background: white !important;
    color: rgb(var(--v-theme-primary));
    font-weight: 800;
}
@media (min-width: 1280px) {
    .v-container {
        max-width: 850px;
    }
}


</style>