<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { loadFonts } from 'bootstrap-italia';

loadFonts('/node_modules/bootstrap-italia/dist/fonts');


</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <div>
    <section>
      <header>
      <Navbar />
    </header>
    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
    <footer class="fixed-footer">
      <Footer />
    </footer>
  </section>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 100vh;
}

</style>