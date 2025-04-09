import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Importez MatDialogRef
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css']
})
export class ReservationCalendarComponent {
  @Input() dateLimite: Date = new Date(); // Date limite de réservation
  @Output() dateSelected = new EventEmitter<Date>();

  selectedDate: Date | null = null; // Date sélectionnée par l'utilisateur
  dateControl = new FormControl(null); // Contrôle du champ de date
  minDate: Date = new Date(); // Date minimale (aujourd'hui)

  constructor(public dialogRef: MatDialogRef<ReservationCalendarComponent>) {} // Injectez MatDialogRef

  // Méthode pour valider la date sélectionnée
  onDateSelect(date: Date): void {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Ignorer l'heure pour la comparaison

    // Convertir la date sélectionnée et la date limite en objets Date sans heure
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const dateLimite = new Date(this.dateLimite);
    dateLimite.setHours(0, 0, 0, 0);

    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    if (selectedDate < currentDate) {
      alert('La date sélectionnée est antérieure à aujourd\'hui. Veuillez choisir une date future.');
      return;
    }



    this.selectedDate = date;
    this.dialogRef.close(date); // Fermer la modale et retourner la date sélectionnée
  }
}
