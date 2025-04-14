import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamation-confirmation',
  templateUrl: './reclamation-confirmation.component.html',
  styleUrls: ['./reclamation-confirmation.component.css']
})
export class ReclamationConfirmationComponent implements OnInit {
  showConfirmation: boolean = false;
  countdown: number = 30;
  autoRedirected: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showConfirmation = true;
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.goToHomePage(); // Auto-redirect after countdown reaches zero
      }
    }, 1000);
  }

  goToHomePage() {
    this.autoRedirected = true;
    this.router.navigate(['/home']); // Redirect to the home route
  }
}
