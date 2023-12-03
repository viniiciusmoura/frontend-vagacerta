<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://static.thenounproject.com/png/1819843-200.png"
            title="NOME"
            subtitle="EMAIL@gmailcom"
            two-line
          >
            <v-list-item-subtitle>CNPJ</v-list-item-subtitle>
          </v-list-item>

          <v-list-item @click="componetIsCurrent(tabela)" prepend-icon="mdi-briefcase" title="Minhas vagas" value="minhavaga"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item  @click="componetIsCurrent(stepTheeCompany)"  prepend-icon="mdi-account-edit" title="Meu perfil" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-home-edit" title="Meu endereço" value="shared"></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-exit-to-app" title="Sair" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 800px">
        <v-container>
          <component :is="current" :userData=userData />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import tabela from '@/components/company/listVacancies.vue';
import { ref } from 'vue';
import stepTheeCompany from '@/components/register/company/stepTheeCompany.vue';
import {UserRegister } from '@/types/register.types';

const current=ref<any>();

const userData = ref<UserRegister>({
    typeAccount: null,
    user: {
        email: '',
        typeRegister: '',
        password: '',
        termService: false,
        termUser: true
    }
});

function componetIsCurrent(componet:any){
  current.value=componet

}
</script>
