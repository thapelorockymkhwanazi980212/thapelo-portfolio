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

  // Field-level error messages
  fieldErrors = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  };

  currentYear = new Date().getFullYear();

  socialLinks = [
    { label: 'Facebook',  icon: 'assets/icons/facebook.svg',  url: 'https://www.facebook.com/thapelo.mkhwanazi.2025' },
    { label: 'Instagram', icon: 'assets/icons/instagram.svg', url: 'https://www.instagram.com/thapelo_mkhwanazii/' },
    { label: 'GitHub',    icon: 'assets/icons/github.svg',    url: 'https://github.com/thapelorockymkhwanazi980212' },
    { label: 'LinkedIn',  icon: 'assets/icons/linkedin.svg',  url: 'https://www.linkedin.com/in/thapelo-mkhwanazi-aa2473299' },
  ];

  isLoading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  // ── Validators ────────────────────────────────────────────────

  private validateName(value: string, label: string): string {
    if (!value.trim()) return `${label} is required.`;
    if (!/^[a-zA-Z\s'-]+$/.test(value.trim()))
      return `${label} can only contain letters.`;
    if (value.trim().length < 2)
      return `${label} must be at least 2 characters.`;
    return '';
  }

  private validateEmail(value: string): string {
    if (!value.trim()) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim()))
      return 'Please enter a valid email address.';
    return '';
  }

  private validatePhone(value: string): string {
    if (!value.trim()) return ''; // phone is optional
    const digitsOnly = value.replace(/\s/g, '');
    if (!/^\+?\d+$/.test(digitsOnly))
      return 'Phone can only contain numbers.';
    // Strip leading + for length check
    const digits = digitsOnly.replace(/^\+/, '');
    if (digits.length < 9 || digits.length > 15)
      return 'Phone must be between 9 and 15 digits.';
    return '';
  }

  private validateMessage(value: string): string {
    if (!value.trim()) return 'Message is required.';
    if (value.trim().length < 10)
      return 'Message must be at least 10 characters.';
    return '';
  }

  // ── Live validation (called on blur from the template) ────────

  onBlurName()    { this.fieldErrors.name    = this.validateName(this.enquiry.name, 'Name'); }
  onBlurSurname() { this.fieldErrors.surname = this.validateName(this.enquiry.surname, 'Surname'); }
  onBlurEmail()   { this.fieldErrors.email   = this.validateEmail(this.enquiry.email); }
  onBlurPhone()   { this.fieldErrors.phone   = this.validatePhone(this.enquiry.phone); }
  onBlurMessage() { this.fieldErrors.message = this.validateMessage(this.enquiry.message); }

  // Restrict name fields: block numbers and special chars while typing
  onNameKeypress(event: KeyboardEvent): boolean {
    const allowed = /^[a-zA-Z\s'\-]$/;
    if (!allowed.test(event.key)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // Restrict phone field: only digits, +, and spaces
  onPhoneKeypress(event: KeyboardEvent): boolean {
    const allowed = /^[\d\s+]$/;
    if (!allowed.test(event.key)) {
      event.preventDefault();
      return false;
    }
    // Prevent more than 15 digits (excluding + and spaces)
    const currentDigits = this.enquiry.phone.replace(/[\s+]/g, '').length;
    if (/^\d$/.test(event.key) && currentDigits >= 15) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // ── Full validation before submit ─────────────────────────────

  private validateAll(): boolean {
    this.fieldErrors.name    = this.validateName(this.enquiry.name, 'Name');
    this.fieldErrors.surname = this.validateName(this.enquiry.surname, 'Surname');
    this.fieldErrors.email   = this.validateEmail(this.enquiry.email);
    this.fieldErrors.phone   = this.validatePhone(this.enquiry.phone);
    this.fieldErrors.message = this.validateMessage(this.enquiry.message);

    return Object.values(this.fieldErrors).every(e => e === '');
  }

  // ── Submit ────────────────────────────────────────────────────

  submitEnquiry() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.validateAll()) {
      this.errorMessage = 'Please fix the errors above before sending.';
      return;
    }

    this.isLoading = true;

    const templateParams = {
      from_name:    this.enquiry.name,
      from_surname: this.enquiry.surname,
      from_email:   this.enquiry.email,
      from_phone:   this.enquiry.phone,
      message:      this.enquiry.message
    };

    emailjs.send(
      'service_zr1rvfc',
      'template_g5ukv2c',
      templateParams,
      'Gi0VCSNH0aKzmfaif'
    )
    .then(() => {
      this.isLoading = false;
      this.submitted = false;
      this.successMessage = 'Message sent! I will get back to you soon.';
      this.enquiry = { name: '', surname: '', email: '', phone: '', message: '' };
      this.fieldErrors = { name: '', surname: '', email: '', phone: '', message: '' };
    })
    .catch(() => {
      this.isLoading = false;
      this.errorMessage = 'Something went wrong. Please try again or email me directly!';
    });
  }
}
