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
  </v-app-bar>

  
</template>

<script lang="ts" setup>
  //
</script>
