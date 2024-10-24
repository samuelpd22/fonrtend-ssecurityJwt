import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AuthContentComponent } from "./auth-content/auth-content.component";
import { ContentComponent } from "./content/content.component";
//import { ProdutosComponent } from "./produtos/produtos.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AuthContentComponent, ContentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
/*
  isProdutosRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Verifica se a URL é exatamente '/produtos'
      this.isProdutosRoute = this.router.url === '/produtos';
    });
  }*/
}
