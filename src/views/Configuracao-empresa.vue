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
            title="Usuário"
            :subtitle="userData.user.email"
            two-line
          >
          </v-list-item>

          <v-list-item @click="componetIsCurrent(tabela)" prepend-icon="mdi-briefcase" title="Minhas vagas" value="minhavaga"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item  @click="componetIsCurrent(stepTheeCompany)"  prepend-icon="mdi-account-edit" title="Meu perfil" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-home-edit" title="Meu endereço" value="shared" @click="componetIsCurrent(address)"></v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="exitAccount" prepend-icon="mdi-exit-to-app" title="Sair" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 800px">
        <v-container>
          <component :is="current" :company="true" :userData=userData />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import tabela from '@/components/company/listVacancies.vue';
import address from '@/components/ListAddress.vue';
import exitService from '@/services/exit.service';
import { ref } from 'vue';
import stepTheeCompany from '@/components/register/company/stepTheeCompany.vue';
import {CompanyRegister, UserRegister } from '@/types/register.types';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const current = ref<any>(tabela);

const idCompany = ref<Number>();
const router = useRouter();
const company = ref<CompanyRegister>();

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

onMounted(() => {
  const userDataStore = localStorage.getItem("userData");
  
  if (userDataStore) {
    const objetoUser = userData ? JSON.parse(userDataStore) : {}
    
    userData.value.user.id = objetoUser.id;
    userData.value.user.email = objetoUser.user.email;
  }else{
    router.push('/');
  }

});

function exitAccount() {
  exitService.exitUser()
  router.push('/').then(() => {
    window.location.reload(); // Recarrega a página
  });
}

</script>
