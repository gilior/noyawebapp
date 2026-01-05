import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'noya-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbToastModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  // Convert the property to a signal
  showVerificationField = signal(false);
  submissionSuccessful = signal(false);
  submissionError = signal(false);
  incorrectCode: boolean = false;
  verificationCode: number | null = null;
  verificationCodeTime: number = Date.now();

  private formBuilder = inject(FormBuilder);
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: [''],
    message: ['', Validators.required],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
    }),
    code: ['', this.codeValidator()]
  });

  ngOnInit(): void {
    // Reset verification if email changes
    this.profileForm.get('email')?.valueChanges.subscribe(() => {
      if (this.showVerificationField()) {
        this.showVerificationField.set(false);
        this.verificationCode = null;
        this.profileForm.get('code')?.setValue('');
      }
    });
  }

  codeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Only validate if verification field is shown
      if (!this.showVerificationField()) {  // Use signal as a function to get its value
        return null;
      }

      const value = control.value;
      // Check if the code is empty when required
      if (!value) {
        return { required: true };
      }

      // Check if the code matches the verification code (from tryVerifyCode logic)
      if (this.verificationCode !== null && parseInt(value, 10) !== this.verificationCode) {
        return { incorrectCode: true };
      }

      // verify that codetime is less than 15 minutes
      if (Date.now() - this.verificationCodeTime > 900000) {
        return { incorrectCode: true };
      }
      return null;
    };
  }

  private generateVerificationCode(): number {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
  }

  private sendVerificationEmail(email: string, code: number): void {
    // Update the signal value
    this.showVerificationField.set(true);
    
    // Update validity of code control so it becomes invalid (required) immediately
    // We also mark it as untouched so the error message doesn't appear until the user interacts with it
    const codeControl = this.profileForm.get('code');
    if (codeControl) {
      codeControl.markAsUntouched();
      codeControl.updateValueAndValidity();
    }

    const datePlus15 = new Date();
    datePlus15.setMinutes(datePlus15.getMinutes() + 15);
    const h = (datePlus15.getHours() % 12) || 12;
    const m = datePlus15.getMinutes().toString().padStart(2, '0');
    const s = datePlus15.getSeconds().toString().padStart(2, '0');
    const ampm = datePlus15.getHours() >= 12 ? 'PM' : 'AM';
    const timeString = `${h}:${m}:${s} ${ampm}`;
    const templateParams = {
      time: timeString,
      verification_code: code.toString(),
      email: email
    };

    // Send verification email using EmailJS
    emailjs.send(
      'service_ftd5sls',  // Same service ID as your main form
      'template_code', // Create a separate template for verification emails
      templateParams,
      'zT1imSIv8MpakcyKE'   // Same public key as your main form
    )
      .then((response) => {
        console.log('Verification code sent successfully!', response);
      })
      .catch((error) => {
        console.error('Error sending verification code:', error);
        // alert('Failed to send verification code. Please try again later.');
      });
  }

  onSubmit() {
    this.profileForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    
    if (this.profileForm.invalid) {
      return;
    }
    if (!this.showVerificationField()) { // Unverified user
      this.sendVerificationCode();
    }
    else { // code verified
      this.sendContactForm();
      this.showVerificationField.set(false);  // Update signal value
    }
  }

  private sendContactForm() {
    // Prepare template parameters
    const templateParams = {
      from_name: `${this.profileForm.value.firstName} ${this.profileForm.value.lastName}`,
      from_email: this.profileForm.value.email,
      phone: this.profileForm.value.phone || 'Not provided',
      subject: this.profileForm.value.subject || 'Contact Form Submission',
      message: this.profileForm.value.message,
      address_street: this.profileForm.value.address?.street || 'Not provided',
      address_city: this.profileForm.value.address?.city || 'Not provided'
    };

    // Replace with your actual EmailJS service, template, and user IDs
    emailjs.send(
      'service_ftd5sls',  // e.g., 'gmail'
      'template_contact', // e.g., 'contact_form'
      templateParams,
      'zT1imSIv8MpakcyKE'   // Your EmailJS public key
    )
      .then((response) => {
        this.profileForm.reset();
        this.submissionSuccessful.set(true);

        // Automatically hide the success message after 5 seconds
        setTimeout(() => {
          this.submissionSuccessful.set(false);
        }, 10000);
      })
      .catch((error) => {
        this.submissionError.set(true);

        // Automatically hide the success message after 5 seconds
        setTimeout(() => {
          this.submissionError.set(false);
        }, 10000);
      });
  }

  sendVerificationCode() {
    this.verificationCode = this.generateVerificationCode();
    this.verificationCodeTime = Date.now();
    this.sendVerificationEmail(this.profileForm.get("email")?.value || '', this.verificationCode);
  }

  isInvalid(controlName: string): boolean | undefined {
    const control = this.profileForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  isValid(controlName: string): boolean | undefined {
    const control = this.profileForm.get(controlName);
    return control?.valid && (control?.touched || control?.dirty);
  }
}