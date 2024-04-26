<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import itLocale from '@fullcalendar/core/locales/it';
import { Modal } from 'bootstrap-italia';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import ContextMenu from '@imengyu/vue3-context-menu';
import baseApiCookie from '../plugin/axios';


let AggiornaModal;
let CambiaOperatoreModal;
const search1 = ref('');
const search2 = ref('');
const date = ref('');
const selectedEvent = ref(null);
let elencoPrestazioni = ref([]);
let elencoOperatori = ref([]);
let elencoPazienti = ref([]);
let elencoMotivazioni = ref([]);

//funzione che formatta il fine appuntamento per impostarlo nell'appuntamento del calendario
let formattedEndTime = computed(() => {
  if (selectedEvent.value && selectedEvent.value.end) {
    const date = new Date(selectedEvent.value.end);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return '';
});

let selectedOperator = computed(() => {
  if (selectedEvent.value) {
    return elencoOperatori.value.find((operatore) => operatore.value === selectedEvent.value.extendedProps.codOperatore);
  }
  return null;
});

let selectedUser = computed(() => {
  if (selectedEvent.value) {
    return elencoPazienti.value.find((paziente) => paziente.codSogPuat === selectedEvent.value.extendedProps.codSogPuat);
  }
  return null;
});

//costante provvisoria che crea appuntamenti nel calendario 
const event = [
    {
      "id": 67,
      "title": "Manco Pietro - MNCPTR82C17G309E",
      "start": "2022-04-06T12:00:00",
      "end": null,
      "codSogPuat": 1,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 68,
      "title": "Manco Pietro - MNCPTR82C17G309E",
      "start": "2022-04-13T12:00:00",
      "end": null,
      "codSogPuat": 1,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 69,
      "title": "Manco Pietro - MNCPTR82C17G309E",
      "start": "2022-04-20T12:00:00",
      "end": null,
      "codSogPuat": 1,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 70,
      "title": "Manco Pietro - MNCPTR82C17G309E",
      "start": "2022-04-27T12:00:00",
      "end": null,
      "codSogPuat": 1,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 114,
      "title": "Manco Pietro - MNCPTR82C17G309E",
      "start": "2022-05-04T12:00:00",
      "end": "2022-05-04T12:30:00",
      "codSogPuat": 1,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [1, 3],
      "backgroundColor": "green",
      "borderColor": "green"
    },
    {
      "id": 50,
      "title": "Coppolino Angela - CPPNGL83B59B963P",
      "start": "2022-05-05T15:00:00",
      "end": "2022-05-05T16:00:00",
      "codSogPuat": 2,
      "codOperatore": 2,
      "isAssente": false,
      "prestazioni": [1, 3],
      "backgroundColor": "green",
      "borderColor": "green"
    },
    {
      "id": 11,
      "title": "Coppolino Angela - CPPNGL83B59B963P",
      "start": "2022-04-02T15:00:00",
      "end": null,
      "codSogPuat": 2,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 12,
      "title": "Coppolino Angela - CPPNGL83B59B963P",
      "start": "2022-04-08T15:00:00",
      "end": null,
      "codSogPuat": 2,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 13,
      "title": "Coppolino Angela - CPPNGL83B59B963P",
      "start": "2022-04-13T15:00:00",
      "end": null,
      "codSogPuat": 2,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 14,
      "title": "Coppolino Angela - CPPNGL83B59B963P",
      "start": "2022-04-23T15:00:00",
      "end": null,
      "codSogPuat": 2,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    },
    {
      "id": 16,
      "title": "Coppolino Angela - CPPNGL83B59B963P",
      "start": "2024-04-07T15:00:00",
      "end": "2024-04-07T16:00:00",
      "codSogPuat": 2,
      "codOperatore": 7,
      "isAssente": false,
      "prestazioni": [1, 2],
      "backgroundColor": "green",
      "borderColor": "green"
    },
    {
      "id": 2,
      "title": "Arpaia Angela Giovanna - RPANLG52D51F839S",
      "start": "2022-04-26T10:00:00",
      "end": null,
      "codSogPuat": 3,
      "codOperatore": 8,
      "isAssente": false,
      "prestazioni": [],
      "backgroundColor": "",
      "borderColor": ""
    }
  ];

//funzione che permette la creazione del menu contestuale
const handleContextMenu = (event) => {
    if(!event.target.classList.contains('fc-event')) {
      return;
    }
    console.log(selectedEvent.value);
    event.preventDefault();
    ContextMenu.showContextMenu({
      x: event.pageX,
      y: event.pageY,
      items: [
      {
          label: "Cambia Operatore",
          onClick: () => {
            CambiaOperatoreModal.show();
          }
        },
        { 
          label: "Completa Visita", 
          onClick: () => {
            AggiornaModal.show();            
          }
        },
        { 
          label: "Elimina Appuntamento", 
          onClick: () => {
            removeEvent();
          }
          },
      ]
    });
};

//oggetto base che contiene i dati dell'appuntamento, e che viene richiamato per la creazione di un nuovo appuntamento
let Visita = reactive(
{
 "codSogPuat": 0,
 "codOperatore": 0,
 "progAppuntamento": 0,
 "inizio": "",
 "fine": "",
 "codPrestazione": [],
 "isAssente": false,
 "isEseguita": true,
 "repeatVisita": false,
 "idUtente": 0
});

let CambioOperatore =
{
 "codSogPuat": 0,
 "codOperatoreOld": 0,
 "codOperatoreNew": 0,
 "progAppuntamento": 0,
 "inizio": "",
 "fine": "",
 "codMotivazione": 0,
 "allVisite": false,
 "idUtente": 0
};

let UpdateVisita =
{
 "codSogPuat": 0,
 "codOperatore": 0,
 "progAppuntamento": 0,
 "inizio": "",
 "fine": "",
 "codPrestazione": [],
 "isAssente": false,
 "isEseguita": true,
 "repeatVisita": false,
 "idUtente": 0
};

//opzioni del calendario
const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  stickyHeaderDates: true,
  events: 'https://adsa.imperiumpa.it/api/Calendario/GetVisite',
  contentHeight: 'auto',
  aspectRatio: 2,
  locale: itLocale,
	headerToolbar: {
	left: 'prev,next',
	center: 'title',
	right: 'dayGridMonth,dayGridWeek,dayGridDay'
	},
  eventClick: function(info) {
    AggiornaModal.show();
    selectedEvent.value = info.event;
    
  },
  eventDidMount: function(info) {
    const event = info.event;
    info.el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      selectedEvent.value = info.event;
      handleContextMenu(e);
    });
  },
});

