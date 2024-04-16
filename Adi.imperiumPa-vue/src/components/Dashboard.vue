<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import itLocale from '@fullcalendar/core/locales/it';
import { Modal } from 'bootstrap-italia';
import axios from 'axios';

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://adsa.imperiumpa.it/api/Dizionari/GetPrestazioni';
let myModal;
const search1 = ref('');
const search2 = ref('');
const date = ref('');
const selectedEvent = ref(null);
let elencoPrestazioni = ref([]);

const showMenu = ref(false);
const menuPosition = ref({ x: 0, y: 0 });

const handleRightClick = (event) => {
  event.preventDefault();
  menuPosition.value.x = event.clientX;
  menuPosition.value.y = event.clientY;
  showMenu.value = true;
  selectedEvent.value = null;
};



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

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  events: event,
  contentHeight: 'auto',
  aspectRatio: 2,
  locale: itLocale,
	headerToolbar: {
	left: 'prev,next',
	center: 'title',
	right: 'dayGridMonth,dayGridWeek,dayGridDay'
	},
  eventClick: function(info) {
    myModal.show();
    selectedEvent.value = info.event;
  },
});

const addEvent = () => {
 /*  calendarOptions.value.events.push({
    title: `${search1.value}, ${search2.value}`,
    start: date.value,
  }); */
};

const baseApi = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://adsa.imperiumpa.it/api',
  
});
onMounted(async () => {
  myModal = new Modal(document.getElementById('diagExecVisit'), {
    backdrop: true,
  });
  const res = await baseApi.get("dizionari/GetPrestazioni");
  elencoPrestazioni.value = res.data;
});


</script>

<template>
  <main>
    <div>
      <div class="grid-container">
        <div class="form-group">
          <label class="visually-hidden">Cerca nel sito</label>
          <input type="search" v-model="search1" placeholder="Testo da cercare">
        </div>
        <div class="selOperatore">
          <div class="form-group">
            <label class="visually-hidden">Cerca nel sito</label>
            <input type="search" v-model="search2" placeholder="Testo da cercare">
          </div>
        </div>
        <div class="datepicker">
          <div class="form-group">
            <label class="active" for="dateStandard"></label>
            <input class="picker" type="datetime-local" v-model="date" id="dateStandard" name="dateStandard">
          </div>
        </div>
        <button @click="addEvent">Add to Calendar</button>
      </div>
    </div>
    <div class="calendar" @contextmenu.prevent="handleRightClick">
      <FullCalendar :options='calendarOptions' />
    </div>
    <div v-if="showMenu" class="custom-menu" :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }">
      <ul>
        <li @click="myModal.show()">Edit Event</li>
        <li @click="deleteEvent">Delete Event</li>
      </ul>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="diagExecVisit">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header d-block">
                    <h5 style="font-size:20px" class="modal-title text-center mb-4">Dettaglio Appuntamento</h5>
                    <div style="display:flex;justify-content:space-between">
                        <h5 style="font-size:15px;align-self:start" class="modal-title" id="utenteAppuntamento"></h5><h5 style="font-size:15px;align-items:end" class="modal-title" id="opertaoreAppuntamento"></h5>
                    </div>
                    <h5 style="font-size:15px" class="modal-title" id="dataAppuntamento"></h5>
                </div>
                <div class="modal-body mt-4">
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
                                    name="fineAppuntamento">
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
                                  <input type="checkbox" :id="'prestazione-' + index" :value="prestazione" :checked="selectedEvent.extendedProps.prestazioni.includes(prestazione.codice)">
                                  <label :for="'prestazione-' + index">{{ prestazione.descrizione }}</label>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary btn-sm" type="button" id="selectFS">Aggiorna</button>
                    <button class="btn btn-outline-danger btn-sm" type="button" id="resetFS">Reset</button>
                    <button class="btn btn-outline-secondary btn-sm" data-dismiss="modal" type="button" @click="myModal.hide()">Chiudi</button>
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

.custom-menu {
  position: fixed;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px 0;
}

.custom-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.custom-menu ul li {
  padding: 8px 12px;
  cursor: pointer;
}

.custom-menu ul li:hover {
  background-color: #f0f0f0;
}
</style>