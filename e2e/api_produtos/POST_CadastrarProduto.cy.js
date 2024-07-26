///<reference types = "cypress" />

const faker = require('faker')

describe('Validar Cadastro de Produto', () => {
    let token
    let body

    before(() => {
        cy.api_login('fulano@qa.com', 'teste')
            .then(response => {
                token = response.body.authorization

            })
    });

    beforeEach(() => {
        cy.construirBodyProduto()
            .then(construido => {
                body = construido
            })

    });

    it('Cadastrar produto', () => {
        cy.POST_CadastrarProduto(body, token)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')

            })
    })

    it('Validar Cadastro de produto já exixtente', () => {
        cy.POST_CadastrarProduto(body, token)
            .then(() => {
                return cy.POST_CadastrarProduto(body, token)
            }).then(response => {

                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')


            })
    })
})