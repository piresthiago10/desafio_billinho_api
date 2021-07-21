# Billinho API 

API para gerenciar as mensalidades dos alunos

# Autores:

* **Thiago Pires** - *Desenvolvedor Backend*;

## Requisitos do sistema:

* NPM - npm@6.14.13;
* PostgreSQL;
* Express - 4.17.1;
* express-basic-auth - 1.2.0;
* body-parser - 1.19.0;
* cpf - 2.0.1;
* moment - 2.29.1;
* pg -8.6.0;
* sequelize - 6.6.5;

## Instalção:

**Atencção!** No arquivo config/default.json existem configurações do projeto, banco de dados, api e login.

1. Clone o projeto:
```
git clone https://github.com/piresthiago10/desafio_billinho_api.git
```
2. Instale as dependências :
```
npm install
```
3. Rode a api (arquivo index.js no diretorio raiz do projeto):
```
node api/index.js
```

## Rotas da API:

Student:
```
Post: localhost:3000/api/students

{
    "name": "Bia",
    "cpf": "685.003.370-01",
    "birthdate": "05/09/2000",
    "payment_method": "boleto"
}

Get: localhost:3000/api/students => Lista os alunos
     localhost:3000/api/students/:idStudent => Detalhe aluno
     localhost:3000/api/students/:idStudent/enrollment => Matrículas do aluno

Put: localhost:3000/api/students/:idStudent

{
    "name": "Bia",
    "cpf": "685.003.370-01",
    "birthdate": "10/09/2000",
    "payment_method": "credit_card"
}

Delete: localhost:3000/api/students/:idStudent
```

Enrollment:
```
Post: localhost:3000/api/students/:idStudent/enrollment/ (Necessário Autenticação)

{
    "amount": 1500000,
    "installments": 30,
    "due_day": 31
}

Get: localhost:3000/api/students/:idStudent/enrollment => Lista matrículas de aluno
     localhost:3000/api/students/:idStudent/enrollment/:idEnrollment => Detalhe da matrícula

Put: localhost:3000/api/students/:idStudent/enrollment/:idEnrollment 

{
    "amount": 1500000,
    "installments": 26,
    "due_day": 15
}

Delete: localhost:3000/api/students/:idStudent/enrollment/:idEnrollment

```


## Ferramentas utilizadas

* [Visual Studio Code](https://code.visualstudio.com/)
* [Postman](https://www.postman.com/)