<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Modal } from 'bootstrap-italia';
import Cookie from 'js-cookie';
import baseApiCookie from '../plugin/axios';

let modalPazienti;

const elencoPazienti = ref([]);

const elencoTipologiaPazienti = ref([]);
const elencoStatocivile = ref([]);
const elencoTipoOccupazione = ref([]);
const elencoTipoFondi = ref([]);


let paziente = ref({
    "comune": "",
    "municipalita": "",
    "tipologia": "",
    "nome": "",
    "cognome": "",
    "codFiscale": "",
    "nascita": "",
    "codStatoCiv": "",
    "codTipoOcc": "",
    "viveSolo": false,
    "is104": false,
    "isValUvi": false,
});

const savePaziente = async () => {
    let pazienteString = JSON.stringify(paziente.value);
    Cookie.set('paziente', pazienteString);
}

const resetPaziente = () => {
    paziente.value = {
        "comune": "",
        "municipalita": "",
        "tipologia": "",
        "nome": "",
        "cognome": "",
        "codFiscale": "",
        "nascita": "",
        "codStatoCiv": "",
        "codTipoOcc": "",
        "viveSolo": false,
        "is104": false,
        "isValUvi": false,
    };
}



onMounted (async () => {
    modalPazienti = new Modal(document.getElementById('mdElenco'), {
        keyboard: false
    });
    const res = await baseApiCookie.get("Pazienti/ElencoPazienti");
    elencoPazienti.value = res.data;
    const res1 = await baseApiCookie.get("Dizionari/TipologiaPaziente");
    elencoTipologiaPazienti.value = res1.data;
    const res2 = await baseApiCookie.get("Dizionari/StatoCivile");
    elencoStatocivile.value = res2.data;
    const res3 = await baseApiCookie.get("Dizionari/Occupazione");
    elencoTipoOccupazione.value = res3.data;
    const res4 = await baseApiCookie.get("Dizionari/Fondo");
    elencoTipoFondi.value = res4.data;
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
                                <h3 class="text-primary mb-0">Gestione Pazienti</h3>
                            </div>
                            <div class="col-sm-6 text-right">
                                <input type="button" class="btn btn-sm btn-outline-secondary" id="openTabSoggetti" data-target="#mdElenco" data-toggle="modal" value="Elenco Pazienti" @click="modalPazienti.show()"/>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <!-- INIZIO Anagrafica Paziente -->
                        <div class="row">
                            <div class="col-sm-6 text-left">
                                <h5 class="mb-5 text-left text-primary" id="intestazione">Anagrafica Pazienti</h5>
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
                                    <label for="comSoggetto" class="active">Comune</label>
                                    <input type="text" class="form-control"
                                        required
                                        v-model="paziente.comune"
                                        aria-required="true"
                                        placeholder="Seleziona Opzione"
                                        name="comSoggetto"
                                        id="comSoggetto"
                                        autocomplete="off">
                                    <div class="invalid-feedback">
                                        Selezionare il comune dell'utente.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="munSoggetto" class="active">Municipalità/Circoscrizione</label>
                                    <input type="text" class="form-control"
                                        required
                                        v-model="paziente.municipalita"
                                        aria-required="true"
                                        placeholder="Seleziona Opzione"
                                        name="munSoggetto"
                                        id="munSoggetto"
                                        autocomplete="off">
                                    <div class="invalid-feedback">
                                        Selezionare la municipalità/circoscrizione dell'utente.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="tpSoggetto" class="active">Tipologia Utente</label>
                                    <select class="form-control emptyAutoSelect"
                                        required
                                        aria-required="true"
                                        placeholder="Seleziona Opzione"
                                        name="tpSoggetto"
                                        id="tpSoggetto"
                                        data-noresults-text="Nessun risultato."
                                        autocomplete="off">
                                        <option v-for="tp in elencoTipologiaPazienti" :key="tp.codice" :value="tp.codice">{{ tp.descrizione }}</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Selezionare la tipologia dell'utente.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="cSoggetto">Cognome</label>
                                    <input required
                                        v-model="paziente.cognome"
                                        autocomplete="off"
                                        title=""
                                        type="text"
                                        minlength="3"
                                        aria-required="true"
                                        class="form-control text-capitalize"
                                        id="cSoggetto"
                                        placeholder="Cognome"
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
                                        v-model="paziente.nome"
                                        autocomplete="off"
                                        title=""
                                        minlength="3"
                                        type="text"
                                        aria-required="true"
                                        class="form-control text-capitalize"
                                        placeholder="Nome"
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
                                    <input required
                                        v-model="paziente.codFiscale"
                                        autocomplete="off"
                                        pattern="^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[A-Za-z0-9]{3}[A-Za-z0-9]{1}"
                                        title=""
                                        type="text"
                                        aria-required="true"
                                        class="form-control text-uppercase"
                                        id="cfSoggetto"
                                        placeholder="Codice Fiscale"
                                        name="cfSoggetto">
                                    <div id="errCodFiscale" class="invalid-feedback">
                                        Il C.F. inserito non è corretto.
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="dnSoggetto">Data di Nascita</label>
                                    <input required
                                        v-model="paziente.nascita"
                                        autocomplete="off"
                                        title=""
                                        type="text"
                                        min="1900-01-01"
                                        max="5000-12-31"
                                        aria-required="true"
                                        id="dnSoggetto"
                                        class="form-control"
                                        onfocus="(this.type='date')"
                                        onblur="if(this.value==''){this.type='text'}"
                                        placeholder="Data di Nascita"
                                        name="dnSoggetto">
                                    <div class="invalid-feedback">
                                        Immettere la data di nascita dell'utente.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="stSoggetto" class="active">Stato Civile</label>
                                    <select class="form-control emptyAutoSelect"
                                        required
                                        aria-required="true"
                                        placeholder="Seleziona Opzione"
                                        name="stSoggetto"
                                        id="stSoggetto"
                                        data-noresults-text="Nessun risultato."
                                        autocomplete="off">
                                        <option v-for="st in elencoStatocivile" :key="st.codice" :value="st.codice">{{ st.descrizione }}</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Selezionare lo stato civile da associare.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="toSoggetto" class="active">Occupazione</label>
                                    <select class="form-control emptyAutoSelect"
                                        required
                                        aria-required="true"
                                        placeholder="Seleziona Opzione"
                                        name="toSoggetto"
                                        id="toSoggetto"
                                        data-noresults-text="Nessun risultato."
                                        autocomplete="off">
                                        <option v-for="to in elencoTipoOccupazione" :key="to.codice" :value="to.codice">{{ to.descrizione }}</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Selezionare la tipologia di occupazione.
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group" style="margin-bottom: 1rem">
                                    <div class="form-check">
                                        <input type="checkbox" id="viveSolo" v-model="paziente.viveSolo">
                                        <label for="viveSolo">Vive Solo</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group" style="margin-bottom: 1rem">
                                    <div class="form-check">
                                        <input type="checkbox" id="legge104" v-model="paziente.is104">
                                        <label for="legge104">Legge 104</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group" style="margin-bottom: 1rem">
                                    <div class="form-check">
                                        <input type="checkbox" id="isUvi" v-model="paziente.isValUvi">
                                        <label for="isUvi">Valutato UVI</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row justify-content-center" style="margin-bottom: 3rem">
                            <div class="col-auto text-center">
                                <button id="saveSoggetto" class="btn btn-primary btn-md" @click=savePaziente()><i class="far fa-share-square mr-2"></i>Salva</button>
                                <button id="resetSoggetto" type="button" class="btn btn-secondary btn-md" @click="resetPaziente()"><i class="fas fa-redo-alt mr-2"></i>Reset</button>
                            </div>
                        </div>
                        <!-- FINE Anagrafica Paziente -->
                        <!-- INIZIO Uvi Paziente -->
                        <div class="row" id="rowUvi">
                            <div class="col-sm-12 text-left">
                                <h5 class="mb-5 text-left text-primary">Valutazione U.V.I.</h5>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group" data-source="fondo">
                                    <label for="tfSoggetto" class="active">Tipologia Fondo</label>
                                    <select data-source="fondo" class="form-control emptyAutoSelect"
                                        placeholder="Seleziona Opzione"
                                        name="tfSoggetto"
                                        id="tfSoggetto"
                                        data-noresults-text="Nessun risultato."
                                        autocomplete="off">
                                    </select>
                                    <div id="errTfSoggetto" class="invalid-feedback">
                                        Selezionare la tipologia di fondo.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="protUvi">Protocollo UVI</label>
                                    <input autocomplete="off"
                                        data-source="nrProtUvi"
                                        value=""
                                        title=""
                                        type="number"
                                        min="1"
                                        max="999999"
                                        class="form-control onlyNumber"
                                        id="protUvi"
                                        placeholder="Protocollo U.V.I."
                                        name="protUvi">
                                    <div id="errProtUvi" class="invalid-feedback">
                                        Immettere in numero di protocollo UVI.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="dataUVI">Data U.V.I.</label>
                                    <input autocomplete="off"
                                        data-source="dataProtUvi"
                                        value=""
                                        title=""
                                        type="text"
                                        id="dataUVI"
                                        class="form-control"
                                        min="1900-01-01"
                                        max="5000-12-31"
                                        onfocus="(this.type='date')"
                                        onblur="if(this.value==''){this.type='text'}"
                                        placeholder="Data Prot. U.V.I."
                                        name="dataUVI">
                                    <div id="errDataUVI" class="invalid-feedback">
                                        Immettere la data della valutazione UVI.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <!-- <label for="valIsee" class="">I.S.E.E.</label>
                                    <span class="input-number">
                                        <input autocomplete="off" 
                                            data-source="valIsee"
                                            type="number" 
                                            id="valIsee" 
                                            name="valIsee" 
                                            value="" 
                                            placeholder="Valore I.S.E.E."
                                            min="0" 
                                            step="0.01" />
                                        <button class="input-number-add">
                                            <span class="sr-only">Aumenta valore di 0.01</span>
                                        </button>
                                        <button class="input-number-sub">
                                            <span class="sr-only">Diminuisci valore di 0.01</span>
                                        </button>
                                    </span> -->
                                    <label for="valIsee">I.S.E.E.</label>
                                    <input autocomplete="off"
                                        data-source="valIsee"
                                        value=""
                                        title=""
                                        type="number"
                                        step="0.01"
                                        class="form-control"
                                        id="valIsee"
                                        placeholder="Valore I.S.E.E."
                                        name="valIsee">
                                    <div id="errValIsee" class="invalid-feedback">
                                        Immettere il valore dell'I.S.E.E.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="dataInizio">Data Inizio</label>
                                    <input autocomplete="off"
                                        data-source="inizio"
                                        value=""
                                        title=""
                                        type="text"
                                        id="dataInizio"
                                        class="form-control"
                                        min="1900-01-01"
                                        max="5000-12-31"
                                        onfocus="(this.type='date')"
                                        onblur="if(this.value==''){this.type='text'}"
                                        placeholder="Inizio Programma"
                                        name="dataInizio">
                                    <div id="errDataInizio" class="invalid-feedback">
                                        Immettere la data fine programma.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="dataFine">Data Fine</label>
                                    <input autocomplete="off"
                                        data-source="fine"
                                        value=""
                                        title=""
                                        type="text"
                                        id="dataFine"
                                        class="form-control"
                                        min="1900-01-01"
                                        max="5000-12-31"
                                        onfocus="(this.type='date')"
                                        onblur="if(this.value==''){this.type='text'}"
                                        placeholder="Fine Programma"
                                        name="dataFine">
                                    <div id="errDataFine" class="invalid-feedback">
                                        Immettere la data di inizio programma.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="oreSetti">Ore Settimanali</label>
                                    <input autocomplete="off"
                                        data-source="oreSettimanali"
                                        value=""
                                        title=""
                                        type="number"
                                        min="1"
                                        step="1"
                                        class="form-control onlyNumber"
                                        id="oreSetti"
                                        placeholder="Ore Settimanali"
                                        name="oreSetti">
                                    <div id="errOreSetti" class="invalid-feedback">
                                        Immettere le ore settimanali.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="qtSociale"></label>
                                    <input autocomplete="off"
                                        data-source="quotaSociale"
                                        value=""
                                        title=""
                                        type="number"
                                        class="form-control"
                                        id="qtSociale"
                                        data-digits="2"
                                        placeholder="Quota Sociale"
                                        name="qtSociale">
                                    <div id="errQtSociale" class="invalid-feedback">
                                        Immettere la quota a carico del comune.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                  <label for="qtCompa">Quota Utente</label>
                                    <input autocomplete="off"
                                        data-source="quotaCompa"
                                        value=""
                                        title=""
                                        type="number"
                                        min="1"
                                        step="0.01"
                                        class="form-control"
                                        id="qtCompa"
                                        placeholder="Quota Utente"
                                        name="qtCompa">
                                    <div id="errQtCompa" class="invalid-feedback">
                                        Immettere la quota a carico dell'utente.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 text-center" style="margin-bottom: 2rem">
                                <button id="addUvi" type="button" class="btn btn-primary btn-md"><i class="far fa-save mr-2"></i>Aggiungi</button>
                            </div>
                        </div>
                        <div class="row justify-content-center" style="margin-bottom: 2rem">
                            <div class="col-md-12">
                                <table id="tUviPaziente" class="respTable table" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">Prog.</th>
                                            <th style="width: 15%">Fondo</th>
                                            <th style="width: 15%">Inizio</th>
                                            <th style="width: 15%">Fine</th>
                                            <th style="width: 15%">Ore Sett.</th>
                                            <th style="width: 10%">Rimuovi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- FINE Uvi Paziente -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- INIZIO Documenti Paziente -->
    <div class="row justify-content-center flex-row align-items-center h-50">
        <div class="col-lg-12">
            <div class="card-wrapper card-space">
                <div class="card card-bg" style="border-radius: 20px; box-shadow: 0 10px 25px 0 rgb(0 0 0 / 20%);">
                    <div class="card-header">
                        <div>
                            <h3 class="text-primary mb-0">Documenti Utente</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row mt-3">
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                <div class="form-group" style="margin-bottom: 2rem">
                                    <label for="tdSoggetto" class="active">Tipo Documento</label>
                                    <select class="form-control emptyAutoSelect"
                                        aria-required="true"
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
    <!-- FINE Documenti Paziente -->

    <!-- MODALE Ricerca Paziente -->
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

    <!-- MODALE Paziente Presente -->
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

    <!-- MODALE Tabella Paziente -->
    <div class="modal alert-modal fade" tabindex="-1" role="dialog" id="mdElenco">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Elenco Pazienti</h5>
                </div>
                <div class="modal-body mt-4">
                    <div class="col">
                        <table id="tbSoggetti" class="respTable table" style="width: 100%">
                            <thead>
                                <tr>
                                    <th style="width: 30%">Cod. Fiscale</th>
                                    <th style="width: 35%">Cognome</th>
                                    <th style="width: 35%">Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="paziente in elencoPazienti" :key="paziente.codFiscale">
                                    <td>{{ paziente.codFiscale }}</td>
                                    <td>{{ paziente.cognome }}</td>
                                    <td>{{ paziente.nome }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="modal-footer justify-content-between">
                        <button class="btn btn-outline-secondary btn-sm" data-dismiss="modal" type="button" @click="modalPazienti.hide()">Chiudi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- MODALE Cancellazione Documento -->
    <div class="modal alert-modal fade" tabindex="-1" role="dialog" id="mdDeleteDoc">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header align-items-center">
                    <svg class="icon">
                        <use href="/node_modules/bootstrap-italia/dist/svg/sprites.svg#it-info-circle"></use>
                    </svg>
                    <h5 class="modal-title">Cancellazione Documento</h5>
                </div>
                <div class="modal-body">
                    <div class="col">
                        <p>
                            &Egrave; stata richiesta la cancellazione del documento<b><font id="nomeDocCanc"></font></b>.<br />
                            Procedere?
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-danger btn-sm" type="button" id="nextCancel">Elimina</button>
                    <button class="btn btn-outline-secondary btn-sm" data-dismiss="modal" type="button" id="annCancel">Annulla</button>
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