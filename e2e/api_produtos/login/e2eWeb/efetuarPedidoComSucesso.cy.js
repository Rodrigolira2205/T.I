///<reference types = "cypress" />

import loc from '../../../../support/locators'

describe('Teste E2E  - Realizacao de pedido com sucesso',() => {
    beforeEach(() => {
        cy.visit('http://www.saucedemo.com/')
    });

    it('Deve realizar um pedido com sucesso', () => {
         cy.gui_login('standard_user', 'secret_sauce')

         cy.get('.title').should('contain', 'Products')

         cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

         cy.get(loc.LISTAGEM_ITENS.PRIMEIRO).should('contain', 'Sauce Labs Onesie')
         cy.get(loc.LISTAGEM_ITENS.SEGUNDO).should('contain', 'Sauce Labs Bike Light')
         cy.get(loc.LISTAGEM_ITENS.TERCEIRO).should('contain', 'Sauce Labs Bolt T-Shirt')

         cy.adicionarItemNoCarrinho('Sauce Labs Onesie')
         cy.adicionarItemNoCarrinho('Sauce Labs Bike Light')
         cy.adicionarItemNoCarrinho('Sauce Labs Bolt T-Shirt')

         cy.get('.shopping_cart_badge').should('have.text', '3').click()
         cy.get(loc.CARRINHO_ITENS.PRIMEIRO).should('contain', 'Sauce Labs Onesie')
         cy.get(loc.CARRINHO_ITENS.SEGUNDO).should('contain', 'Sauce Labs Bike Light')
         cy.get(loc.CARRINHO_ITENS.TERCEIRO).should('contain', 'Sauce Labs Bolt T-Shirt')
         cy.get('[data-test="checkout"]').click()

         cy.informarDadosDoComprador('Rodrigo', 'Lira', '11055_001')
         cy.get('[data-test="continue"]').click()

         
         cy.get(loc.CARRINHO_ITENS.PRIMEIRO).should('contain', 'Sauce Labs Onesie')
         cy.get(loc.CARRINHO_ITENS.SEGUNDO).should('contain', 'Sauce Labs Bike Light')
         cy.get(loc.CARRINHO_ITENS.TERCEIRO).should('contain', 'Sauce Labs Bolt T-Shirt')
         cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')
         cy.get('[data-test="finish"]').click()
         
         cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')


    })
})