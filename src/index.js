const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

/**
 * O que é preciso pra criar uma conta?
 * cpf - string
 * name - string
 * id - uuid
 * statement []
*/

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    /**Verificando se o cpf a ser cadastrado já existe ou não, pois uma das
     *  regras de negócio não permite cadastro de cpf repetido */

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if(customerAlreadyExists){
        return response.status(400).json({ error: "Customer already exists!" })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send();

});

app.listen(3333);