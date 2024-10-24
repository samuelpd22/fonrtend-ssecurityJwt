export class produto{
    id!:number;
    nome!:string;
    cpf!:string;
    endereco!:string;
    telefone!:string;
    email!:string;
    
    
    constructor(id:number,nome:string ,cpf:string,endereco:string,telefone:string,email:string){
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.endereco = endereco;
      this.telefone = telefone;
      this.email = email;

     
    }
  }