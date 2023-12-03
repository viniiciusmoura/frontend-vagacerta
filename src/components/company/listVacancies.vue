<template>
    <v-btn color="primary"
      append-icon="mdi-plus"
    >
      Adicionar
    
    </v-btn>
    <v-table theme="light">
      <thead>
        <tr>
          <th class="text-left">
            Descriçao
          </th>
          <th class="text-left">
            Vale
          </th>
          <th class="text-left">
            Contrato
          </th>
          <th class="text-left">
            vale
          </th>
          <th class="text-left">
            Escritorio
          </th>
          <th class="text-left">
            Salario
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
          <td>{{ item.foodVoucher }}</td>
          <td>{{ item.formContract }}</td>
          <td>{{ item.mealVoucher }}</td>
          <td>{{ item.office }}</td>
          <td>{{ item.salary }}</td>
          <td> <v-btn class="ma-2" color="yellow" icon="mdi-pencil"></v-btn> </td>
          <td> <v-btn class="ma-2" color="red" icon="mdi-delete"></v-btn> </td>
        </tr>
      </tbody>
    </v-table>
  </template>
<script setup lang="ts">
import { ref } from 'vue';
import { Vacancies } from '../../types/register.types';
const data = ref<Vacancies[]>([
    {
        description:"aaaa",
        foodVoucher:true,
        formContract:"aaa",
        mealVoucher:false,
        office:"aaaaa",
        salary:11111
    }
]);

</script>

