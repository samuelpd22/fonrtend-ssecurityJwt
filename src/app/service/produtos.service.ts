import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { produto } from '../models/produto';
import { StorageService } from './StorageService'

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  http = inject(HttpClient); // Faz requisições
  storage = inject(StorageService); // Injetar o serviço de armazenamento
  API = "http://localhost:8080/produtos";

  constructor() { }

  listAll(): Observable<produto[]> { // Método @GETMapping
    return this.http.get<produto[]>(this.API, {
      headers: this.createAuthorizationHeader() // Adicionar cabeçalho de autorização
    });
  }

  save(product: produto): Observable<string> { // Método @PostMapping
    return this.http.post<string>(this.API, product, {
      responseType: 'text' as 'json',
      headers: this.createAuthorizationHeader() // Adicionar cabeçalho de autorização
    });
  }

  deleteById(id: number): Observable<void> { // Método para deletar por ID
    const url = `${this.API}/delete/${id}`; // URL para a requisição DELETE
    return this.http.delete<void>(url, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders { // Cria a autorização (TOKEN) no cabeçalho
    const token = this.storage.getItem('auth_token'); // Obter o token do seu StorageService
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }
}
