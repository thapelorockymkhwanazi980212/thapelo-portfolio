import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
 imports: [
     MatButtonModule,
     MatToolbarModule,
     MatIconModule,
     MatSidenavModule,
     MatListModule,
     RouterLink,
     CommonModule
   ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  menuOpen = false;

    navLinks = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
//       { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' },
    ];

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
      this.menuOpen = false;
    }

}
