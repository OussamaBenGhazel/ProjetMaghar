import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';

@Component({
  selector: 'app-offre-partenaire-form',
  templateUrl: './offre-partenaire-form.component.html',
  styleUrls: ['./offre-partenaire-form.component.css']
})
export class OffrePartenaireFormComponent implements OnInit {
  offre: any = { typeOffre: '', description: '', prix: 0, localisation: '', partenaire: null };
  partenaires: any[] = [];
  isEdit = false;
  @Output() offerAdded = new EventEmitter<any>(); // Événement pour notifier le Dashboard

  constructor(
    private offreService: OffrePartenaireService,
    private partenaireService: PartenaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPartenaires();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.offreService.getOffreById(+id).subscribe(data => {
        this.offre = data;
      });
    }
  }

  loadPartenaires() {
    this.partenaireService.getAllPartenaires().subscribe(data => {
      this.partenaires = data;
    });
  }

  saveOffre() {
    if (!this.offre.partenaire || !this.offre.partenaire.id) {
      alert("Veuillez sélectionner un partenaire.");
      return;
    }

    if (this.isEdit) {
      this.offreService.updateOffre(this.offre.id, this.offre).subscribe(() => {
        alert('Offre mise à jour avec succès !');
        this.router.navigate(['/offres']);
        this.offerAdded.emit(); // Notifier le dashboard qu'une offre a été ajoutée
      });
    } else {
      this.offreService.addOffre(this.offre).subscribe(() => {
        alert('Offre ajoutée avec succès !');
        this.router.navigate(['/admin/dashboard']);
        this.offerAdded.emit(); // Notifier le dashboard qu'une offre a été ajoutée
      });
    }
  }
}
