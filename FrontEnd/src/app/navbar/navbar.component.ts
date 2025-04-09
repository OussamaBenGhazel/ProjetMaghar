import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the icon

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userFirstName: string | null = null;
  faSignOutAlt = faSignOutAlt; // Define the icon property

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userFirstName = localStorage.getItem('userFirstName');
  }

  logout(): void {
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
