<template>
    <v-card>
        <v-card-title>
          <span class="headline">Gerar oportunidades</span>
        </v-card-title>

        <v-card-text>
            <v-form>
                <v-row >
                    <v-col>
                        <v-text-field
                            v-model="vacancies.office"
                            label="Cargo"
                            type="text"
                            variant="outlined"
                            required />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="vacancies.salary"
                            label="Salário"
                            type="text"
                            variant="outlined"
                            required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            v-model="vacancies.description"
                            label="Descrição"
                            auto-grow
                            variant="outlined"
                            rows="3"
                            row-height="25"
                            shaped/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-checkbox
                            v-model="vacancies.foodVoucher"
                            label="Vale alimentação" />
                    </v-col>
                    <v-col>
                        <v-checkbox
                            v-model="vacancies.mealVoucher"
                            label="Vale refeição" />
                    </v-col>
                    <v-col>
                        <v-select
                            clearable
                            v-model="vacancies.formContract"
                            label="Forma de contrato"
                            :items="['CLT', 'CNPJ']"
                            variant="outlined" />
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Vacancies } from '@/types/register.types';

const vacancies = ref<Vacancies>({
    office: '',
    description: '',
    salary: 0.00,
    foodVoucher: false,
    mealVoucher: false,
	formContract: '',
})




</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>