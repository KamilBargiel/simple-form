// Your tests go in here. Happy coding! 🤓
import { submitTicketForm } from '../../src/submitTicketForm'

describe('stubs', function () {
    // beforeEach(function () {
    //     cy.visit('http://localhost:3000')
    // })

    it('failed 500', function () {
        cy.intercept('POST', 'https://api.livechatinc.com/v2/tickets/new', {
            statusCode: 500,
            body: {
                error: 'internal server error',
            },
        }).as('api')
        cy.visit('http://localhost:3000')
        cy.get('input#name').type('aa')
        cy.get('input#email').type('aa@aa.gmail')
        cy.get('input#subject').type('aa')
        cy.get('textarea#message').type('aa')
        cy.get('button[type=submit]').click()
        cy.wait('@api').should(({ response }) => {
            expect(response).to.have.property('statusCode').eq(500)
            expect(response)
                .to.have.property('body')
                .to.have.property('error')
                .eq('internal server error')
        })
        cy.get('h1.fail').should('contain', 'Error!')
    })
    it('success 200', function () {
        cy.intercept('POST', 'https://api.livechatinc.com/v2/tickets/new', {
            statusCode: 200,
            body: {
                id: 'ABCD',
            },
        }).as('api')
        cy.visit('http://localhost:3000')
        cy.get('input#name').type('aa')
        cy.get('input#email').type('aa@aa.gmail')
        cy.get('input#subject').type('aa')
        cy.get('textarea#message').type('aa')
        cy.get('button[type=submit]').click()
        cy.wait('@api').should(({ response }) => {
            expect(response).to.have.property('statusCode').eq(200)
            expect(response)
                .to.have.property('body')
                .to.have.property('id')
                .eq('ABCD')
        })
        cy.get('h1.success').should('contain', 'Thank you!')
    })
})
