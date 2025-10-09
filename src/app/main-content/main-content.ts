import { Component } from '@angular/core';
import { AboutMe } from "./about-me/about-me";
import { Contact } from "./contact/contact";
import { Imprint } from "./imprint/imprint";
import { Privacy } from "./privacy/privacy";

@Component({
  selector: 'app-main-content',
  imports: [AboutMe, Contact, Imprint, Privacy],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {

}