//funzione che permette di aggiungere un appuntamento al calendario (da completare, con l'aggiunta dell'evento sul database e la gestione delle ripetizioni)
const addEvent = () => {
    const visita = {
        codSogPuat: Visita.codSogPuat,
        codOperatore: Visita.codOperatore,
        progAppuntamento: Visita.progAppuntamento,
        inizio: Visita.inizio,
        fine: Visita.fine,
        codPrestazione: Visita.codPrestazione,
        isAssente: Visita.isAssente,
        isEseguita: Visita.isEseguita,
        repeatVisita: Visita.repeatVisita,
        idUtente: Visita.idUtente,
        title: `${Visita.codOperatore} - ${Visita.codSogPuat}`,
        start: Visita.inizio, 
        end: Visita.fine, 
    };

    console.log(visita);
    //da sostituire con il push dell'evento sul database
    calendarOptions.value.events = [...calendarOptions.value.events, visita];

    //ricarica degli eventi sul calendario 
    

    Visita.codSogPuat = 0;
    Visita.codOperatore = 0;
    Visita.progAppuntamento = 0;
    Visita.inizio = "";
    Visita.fine = "";
    Visita.codPrestazione = [];
    Visita.isAssente = false;
    Visita.isEseguita = true;
    Visita.repeatVisita = false;
    Visita.idUtente = 0;
};

//funzione che permette di resettare il form di aggiunta appuntamento
const resetForm = () => {
  selectedEvent.value.setExtendedProp('isAssente', false);
  selectedEvent.value.setExtendedProp('prestazioni', []);
};

//funzione che permette l'aggiornamento dell'appuntamento, potendone impostare anche i termini di fine prestazione
const updateForm = () => {
};

//funzione che elimina un appuntamento dal calendario
const removeEvent = () => {
  selectedEvent.value.remove();
  //da aggiungere la rimozione dal database
};


