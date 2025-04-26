<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <router-link to="/home">Volver al inicio</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.not-found p {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.not-found a {
  font-size: 1.2em;
  color: #42b983;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
