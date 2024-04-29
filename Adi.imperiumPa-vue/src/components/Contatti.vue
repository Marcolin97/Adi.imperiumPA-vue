<script setup lang="ts">
import { onMounted, ref } from 'vue';
  import Cookies from 'js-cookie';

const richiesta = ref({
  userMail: '',
  oggettoRichiesta: '',
  descrizioneRichiesta: '',
  utente: '',
});

const SendRichiesta = () => {
  console.log({
    userMail: richiesta.value.userMail,
    oggettoRichiesta: richiesta.value.oggettoRichiesta,
    descrizioneRichiesta: richiesta.value.descrizioneRichiesta,
    utente: richiesta.value.utente,
  });
};

onMounted(() => {
  richiesta.value.userMail = Cookies.get('mail') as string;
  richiesta.value.utente = Cookies.get('nome') as string;
});
  
</script>


<template>
    <div id="contatti">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card-wrapper card-space">
            <div class="card card-bg">
              <div class="card-body">
                <h5 class="card-title">Assistenza</h5>
                <p class="card-text">Compilare la form seguente per comunicare all'assistenza eventuali mal funzionamenti e/o richiesta di assistenza per l'utilizzo dell'applicativo.</p>
                <div class="row pt-4">
                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
                      <label for="destinatario">Mittente</label>
                      <input type="text"
                        readonly="readonly"
                        autocomplete="off"
                        v-model="richiesta.userMail"
                        class="form-control"
                        id="destinatario">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
                      <label for="oggettoAssistenza">Oggetto</label>
                      <input type="text"
                        autocomplete="off"
                        v-model="richiesta.oggettoRichiesta"
                        class="form-control"
                        id="oggettoAssistenza">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-8 col-lg-8">
                    <div class="form-group">
                      <label for="descrizione">Descrizione</label>
                      <textarea id="descrizione" v-model="richiesta.descrizioneRichiesta" rows="3"></textarea>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-sm-12 text-center">
                    <button id="sendRichiesta" @click="SendRichiesta()" type="button" class="btn btn-primary btn-sm"><i class="far fa-envelope mr-2"></i>Inoltra</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
