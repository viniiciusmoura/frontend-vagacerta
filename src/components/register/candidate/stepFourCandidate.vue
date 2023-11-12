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
                            variant="outlined"
                            required />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="experiencie.office"
                            label="Cargo"
                            type="text"
                            variant="outlined"
                            required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            v-model="experiencie.description"
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
                        <v-text-field
                            label="Data de inicio"
                            type="date"
                            variant="outlined"
                            required />
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Data fim"
                            type="date"
                            variant="outlined"
                            required />
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Experience } from '@/types/register.types';

const experiencie = ref<Experience>({
    company: '',
    office: '',
    description: '',
    startDate: '',
    endDate: ''
})
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>