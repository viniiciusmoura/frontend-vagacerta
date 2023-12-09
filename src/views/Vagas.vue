<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">

        <div v-if="token">
        <v-row class="pa-5">
          <h3>Filtros de pesquisa</h3>
        </v-row>

        <v-row class="pa-2">
          <v-col cols="4">
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-text-field
                :loading="loadingSearch"
                color="info"
                v-model="valueSelect"
                variant="outlined"
                label="Pesquisar nas empresas"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
              ></v-text-field>
            </v-card>
          </v-col>
        </v-row>
        </div>


        <v-row>
          <v-col v-for="i in data" :key="i.id" cols="4"> 
            <v-card>
              <v-card-title>{{ i.office }}</v-card-title>
              <v-img src="@/assets/oportunidade.png" max-height="50" aspect-ratio="1.5"></v-img> 
              <v-card-text>
                <div>
                  {{ i.description }}
                </div>
                <div>
                  Salário: {{i.salary}}
                </div>
                <v-btn v-if="token" color="primary"  @click="maisinfo(i)" :loading="loading">
                  Mais informações
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title >Detalhes da Vaga</v-card-title>
            <v-card-text>
              <h4>Cargo: {{ details?.office }}</h4><br>
              <h4>Empresa: {{ details?.company?.socialReason }}</h4>
              <v-chip color="success"
                v-if="details?.foodVoucher">
                Vale-alimentação
              </v-chip>

              <v-chip color="success"
                v-if="details?.mealVoucher">
                Vale-Refeição
              </v-chip>
              <br>
              Descrição: {{ details?.description }}<br>
              Salario: R$ {{ details?.salary }}
              <v-chip color="primary">
                {{details?.formContract}}
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialog = false" color="primary" class="ml-auto">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-responsive>
    </v-container>
  </template>
  
<script lang="ts" setup>
import vacanciesService from '@/services/vacancies.service';
import { CompanyRegister } from '@/types/register.types';
import { Vacancies } from '@/types/vacancies.types';
import { onMounted, watch } from 'vue';
import { ref } from 'vue';

const loading = ref<boolean>(false);
const dialog = ref(false);
const data = ref<Vacancies[]>([]);
const details = ref<Vacancies>();
const token = ref<string|null>();
const loadingSearch = ref<boolean>(false);
const valueSelect = ref<string>('');



async function vacancies() 
{
  const response: any = await vacanciesService.getAll();
  
  if (response) {
    data.value = response;
  }
}

onMounted(() =>{
  vacancies();
  token.value = localStorage.getItem("user");
})

async function maisinfo(company:Vacancies) 
{
  loading.value = true
  
  details.value = company

  loading.value = false
  dialog.value = true
}

async function onClick() {
  loadingSearch.value = true;
  const responseEmp:any = await vacanciesService.getOffice(valueSelect.value);
  data.value = responseEmp  
  loadingSearch.value = false
}

</script>
  