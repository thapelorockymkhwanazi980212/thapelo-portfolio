import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [
    MatButtonModule,
     MatIconModule,
     MatDividerModule,
     MatFormFieldModule,
     MatInputModule,
     FormsModule
    ],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

   enquiry = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      message: ''
    };

  socialLinks = [
      { label: 'Facebook', icon: 'assets/icons/facebook.svg', url: '#' },
      { label: 'Instagram',icon: 'assets/icons/angular.svg', url: '#' },
      { label: 'GitHub', icon: 'assets/icons/github.svg', url: '#' },
      { label: 'LinkedIn', icon: 'assets/icons/linkedin.svg', url: '#' },
    ];

   submitEnquiry() {
      console.log('Enquiry submitted:', this.enquiry);
      // You can later connect this to a real backend!
    }

}
