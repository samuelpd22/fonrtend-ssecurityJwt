import { Component } from '@angular/core';
import { AxiosService } from '../service/axios.service';
import { response } from 'express';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando o CommonModule
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { produto } from '../models/produto';
import { ProdutosService } from '../service/produtos.service';
import Swal from 'sweetalert2';
import { FormsModule, } from '@angular/forms';  // Importe o FormsModule



@Component({
  selector: 'app-auth-content',
  standalone: true,
  imports: [CommonModule,MdbFormsModule,FormsModule],
  templateUrl: './auth-content.component.html',
  styleUrl: './auth-content.component.css'
})
export class AuthContentComponent {
data:string[] = [];

constructor(private axiosService : AxiosService,private produtoService: ProdutosService){
  this.listAll();
}
ngOnInit(): void {
  this.axiosService.request(
      "GET",
      "/messages",
      {}).then(
      (response) => {
          this.data = response.data;
      }).catch(
      (error) => {
          if (error.response.status === 401) {
              this.axiosService.setAuthToken(null);
          } else {
              this.data = error.response.code;
          }

      }
  );
}


produtos: produto[] = []; // Agora é um array de produtos
mensagem: string = '';
produtosEdit: produto = new produto(0,"","","","","")

formVisible = false; // Controla a visibilidade do formulário
toggleForm() {
  this.formVisible = !this.formVisible;
}

closeForm() {
  this.formVisible = false;
}









listAll(){          //ESTRUTURA PARA METODOD GET RETORNAR
  this.produtoService.listAll().subscribe({
    next: (response) => {
      this.produtos = response; // Atribui a resposta ao array de produtos
      console.log('Produtos recebidos:', this.produtos); // Para verificação
    },
    error: (err) => {
      console.error('Erro ao listar produtos:', err);
    }
  });
}

  salvarProduto() {
    if (this.produtosEdit.nome) {
      this.produtoService.save(this.produtosEdit).subscribe({
        next: mensagem => {
          alert("Salvo com sucesso");
          console.log(this.produtosEdit)
          this.closeForm()

          this.listAll();
        },
        error: erro => {
          alert("Ocorreu algum erro");
        }
      });
    } else {
      alert("Por favor, preencha todos os campos");
    }
  }


  deleteProduto(id: number): void {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
        if (result.isConfirmed) {
            this.produtoService.deleteById(id).subscribe({
                next: () => {
                    Swal.fire(
                        'Deletado!',
                        'O cliente foi deletado com sucesso.',
                        'success'
                    );
                    this.listAll(); // Atualiza a lista de produtos
                },
                error: (err) => {
                    this.listAll();
                }
            });
        }
    });
  }
}
