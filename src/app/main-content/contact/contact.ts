import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  http = inject(HttpClient);

  lang: 'DE' | 'EN' = 'DE';
  private langSubscription: any;
  translate = {
   
    DE: {
      placeholders: {
        name: 'Dein Name',
        email: 'Deine E-Mail',
        message: 'Deine Nachricht',
      },
      errors: {
        name: 'Bitte gib deinen Namen ein',
        email: 'Bitte gib eine gültige E-Mail ein',
        message: 'Bitte gib eine Nachricht ein',
      },
      privacy: 'Bitte akzeptiere die Datenschutzbestimmungen',
      privacyPolicy: 'Datenschutzrichtlinien',
      submit: 'Senden',
      success: 'Danke für deine Nachricht! Ich melde mich bald zurück!',
    },
     EN: {
      placeholders: {
        name: 'Your name',
        email: 'Your email',
        message: 'Your message',
      },
      errors: {
        name: 'Please enter a name',
        email: 'Please enter a valid email',
        message: 'Please enter a message',
      },
      privacy: 'Please accept the privacy policy',
      privacyPolicy: 'privacy policy',
      submit: 'Send',
      success: "Thanks for your message! I'll respond soon!",
    },
  };

  contactData = {
    name: '',
    email: '',
    message: '',
    acceptedPrivacy: false,
  };
  formIsSent = false;
  formHasError = false;
  mailTest = false;

  post = {
    endPoint: 'https://irina-gorges.de/contact.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
      },
      responseType: 'text' as 'json', // 'text' is used to handle the response as plain text
    },
  };

  // Formulardaten aus localStorage laden
  constructor() {}

  // ngOnInit() {
  //   // Sprache abonnieren
  //   this.langSubscription = this.languageService.currentLang.subscribe((lang) => {
  //     this.lang = lang;
  //   });
  //   // Formulardaten laden
  //   const savedData = localStorage.getItem('contactFormData');
  //   if (savedData) {
  //     this.contactData = JSON.parse(savedData);
  //   }
  // }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  // Formulardaten speichern bei jeder Änderung
  onInputChange() {
    localStorage.setItem('contactFormData', JSON.stringify(this.contactData));
  }

  getIconType(model: any): 'error' | 'success' | boolean {
    if (model.touched) {
      if (model.valid) return 'success';
      if (model.invalid) return 'error';
    }
    return false;
  }

  isInvalid(model: any): boolean {
    return model.invalid && model.touched;
  }

  isValid(model: any): boolean {
    return model.valid && model.touched;
  }

  getErrorMessage(
    model: any,
    field: 'name' | 'email' | 'message'
  ): string | boolean {
    if (!model.touched || model.valid) return false;
    return this.translate[this.lang].errors[field];
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(
          this.post.endPoint,
          this.post.body(this.contactData),
          this.post.options
        )
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.formIsSent = true;
            // Nach erfolgreichem Absenden localStorage leeren
            localStorage.removeItem('contactFormData');
          },
          error: (error) => {
            this.formHasError = true;
          },
          complete: () => {
            setTimeout(() => {
              this.formIsSent = false;
              this.formHasError = false;
            }, 5000);
          },
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
    // Beispiel: Zugriff auf Übersetzung für Erfolgsmeldung
    // this.translate[this.lang].success
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

