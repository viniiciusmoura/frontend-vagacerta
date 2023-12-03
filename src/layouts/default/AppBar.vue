<template>
  <v-app-bar app flat color="primary">
    <v-img to="/candidato" src="@/assets/VagaCerta.png" max-height="120" class="mr-2"></v-img>
    <v-btn
      to="/vagas"
      min-width="164"
      color="primary"
      variant="flat">
      Vagas
    </v-btn>
    <v-btn
      to="/empresas"
      min-width="164"
      color="primary"
      variant="flat">
      Empresas
    </v-btn>
    <v-btn
      to="/candidato"
      min-width="164"
      color="primary"
      variant="flat">
      Candidato
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      to="/register"
      min-width="164"
      color="primary"
      variant="flat">
      <v-icon
        icon="mdi-account-plus"
        size="large"
        start/>
      Cadastrar
    </v-btn>

    <v-menu offset-y rounded>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          min-width="48"
          color="primary"
          variant="flat"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/configuracao-empresa">
          <v-list-item-title>Configuração Empresa</v-list-item-title>
        </v-list-item>
        <v-list-item to="/configuracao-candidato">
          <v-list-item-title>Configuração Candidato</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
  //
</script>
