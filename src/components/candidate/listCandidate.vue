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
            empresa
          </th>
          <th class="text-left">
            data
          </th>
          <th class="text-left">
            trabalho
          </th>
          <th class="text-left">
            data
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
          <td>{{ item.company }}</td>
          <td>{{ item.endDate }}</td>
          <td>{{ item.office }}</td>
          <td>{{ item.startDate }}</td>
          <td> <v-btn class="ma-2" color="yellow" icon="mdi-pencil"></v-btn> </td>
          <td> <v-btn class="ma-2" color="red" icon="mdi-delete"></v-btn> </td>
        </tr>
      </tbody>
    </v-table>
  </template>
<script setup lang="ts">
import { ref } from 'vue';
import { Experience } from '../../types/register.types';
const data = ref<Experience[]>([
    {
        description:"aaaa",
        company:"aaaa",
        endDate:"aaaaa",
        office:"aaaaa",
        startDate:"aaaaaaa"
    }
]);

</script>

