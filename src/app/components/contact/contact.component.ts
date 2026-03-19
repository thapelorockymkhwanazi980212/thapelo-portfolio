import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

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

    isLoading = false;
    successMessage = '';
    errorMessage = '';

   submitEnquiry() {
      //validation
      if(!this.enquiry.name || !this.enquiry.email || !this.enquiry.message){
        this.errorMessage = 'Please fill in the Name, Email and Message!';
        return;
        }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const templateParams = {
          from_name: this.enquiry.name,
          from_surname: this.enquiry.surname,
          from_email: this.enquiry.email,
          from_phone: this.enquiry.phone,
          message: this.enquiry.message
        };

      emailjs.send(
          'service_zr1rvfc',
          'template_g5ukv2c',
          templateParams,
          'Gi0VCSNH0aKzmfaif'
        )
          .then(() => {
                this.isLoading = false;
                this.successMessage = 'Message sent successfully! I will get back to you soon.';
                // clear the form
                this.enquiry = { name: '', surname: '', email: '', phone: '', message: '' };
          })
            .catch(() => {
              this.isLoading = false;
              this.errorMessage = 'Something went wrong. Please try again or email me directly!';
            });
    }
}
