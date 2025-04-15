import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RendezVousService } from '../../services/rendez-vous.service';

@Component({
    selector: 'app-calendar-rendezvous',
    templateUrl: './calendar-rendezvous.component.html',
    styleUrls: ['./calendar-rendezvous.component.css']
})
export class CalendarRendezVousComponent implements OnInit {
    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        editable: false,
        events: [],
        dateClick: this.handleDateClick.bind(this)
    };

    constructor(private rendezVousService: RendezVousService) {}

    ngOnInit() {
        this.chargerRendezVous(1); // Charger les rendez-vous pour l'agent 1
    }

    chargerRendezVous(agentId: number) {
        this.rendezVousService.getRendezVousByAgentId(agentId).subscribe(data => {
            this.calendarOptions.events = data.map(rdv => ({
                title: `RDV avec ${rdv.nomClient}`,
                start: rdv.dateHeure,
                allDay: false
            }));
        });
    }

    handleDateClick(arg: any) {
        alert(`Date sélectionnée: ${arg.dateStr}`);
    }
}