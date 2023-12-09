<template>
  <h4>>> Minhas Experiêcias</h4>
    <v-btn color="primary"
      append-icon="mdi-plus"
      @click="createXP"
    >
      Adicionar
    
    </v-btn>
    <v-table theme="light">
      <thead>
        <tr>
          <th class="text-left">
            Cargo
          </th>
          <th class="text-left">
            Empresa
          </th>
          <th class="text-left">
            Descrição
          </th>
          <th class="text-left">
            Período
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
          <td>{{ item.office }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.startDate }} à {{ item.endDate }}</td>
          <td> <v-btn class="ma-2" color="yellow" icon="mdi-pencil" @click="editExperience(item)"></v-btn> </td>
          <td> <v-btn class="ma-2" color="red" icon="mdi-delete" @click="deleteExperience(item.id)"></v-btn> </td>
        </tr>
      </tbody>
    </v-table>

    <dialog-candidate v-model="edit" :op="op" :experience=experience @exitModal="exitModal"/>
  </template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Experience } from '../../types/register.types';
import experinceService from '@/services/experince.service';
import DialogCandidate from './dialogCandidate.vue';

const idCandidate = ref<number>();

const data = ref<Experience[]>([]);

const experience = ref<Experience>();
const edit = ref<boolean>(false)
const op = ref<string>('')

async function experiencie(id:number) 
{
  const response: any = await experinceService.getExperienceUser(id);
  data.value = response;
}

async function deleteExperience(id:number|undefined) 
{
  if(id != undefined){
    const response: any = await experinceService.delete(id);
    if (response === 200) {
      data.value = data.value.filter(xp => xp.id !== id);
    }
  }
}


function editExperience(xp:Experience)
{
  op.value = 'editar';
  experience.value = xp;
  edit.value = true;
}

function createXP() {
  op.value = 'create';
  edit.value = true;
}

onMounted(() => {
  
  const userDataStore = localStorage.getItem("userData");
  
  if (userDataStore) {
    const objetoUser = JSON.parse(userDataStore);
    idCandidate.value = objetoUser.id;
    experiencie(objetoUser.id);
  }
})

function exitModal() {
  edit.value = false;
  op.value = '';
  if (idCandidate.value != undefined) {
    experiencie(idCandidate.value);
  }
}
</script>

