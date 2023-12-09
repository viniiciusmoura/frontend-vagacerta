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
              :subtitle="candidateUser?.name"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item @click="componetIsCurrent(stepTheeCompany)" prepend-icon="mdi-account-edit" title="Meu perfil" value="meuperfil"></v-list-item>
            <v-list-item  prepend-icon="mdi-home-edit" @click="componetIsCurrent(ListAddress)" title="Meu endereço" value="meuendereco"></v-list-item>
            <v-list-item @click="componetIsCurrent(tabela)" prepend-icon="mdi-briefcase" title="Minha experiecia" value="Minhaexperiecia"></v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="exitAccount" prepend-icon="mdi-exit-to-app" title="Sair" value="sair"></v-list-item>
          </v-list>
        </v-navigation-drawer>
  
        <v-main style="height: 800px">
        <v-container>
          <component :is="current" :candidate="true" :userData=candidateUser />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
  
  <script setup lang="ts">
import tabela from '@/components/candidate/listCandidate.vue';
import { ref } from 'vue';
import stepTheeCompany from '@/components/register/candidate/stepTheeCandidate.vue';
import exitService from '@/services/exit.service';
import { useRouter } from 'vue-router';
import ListCandidate from '@/components/candidate/listCandidate.vue';
import ListAddress from '@/components/ListAddress.vue';
import { onMounted } from 'vue';
import { CandidateDTO } from '@/types/dtos.types';

const router = useRouter();
const current=ref<any>(ListCandidate);

const candidateUser = ref<CandidateDTO>(); 

function componetIsCurrent(componet:any){
  current.value=componet
}

onMounted(() => {
  const userDataStore = localStorage.getItem("userData");
  
  if (userDataStore) {
    const objetoUser = candidateUser ? JSON.parse(userDataStore) : {}
    candidateUser.value = objetoUser;
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