<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center">
        <v-row>
          <v-col v-for="item in data" :key="item.id" cols="4"> 
            <v-card>
              <v-card-title>{{ item.socialReason }}</v-card-title>
              <v-img src="@/assets/oportunidade.png" max-height="50" aspect-ratio="1.5"></v-img> 
              <v-card-text>
                <div>
                  <v-chip>
                    Área atuação
                  </v-chip>
                  {{item.areaOfActivity}}
                </div>
                <div class="mt-2">
                  <v-chip color="primary">
                    CNPJ
                  </v-chip>
                  {{item.cnpj}}
                </div>
                <v-btn v-if="token" color="primary" class="mt-5" @click="maisinfo(item.id)" :loading="loading">
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
                  Vagas
                </template>

                <v-card-text>
                  <v-row v-for="(item, index) in vacancies" :key="item.id" class="pa-2">
                    <h7>{{ `N° ${index+1}  CARGO: ${item.office} SALÁRIO: ${item.salary} ` }} <v-chip color="primary">ver mais</v-chip> </h7>
                  </v-row>
                </v-card-text>
              </v-card>
      
            <v-card-actions>
              <v-btn @click="dialog = false" color="primary" class="ml-auto">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-responsive>
    </v-container>
  </template>
  
<script lang="ts" setup>
import addressService from '@/services/address.service';
import companyService from '@/services/company.service';
import vacanciesService from '@/services/vacancies.service';
import { AddressType } from '@/types/address.types';
import { CompanyDTO } from '@/types/dtos.types';
import { Vacancies } from '@/types/vacancies.types';
import { onBeforeMount } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';


const dialog = ref(false);

const data = ref<CompanyDTO[]>([]);
const loading = ref<boolean>(false);
const address = ref<AddressType[]>([]);
const vacancies = ref<Vacancies[]>([]);

const token = ref<string|null>();

async function companies() 
{
  
  const response: any = await companyService.getAll();
  data.value = response.data;

}

onMounted(() => {
  companies();
  token.value = localStorage.getItem("user");
})



async function maisinfo(id:number) 
{
  loading.value = true
  const responseAddress: any = await addressService.getAddressCompany(id);
  const responseVacancies: any = await vacanciesService.getAllCompany(id);

  if (responseAddress && responseVacancies) {
    address.value = responseAddress;
    vacancies.value = responseVacancies;
  }

  loading.value = false
  dialog.value = true
}

</script>
  