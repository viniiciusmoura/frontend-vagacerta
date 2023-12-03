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
                <v-btn v-if="token" color="primary" class="mt-5" @click="maisinfo(candidate.id)" :loading="loading">
                  Mais informações
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>


        <v-dialog v-model="dialog" max-width="600">
          <v-card>
           
           <v-card
             prepend-icon="mdi-home">
             <template v-slot:title>
               Endereço(s)
             </template>

             <v-card-text>
               <v-row v-for="(item, index) in address" :key="item.id" class="pa-2">
                 <h7>{{ `${index+1}° Endereço: ${item.city}, ${item.state}, ${item.neighborhood}
     Complemento: ${item.address}` }}</h7>
               </v-row>
             </v-card-text>
           </v-card>

           <v-card
             prepend-icon="mdi-briefcase">
             <template v-slot:title>
               Experiências
             </template>

             <v-card-text>
               <v-row v-for="(item, index) in xp" :key="item.id" class="pa-2">
                 <h7>{{ `${index+1}°  Empresa: ${item.company} Cargo: ${item.office} ` }} <v-chip color="primary">ver mais</v-chip> </h7>
               </v-row>
             </v-card-text>
           </v-card>
   
         <v-card-actions>
           <v-btn  @click="dialog = false" color="primary" class="ml-auto">Fechar</v-btn>
         </v-card-actions>
       </v-card>
        </v-dialog>

      </v-responsive>
    </v-container>
  </template>
  
<script setup lang="ts">
import addressService from '@/services/address.service';
import candidateService from '@/services/candidate.service';
import experinceService from '@/services/experince.service';
import { AddressType } from '@/types/address.types';
import { CandidateDTO, ExperienceDTO } from '@/types/dtos.types';
import { onMounted } from 'vue';
import { ref } from 'vue';
  
const dialog = ref(false);

const loading = ref<boolean>(false);
const data = ref<CandidateDTO[]>([]);
const address = ref<AddressType[]>([]);
const xp = ref<ExperienceDTO[]>([]);
const token = ref<string|null>();



async function candidates() 
{
  
  const response: any = await candidateService.getAll();
  data.value = response.data;

}

onMounted(() => {
  candidates();
  token.value = localStorage.getItem("user");

})

async function maisinfo(id:number) 
{
  loading.value = true
  const responseAddress: any = await addressService.getAddressCandidate(id);
  const respondeExperience: any = await experinceService.getExperienceUser(id);

  if (responseAddress && respondeExperience) {
    address.value = responseAddress;
    xp.value = respondeExperience;
  }

  loading.value = false
  dialog.value = true
}

function idade(birthdate:string) 
{
  const dn = new Date(birthdate);
  const datual = new Date();
  
  return datual.getFullYear() - dn.getFullYear();
}
</script>
  