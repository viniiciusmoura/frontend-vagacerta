<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <v-row>
          <v-col v-for="candidate in data" :key="candidate.id" cols="4"> 
            <v-card>
              <v-card-title>{{ candidate.name }}</v-card-title>
              <v-img src="@/assets/oportunidade.png" max-height="50" aspect-ratio="1.5"></v-img> 
              <v-card-text>
                <div>
                  Sexo
                  <v-chip>
                    {{ candidate.sex }}
                  </v-chip>
                </div>
                <div class="mt-2">
                  Idade
                  <v-chip color="primary">
                    {{ idade(candidate.birthdate) }}
                  </v-chip>
                </div>
                <v-btn color="primary" class="mt-5" @click="dialog = true">
                  Mais informações
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title >Detalhes do candidato</v-card-title>
            <v-card-text>
              Detalhes da vaga aqui.
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialog = false" color="primary" class="ml-auto">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-responsive>
    </v-container>
  </template>
  
<script setup lang="ts">
import candidateService from '@/services/candidate.service';
import { CandidateDTO } from '@/types/dtos.types';
import { onMounted } from 'vue';
import { ref } from 'vue';
  
const dialog = ref(false);


const data = ref<CandidateDTO[]>([]);

async function candidates() 
{
  
  const response: any = await candidateService.getAll();
  data.value = response.data;

}

onMounted(() => {
  candidates();
})

function idade(birthdate:string) 
{
  const dn = new Date(birthdate);
  const datual = new Date();
  
  return datual.getFullYear() - dn.getFullYear();
}
</script>
  