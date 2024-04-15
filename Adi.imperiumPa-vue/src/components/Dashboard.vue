<script setup lang="ts">
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import itLocale from '@fullcalendar/core/locales/it';

let search1 = ref('');
let search2 = ref('');
const date = ref('');
const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  events: [
    { title: 'Meeting', start: new Date() }
  ],
  contentHeight: 'auto',
  aspectRatio: 2,
  locale: itLocale,
	headerToolbar: {
	left: 'prev,next',
	center: 'title',
	right: 'dayGridMonth,dayGridWeek,dayGridDay'
	},
});

const addEvent = () => {
  calendarOptions.value.events.push({
    title: `${search1.value}, ${search2.value}`,
    start: date.value
  });
};
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
    <div class="calendar">
      <FullCalendar :options='calendarOptions' />
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
</style>