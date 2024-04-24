<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Modal } from 'bootstrap-italia';
import axios from 'axios';
import baseApiCookie from '../plugin/axios';
import Cookie from 'js-cookie';

let modalSoggetti;
let soggetti = ref([]);





let datiSoggetto = {
    cognome: '',
    nome: '',
    codFiscale: '',
    nascita: '',
    telefono: '',
    mail: '',
    societa: '',
    login: false
};

onMounted(async () => {
    modalSoggetti = new Modal(document.getElementById('mdElenco'), {
        keyboard: false
    });
    const res = await baseApiCookie.get("Soggetti/ElencoSoggetti");
    soggetti.value = res.data;
});

</script>
<template>
<div class="row justify-content-center flex-row align-items-center">
        <div class="col-lg-12">
            <div class="card-wrapper card-space">
                <div class="card card-bg" style="border-radius: 20px; box-shadow: 0 10px 25px 0 rgb(0 0 0 / 20%);">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-sm-6 text-left">
                                <h3 class="text-primary mb-0">Gestione Dipendenti</h3>
                            </div>
                            <div class="col-sm-6 text-right">
                                <input type="button" class="btn btn-sm btn-outline-secondary" id="openTabSoggetti" data-target="#mdElenco" data-toggle="modal" value="Elenco Soggetti" @click="modalSoggetti.show()" />
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6 text-left">
                                <h5 class="mb-5 text-left text-primary" id="intestazione">Anagrafica Soggetto</h5>
                            </div>
                            <div class="col-sm-6 text-right">
                                <span class="text-primary" data-toggle="modal" data-target="#openFindSog" style="cursor: pointer">Ricerca Utente</span>
                                <a class="search-link rounded-icon" aria-label="Cerca" href="#" data-toggle="modal" data-target="#openFindSog">
                                    <svg class="icon">
                                        <use href="/node_modules/bootstrap-italia/dist/svg/sprites.svg#it-search"></use></svg>
                                </a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="cSoggetto">Cognome</label>
                                    <input required
                                        autocomplete="off"
                                        value=""
                                        title=""
                                        type="text"
                                        minlength="3"
                                        aria-required="true"
                                        class="form-control text-capitalize"
                                        id="cSoggetto"
                                        name="cSoggetto">
                                    <div class="invalid-feedback">
                                        Immettere un cognome valido.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="nSoggetto">Nome</label>
                                    <input required
                                        autocomplete="off"
                                        value=""
                                        title=""
                                        minlength="3"
                                        type="text"
                                        aria-required="true"
                                        class="form-control text-capitalize"
                                        id="nSoggetto"
                                        name="nSoggetto">
                                    <div class="invalid-feedback">
                                        Immettere un nome valido.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="cfSoggetto">Codice Fiscale</label>
                                    <input 
                                        autocomplete="off"
                                        pattern="^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[A-Za-z0-9]{3}[A-Za-z0-9]{1}"
                                        value=""
                                        title=""
                                        type="text"
                                        aria-required="true"
                                        class="form-control text-uppercase"
                                        id="cfSoggetto"
                                        name="cfSoggetto">
                                    <div id="errCodFiscale" class="invalid-feedback">
                                        Il C.F. inserito non è corretto.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="celSoggetto">Telefono</label>
                                    <input autocomplete="off"
                                        value=""
                                        title=""
                                        type="number"
                                        aria-required="true"
                                        class="form-control onlyNumber"
                                        id="celSoggetto"
                                        name="celSoggetto">
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="prSoggetto" class="active">Profilo</label>
                                    <select class="form-control emptyAutoSelect"
                                        required
                                        aria-required="true"
                                        name="prSoggetto"
                                        id="prSoggetto"
                                        data-noresults-text="Nessun risultato."
                                        autocomplete="off">
                                    </select>
                                    <div class="invalid-feedback">
                                        Selezionare il profilo da associare.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="emSoggetto">Mail</label>
                                    <input required
                                        autocomplete="off"
                                        value=""
                                        title=""
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                        type="text"
                                        aria-required="true"
                                        class="form-control"
                                        id="emSoggetto"
                                        name="emSoggetto">
                                    <div class="invalid-feedback">
                                        E-Mail non valida.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-4 col-lg-4" id="colSocieta">
                                <div class="form-group">
                                    <label for="socSoggetto" class="active">Società</label>
                                    <select class="form-control emptyAutoSelect"
                                        required
                                        aria-required="true"
                                        placeholder="Seleziona Opzione"
                                        name="socSoggetto"
                                        id="socSoggetto"
                                        data-noresults-text="Nessun risultato."
                                        autocomplete="off">
                                    </select>
                                    <div class="invalid-feedback">
                                        Selezionare il la società di appartenenza.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="toggles">
                                    <label for="activeLogin" style="padding-left:.5rem">
                                        Abilita Login
                                    <input type="checkbox" id="activeLogin"><span class="lever"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="col-auto text-center">
                            <button id="saveSoggetto" class="btn btn-primary btn-md"><i class="far fa-share-square mr-2"></i>Salva</button>
                            <button id="resetSoggetto" type="button" class="btn btn-secondary btn-md"><i class="fas fa-redo-alt mr-2"></i>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center flex-row align-items-center h-50">
        <div class="col-lg-12">
            <div class="card-wrapper card-space">
                <div class="card card-bg" style="border-radius: 20px; box-shadow: 0 10px 25px 0 rgb(0 0 0 / 20%);">
                    <div class="card-header">
                        <div>
                            <h3 class="text-primary mb-0">Documenti Soggetto</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row mt-3">
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                <div class="form-group" style="margin-bottom: 2rem">
                                    <label for="tdSoggetto" class="active">Tipo Documento</label>
                                    <select class="form-control emptyAutoSelect"
                                        placeholder="Seleziona Opzione"
                                        name="tdSoggetto"
                                        id="tdSoggetto"
                                        data-noresults-text="Nessun risultato."
                                        autocomplete="off">
                                    </select>
                                    <div id="errTdSoggetto" class="invalid-feedback">
                                        Selezionare il tipo di documento da associare.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-2 text-center">
                                <input type="file" name="upload1" id="loadFileSogg" accept="application/pdf,.png, .tiff, .tif, .jpeg, .jpg, .bmp, .doc, .docx" class="upload" />
                                <label for="loadFileSogg">
                                    <svg class="icon icon-sm" aria-hidden="true">
                                        <use href="/node_modules/bootstrap-italia/dist/svg/sprites.svg#it-upload"></use></svg>
                                    <i class="fas fa-cloud-upload-alt mr-2"></i>
                                    <span>File</span>
                                </label>
                                <div id="errFileSoggetto" class="invalid-feedback" style="margin-top: -10px">
                                    Documento non presente.
                                </div>
                                <div class="progress-bar-wrapper" style="margin-top: -18px; display: none">
                                    <div class="progress-bar-label" id="lbProgressBar" style="font-size: 0.9rem;"><span class="sr-only">Progresso </span>35%</div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="00" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-2 text-center">
                                <input type="button" name="sendFile" id="sendFile" value="Allega Docuento" class="btn btn-outline-primary btn-sm" />
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-12">
                                <table id="tDocSoggetto" class="respTable table" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">Prog.</th>
                                            <th style="width: 20%">Tipo</th>
                                            <th style="width: 55%">Nome Documento</th>
                                            <th style="width: 15%">Rimuovi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="openFindSog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ricerca per Codice Fiscale</h5>
                </div>
                <div class="modal-body mt-4">
                    <div class="col">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span><i class="fas fa-user-alt" style="color: #06c!important"></i></span>
                                    </div>
                                </div>
                                <label for="searchSogg">Ricerca Utente</label>
                                <input autocomplete="off"
                                    value=""
                                    title=""
                                    type="text"
                                    data-noresults-text="Nessuna Corrispondenza"
                                    aria-required="true"
                                    class="form-control text-uppercase basicAutoComplete"
                                    placeholder="Ricerca per Nome, Cognome o Codice Fiscale"
                                    id="searchSogg"
                                    name="searchSogg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary btn-sm" type="button" id="selectFS">Seleziona</button>
                    <button class="btn btn-outline-secondary btn-sm" data-dismiss="modal" type="button">Chiudi</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal alert-modal fade" tabindex="-1" role="dialog" id="openSogExist">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header align-items-center">
                    <svg class="icon">
                        <use href="/node_modules/bootstrap-italia/dist/svg/sprites.svg#it-info-circle"></use>
                    </svg>
                    <h5 class="modal-title">Soggetto già presente</h5>
                </div>
                <div class="modal-body">
                    <div class="col">
                        <p>
                            Il codice fiscale inserito è già presente nel sistema.<br />
                            Richiamarlo?
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary btn-sm" type="button" id="recallSogg">Richiama</button>
                    <button class="btn btn-outline-danger btn-sm" data-dismiss="modal" type="button" id="dismissSE">Annulla</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modale elenco -->
    <div class="modal alert-modal fade" tabindex="-1" role="dialog" id="mdElenco">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Elenco Soggetti</h5>
            </div>
            <div class="modal-body mt-4">
                <div class="col">
                    <table id="tbSoggetti" class="respTable table" style="width: 100%">
                        <thead>
                            <tr>
                                <th style="width: 20%">Cod. Fiscale</th>
                                <th style="width: 30%">Cognome</th>
                                <th style="width: 35%">Nome</th>
                                <th style="width: 15%">Ruolo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="soggetto in soggetti" :key="soggetto.codiceFiscale">
                                <td>{{ soggetto.codiceFiscale }}</td>
                                <td>{{ soggetto.cognome }}</td>
                                <td>{{ soggetto.nome }}</td>
                                <td>{{ soggetto.ruolo }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <div class="modal-footer justify-content-between">
                    <button class="btn btn-outline-secondary btn-sm" data-dismiss="modal" type="button" @click="modalSoggetti.hide()">Chiudi</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

.card-bg {
    background-color: #f8f9fa;
}

.card-space {
    margin-top: 20px;
}

button {
    margin: auto;
    margin-left: 5px;
}




</style>