import { Component } from '@angular/core';
import { produto } from '../models/produto';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ProdutosService } from '../service/produtos.service';
import { Router } from 'express';
import { FormsModule, } from '@angular/forms';  // Importe o FormsModule
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MdbFormsModule,FormsModule, CommonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  produtos: produto[] = []; // Agora é um array de produtos
  mensagem: string = '';
  produtosEdit: produto = new produto(0,"","","","","")

  constructor(private produtoService: ProdutosService, private router: Router) {
    this.listAll();

  }


  listAll(){          //ESTRUTURA PARA METODOD GET RETORNAR
    this.produtoService.listAll().subscribe({
      next:lista => { //QUANDO DER CERTO
        this.produtos = lista;

      },
      error: err => { //QUANDO OCORRER ERRO


      }
    });
 };

 salvarProduto() {
  if (this.produtosEdit.nome) {
    this.produtoService.save(this.produtosEdit).subscribe({
      next: mensagem => {
        alert("Salvo com sucesso");
        console.log(this.produtosEdit)

        //this.listAll();
      },
      error: erro => {
        alert("Ocorreu algum erro");
      }
    });
  } else {
    alert("Por favor, preencha todos os campos");
  }
}



}




