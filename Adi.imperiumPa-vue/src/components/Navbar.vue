<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookie from 'js-cookie';
import router from '../router';

const nome = ref('');
const cognome = ref('');
const isLoggedIn = ref(false);

const logout = () => {
    Cookie.remove('ASP.NET_SessionId');
    Cookie.remove('LoggedUser');
    Cookie.remove('cognome');
    Cookie.remove('nome');
    Cookie.remove('mail');
    router.push({ name: 'Login' });
    isLoggedIn.value = false;
};

onMounted(() => {
    nome.value = Cookie.get('nome') as string;
    cognome.value = Cookie.get('cognome') as string;
    isLoggedIn.value = !!Cookie.get('LoggedUser');
    console.log(nome.value, cognome.value);
});

</script>

<template>
    <header class="it-header-wrapper">
        <div class="it-nav-wrapper">
            <div class="it-header-center-wrapper">
                
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="it-header-center-content-wrapper">
                                <div class="it-brand-wrapper">
                                    <a href="#">
                                        <span style="font-size: 2rem; margin-right: 15px;"><i class="fas fa-notes-medical"></i></span>
                                        <div class="it-brand-text">
                                            <h2 class="no_toc">A.D.S.A.</h2>
                                            <h3 class="no_toc d-none d-md-block">Assistenza Domiciliare Socio Assistenziale</h3>
                                        </div>
                                    </a>
                                </div>
                                <div v-if="isLoggedIn" class="it-right-zone bg-white p-2"> 
                                    <div class="col col-lg-auto ">
                                        <span>
                                            <router-link class="nav-link" :to="{ name: 'Password' }" id="nlPassword">
                                                <i class="fa-solid fa-user"></i>
                                                <span style="color:black">{{ nome }} {{ cognome }}</span>
                                            </router-link>
                                        </span>
                                    </div>
                                    <div class="col-auto">
                                        <button id="userLogout" class="btn btn-primary btn-sm" @click="logout()"><i class="fas fa-sign-out-alt mr-2" ></i>Esci</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="it-header-navbar-wrapper" id="menuApp">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <nav class="navbar navbar-expand-lg has-megamenu">
                                <button aria-controls="nav10" aria-expanded="false" aria-label="Toggle navigation" class="custom-navbar-toggler" data-target="#nav10" type="button">
                                    <svg class="icon">
                                        <use href="/node_modules/bootstrap-italia/dist/svg/sprites.svg#it-burger"></use>
                                    </svg>
                                </button>
                                <div class="navbar-collapsable" id="nav10">
                                    <div class="overlay"></div>
                                    <div class="close-div sr-only">
                                        <button class="btn close-menu" type="button">
                                            <span class="it-close"></span>close
                                        </button>
                                    </div>
                                    <div class="menu-wrapper" style="justify-content: center;">
                                        <ul class="navbar-nav">
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{ name: 'Dashboard' }" id="nlDashboard">
                                                    <span>Dashboard</span>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{ name: 'Utenti' }" id="nlUtenti">
                                                    <span>Gestione Dipendenti</span>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{ name: 'Pazienti' }" id="nlPazienti">
                                                    <span>Gestione Utenti</span>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{ name: 'Determine' }" id="nlDetermine">
                                                    <span>Gestione Determine</span>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{ name: 'Report' }" id="nlReport">
                                                    <span>Report</span>
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link class="nav-link" :to="{ name: 'Contatti' }" id="nlContatti">
                                                    <span>Contatti</span>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

</template>

<style scoped>

</style>