<template>
    <h4>>> Minhas vagas</h4>

    <v-btn color="primary"
      class="align-center"
      @click="createVacancie"
      append-icon="mdi-plus">
      Adicionar
    </v-btn>
    <v-table theme="light">
      <thead>
        <tr>
          <th class="text-left">
            Descriçao
          </th>
          <th class="text-left">
            Contrato
          </th>
          <th class="text-left">
            Vale-alimentação
          </th>
          <th class="text-left">
            Vale-refeição
          </th>
          <th class="text-left">
            Cargo
          </th>
          <th class="text-left">
            Salário
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.id"
        >
          <td>{{ item.description }}</td>
          <td>{{ item.formContract }}</td>
          <td >
            <v-chip
              :color="item.foodVoucher ? 'success' : 'red'">
              {{item.foodVoucher ? 'sim' : 'não'}}
            </v-chip>
          </td>
          <td>
            <v-chip
              :color="item.mealVoucher ? 'success' : 'red'">
              {{ item.mealVoucher ? 'sim' : 'não' }}
            </v-chip>
          </td>
          <td>{{ item.office }}</td>
          <td>{{ item.salary }}</td>
          <td> <v-btn class="ma-2" color="yellow" icon="mdi-pencil" @click="editarVacancie(item)" ></v-btn> </td>
          <td> <v-btn class="ma-2" color="red" icon="mdi-delete" @click="deleteVacancie(item.id)"></v-btn> </td>
        </tr>
      </tbody>
    </v-table>
      <dialog-vacancie v-model="edit" :op="op" :vacancies="vacancie" @exitModal="exitModal" />
    <m-message :datamsg="datamsg" v-model="alertMsg" />
  </template>
<script setup lang="ts">
import { ref } from 'vue';
import { UserRegister, Vacancies } from '../../types/register.types';
import companyService from '@/services/company.service';
import vacanciesService from '@/services/vacancies.service';
import { onMounted } from 'vue';
import MMessage from '../shared/MMessage.vue';
import { Msg } from '@/types/generic.types';
import dialogVacancie from './dialogVacancie.vue';

const data = ref<Vacancies[]>([]);
const datamsg = ref<Msg>({});
const edit = ref<boolean>(false)
const alertMsg = ref<boolean>(false);
const vacancie = ref<Vacancies|{}>();
const op = ref<string>('');
const idCompany = ref<number>();

async function vacancies(id:number) 
{
  const response: any = await vacanciesService.getAllCompany(id);
  data.value = response;
}

async function deleteVacancie(id:number|undefined) 
{
  if(id != undefined){
    const response: any = await vacanciesService.delete(id);
    if (response === 200) {
      data.value = data.value.filter(vaga => vaga.id !== id);
    }
  }
}

function editarVacancie(item:Vacancies) {
  op.value = 'editar';
  vacancie.value = item;
  edit.value = true;
}

function createVacancie() {
  op.value = 'criar';
  vacancie.value = {};
  edit.value = true;
}

function exitModal() {
  op.value = '';
  edit.value = false;
  if (idCompany.value != undefined) {
    vacancies(idCompany.value);
  }
}

onMounted(() => {
  
  const userDataStore = localStorage.getItem("userData");
  
  if (userDataStore) {
    const objetoUser = JSON.parse(userDataStore);
    idCompany.value = objetoUser.id;
    vacancies(objetoUser.id);
  }
})
</script>

