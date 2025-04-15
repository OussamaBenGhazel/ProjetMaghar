import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../services/rendez-vous.service';

@Component({
    selector: 'app-list-rendezvous',
    templateUrl: './list-rendezvous.component.html',
    styleUrls: ['./list-rendezvous.component.css']
})
export class ListRendezVousComponent implements OnInit {
    rendezVousList: any[] = [];

    constructor(private rendezVousService: RendezVousService) {}

    ngOnInit() {
        this.loadRendezVous();
    }

    loadRendezVous() {
        this.rendezVousService.getRendezVousByAgentId(1).subscribe(data => {
            this.rendezVousList = data;
        });
    }
}