onMounted(async () => {
  AggiornaModal = new Modal(document.getElementById('diagExecVisit'), {
    backdrop: true,
  });
  CambiaOperatoreModal = new Modal(document.getElementById('diagChangeOp'), {
    backdrop: true,
  });
  const res = await baseApiCookie.get("dizionari/GetPrestazioni");
  elencoPrestazioni.value = res.data;
  const res2 = await baseApiCookie.get("Soggetti/ElencoOperatori");
  elencoOperatori.value = res2.data;
  const res3 = await baseApiCookie.get("Pazienti/ElencoPazienti");
  elencoPazienti.value = res3.data;
  const res4 = await baseApiCookie.get("Dizionari/MotCambio");
  elencoMotivazioni.value = res4.data;
});



</script>

<template>
  <main>
    <!-- form per l'inserimento di un nuovo appuntamento -->
    <div class="row justify-content-center flex-row align-items-center" id="rowSetApp">
        <div class="col-lg-12">
            <div class="row mt-4">
              <div class="col-sm-6 col-md-3 col-lg-3">
                <div class="form-group" id="fgSelOperatore">
                  <div class="select-wrapper">
                    <label for="selOperatore" class="active">Operatore</label>
                    <select class="form-control"
                        v-model="Visita.codOperatore"
                        placeholder="Seleziona Operatore"
                        name="selOperatore"
                        id="selOperatore">
                        <option value="">Scegli un operatore</option>
                        <option v-for="operatore in elencoOperatori" :value="operatore.value">
                            {{ operatore.text }}
                        </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 col-lg-3">
                <div class="form-group" id="fgSelPaziente">
                  <div class="select-wrapper">
                    <label for="selPaziente" class="active">Utente</label>
                    <select class="form-control"
                        v-model="Visita.codSogPuat"
                        placeholder="Seleziona Utente"
                        id="selPaziente">
                        <option value="">Scegli un utente</option>
                        <option v-for="paziente in elencoPazienti" :value="paziente.codSogPuat">
                            {{ paziente.nome }} {{ paziente.cognome }} - {{ paziente.codFiscale }}
                        </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 col-lg-3">
                <div class="form-group">
                  <label for="dvInizio">Inizio visita</label>
                  <input autocomplete="off"
                      v-model="Visita.inizio"
                      title=""
                      type="datetime-local"
                      aria-required="true"
                      id="dvInizio"
                      class="form-control"
                      min="1900-01-01"
                      max="5000-12-31"
                      placeholder="Data/Ora Visita"
                      name="dvInizio">
                  <div class="invalid-feedback">
                      Immettere la data/ora di inizio visita.
                  </div>
                </div>
              </div>
                <div class="col-sm-6 col-md-2 col-lg-2">
                    <div class="form-group" style="margin-bottom: 1rem">
                      <div class="form-check">
                        <input type="checkbox" id="finoFine" v-model="Visita.repeatVisita">
                        <label id="lbFinoFine" for="finoFine">Ripeti fino al termine</label>
                      </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-1 col-lg-1">
                  <button id="addVisita" type="button" class="btn btn-outline-primary btn-sm" @click="addEvent" ><i class="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
    </div>
    <!-- calendario -->
    <div class="calendar">
      <FullCalendar :options='calendarOptions' />
    </div>
    <!--modale per la modifica dell'appuntamento--> 
    <div class="modal fade" tabindex="-1" role="dialog" id="diagExecVisit" >
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content" v-if="selectedEvent">
                <div class="modal-header d-block">
                    <h5 style="font-size:20px" class="modal-title text-center mb-4">Dettaglio Appuntamento</h5>
                    <div style="display:flex;justify-content:space-between">
                        <h5 style="font-size:15px;align-self:start" class="modal-title" id="utenteAppuntamento">OPERATORE: <br> {{ selectedOperator.text }}</h5>
                        <h5 style="font-size:15px;align-items:end" class="modal-title" id="operatoreAppuntamento">UTENTE: <br> {{ selectedUser.nome }} {{ selectedUser.cognome }} - {{ selectedUser.codFiscale }}</h5> <!-- no -->
                    </div>
                    <h5 style="font-size:15px" class="modal-title" id="dataAppuntamento"></h5>
                </div>
                <div class="modal-body mt-4" >
                
                    <div class="row">
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group" style="margin-bottom: 1rem">
                                <label class="active" for="fineAppuntamento">Orario Fine</label>
                                <input autocomplete="off"
                                    value=""
                                    title=""
                                    type="time"
                                    class="form-control"
                                    id="fineAppuntamento"
                                    name="fineAppuntamento"
                                    v-model="formattedEndTime">
                            </div>
                        </div>
                        <div class="col-sm-7 ml-4">
                            <div class="form-group" style="margin-bottom: 1rem">
                                <div class="form-check">
                                    <input type="checkbox" id="isAssente">
                                    <label id="forIsAssente" for="isAssente">Utente Assente</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-12">
                          Dettaglio Visita
                          <hr />
                          <div class="grid-container-checkbox" id="optionDetVisita">
                              <div class="form-check" v-for="(prestazione, index) in elencoPrestazioni" :key="index">
                                <input type="checkbox" :id="'prestazione-' + index" :value="prestazione" :checked="selectedEvent && selectedEvent.extendedProps ? selectedEvent.extendedProps.prestazioni.includes(prestazione.codice) : false">
                                <label :for="'prestazione-' + index">{{ prestazione.descrizione }}</label>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary btn-sm" type="button" id="selectFS" @click="updateForm()">Aggiorna</button>
                    <button class="btn btn-outline-danger btn-sm" type="button" id="resetFS" @click="resetForm()">Reset</button>
                    <button class="btn btn-outline-secondary btn-sm" data-dismiss="modal" type="button" @click="AggiornaModal.hide()">Chiudi</button>
                </div>
            </div>
        </div>
    </div>
    <!--modale per il cambio operatore-->
    <div class="modal fade" tabindex="-1" role="dialog" id="diagChangeOp">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cambio Appuntamento</h5>
                </div>
                <div class="modal-body mt-4" v-if="selectedEvent">
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="active" for="opAttale">Operatore Assegnato</label>
                                <input autocomplete="off"
                                    v-model="selectedOperator.text"
                                    value=""
                                    title=""
                                    type="text"
                                    class="form-control form-control-plaintext"
                                    placeholder=" "
                                    readonly
                                    id="opAttale"
                                    name="opAttale">
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="newOperatore" class="active">Nuovo Operatore</label>
                                <select class="form-control"
                                    placeholder="Seleziona Operatore"
                                    name="selOperatore"
                                    id="selOperatore">
                                    <option value="">Scegli un operatore</option>
                                    <option v-for="operatore in elencoOperatori" :value="operatore.value">
                                        {{ operatore.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label for="motivazione"></label>
                                <select class="form-control emptyAutoSelect"
                                    placeholder="Seleziona opzione"
                                    name="motivazione"
                                    id="motivazione">
                                    <option value="">Scegli una motivazione</option>
                                    <option v-for="motivazione in elencoMotivazioni" :value="motivazione.value">
                                        {{ motivazione.descMotCambio }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label for="finoAlla"></label>
                                <input autocomplete="off"
                                    value=""
                                    title=""
                                    type="text"
                                    min="1900-01-01"
                                    max="5000-12-31"
                                    id="finoAlla"
                                    class="form-control"
                                    onfocus="if(this.attributes.readonly==undefined){this.type='date'}"
                                    onblur="if(this.value==''){this.type='text'}"
                                    placeholder="Data/Ora Visita"
                                    name="finoAlla">
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-4">
                            <div class="form-group" style="margin-bottom: 1rem">
                                <div class="form-check">
                                    <input type="checkbox" id="allVisit">
                                    <label id="lbAllVisit" for="allVisit">Fino al termine del Puat</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary btn-sm" type="button" id="selectFS" @click="updateForm()">Aggiorna</button>
                    <button class="btn btn-outline-danger btn-sm" type="button" id="resetFS" @click="resetForm()">Reset</button>
                    <button class="btn btn-outline-secondary btn-sm" data-dismiss="modal" type="button" @click="CambiaOperatoreModal.hide()">Chiudi</button>
                </div>
            </div>
        </div>
    </div>
  </main>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px; 
    margin-top: 20px;
}

.row-container {
    display: flex;
    justify-content: space-between;

}

.selOperatore, .datepicker {
	width: 100%;
}

.calendar .fc-daygrid-day-frame {
  padding: 20px;
}

.container{
	max-width: 100%;
}

.grid-container-checkbox {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 20px; 
    margin-top: 20px;
}
</style>