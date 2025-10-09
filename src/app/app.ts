import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './main-content/shared/header/header';
import { Footer } from './main-content/shared/footer/footer'; 


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, Footer,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sunnysblog');
}
