import { Component, OnInit } from '@angular/core';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { LoginFormComponent } from "../login-form/login-form.component";
import { AxiosService } from '../service/axios.service';
import { AuthContentComponent } from "../auth-content/auth-content.component";
import { ButtonsComponent } from '../buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-content',
  standalone: true,
  imports: [WelcomeContentComponent, LoginFormComponent, AuthContentComponent, ButtonsComponent, CommonModule, ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  componentToShow: string = "welcome";


  constructor(private axiosService: AxiosService){}


  ngOnInit(): void {
    this.checkAuthToken();
  }


  showComponent( componentToShow : string) : void{
    this.componentToShow = componentToShow;
  }

  onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/login",
		    {
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "welcome";
				this.showErrorAlert(); // Chama a função para mostrar o alerta de err
		    }
		);

	}



  onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "welcome";
		    }
		);
	}


	private checkAuthToken(): void {
		const token = this.axiosService.getAuthToken();
		if (token) {
		  // Se o token existe, pode redirecionar para a seção de mensagens ou outra lógica
		  this.componentToShow = "messages";
		} else {
		  // Se não existe, mostrar o welcome ou login
		  this.componentToShow = "welcome";
		}
	  }

	  private showErrorAlert(): void {
		Swal.fire({
		  icon: 'error',
		  title: 'Erro',
		  text: 'Usuário ou senha incorretos.',
		  confirmButtonText: 'OK'
		});
	  }

	  onLogout(): void {
		this.axiosService.setAuthToken(null); // Limpa o token
		this.componentToShow = "welcome"; // Retorna para a tela de boas-vindas
	  }
}