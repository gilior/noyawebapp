import { Component, inject, OnInit, signal } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Add this import
import emailjs from '@emailjs/browser';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { VideoGalleryComponent } from '../../components/video-gallery/video-gallery.component';
import { HeroComponent } from '../../components/home-hero/hero.component';
import { WelcomeComponent } from '../../components/home-welcome/welcome.component';
import { RadioComponent, RadioTrack } from '../../components/radio/radio.component';
import { HomeCardsComponent, HomeCardMedia } from '../../components/home-cards/home-cards.component';
import { PressComponent } from '../../components/press/press.component';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'noya-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule, ReactiveFormsModule, NgbToastModule, ContactFormComponent, VideoGalleryComponent, HeroComponent, WelcomeComponent, RadioComponent, HomeCardsComponent, PressComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  // Convert the property to a signal
  showVerificationField = signal(false);
  submissionSuccessful = signal(false);
  submissionError = signal(false);
  incorrectCode: boolean = false;
  verificationCode: number | null = null;
  verificationCodeTime: number = Date.now();
  codeWasSent: boolean = false;

  currentTrack: RadioTrack = {
    title: $localize`Astor Piazzolla - Histoire Du Tango, Bordel 1900`,
    artist: $localize`Avner Geiger - Flute, Noya Schleien - Percussion`,
    details: $localize`(arr. for Flute & Percussion - Noya Schleien) (Live)`,
    album: $localize`Noya Schleien Recordings`,
    audioSrc: 'https://music.wixstatic.com/preview/6ddb5b_21a3d1b1b6f143389f6d3a3301337a1f-128.mp3',
    imageSrc: 'https://static.wixstatic.com/media/6ddb5b_6aa9490a4d234b4ebdb719bdd7a70047~mv2.jpg/v1/fill/w_232,h_232,q_85,usm_0.66_1.00_0.01/6ddb5b_6aa9490a4d234b4ebdb719bdd7a70047~mv2_mscwdt.jpg'
  };

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor() { }

  ngOnInit(): void {

  }



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
      this.codeWasSent = true;
      return null;
    };
  }

  private generateVerificationCode(): number {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
  }

  private sendVerificationEmail(email: string, code: number): void {
    // Update the signal value
    this.showVerificationField.set(true);

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
    this.codeValidator(); // Validate the verification code
    if (this.profileForm.invalid) {
      return;
    }
    if (!this.codeWasSent) { // Unverified user
      this.sendVerificationCode();
      return;
    }
    else { // codeWasSent
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
        this.codeWasSent = false;
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
          this.submissionError.set(true);
        }, 10000);
      });
  }

  sendVerificationCode() {

    this.verificationCode = this.generateVerificationCode();
    this.verificationCodeTime = Date.now();
    this.sendVerificationEmail(this.profileForm.get("email")?.value || '', this.verificationCode);
    // alert('A verification code has been sent to your email. Please enter the code to proceed.');

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
