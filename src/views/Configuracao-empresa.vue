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
            title="EMPRESA"
            subtitle="CNPJ"
            
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="showContent('Meu perfil')" prepend-icon="mdi-account-edit" title="Meu perfil" value="meuperfil"></v-list-item>
          <v-list-item @click="showContent('Meu endereço')" prepend-icon="mdi-home-edit" title="Meu endereço" value="meuendereco"></v-list-item>
          <v-list-item @click="showContent('Minhas vagas')" prepend-icon="mdi-briefcase" title="Minhas vagas" value="minhavaga"></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-exit-to-app" title="Sair" value="sair"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 800px">
        <v-container v-if="selectedContent">
          <v-layout align-center justify-center>
            <v-text-display1>{{ selectedContent }}</v-text-display1>
          </v-layout>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selectedContent: null,
    };
  },
  methods: {
    showContent(content) {
      this.selectedContent = content;
    },
  },
};
</script>
