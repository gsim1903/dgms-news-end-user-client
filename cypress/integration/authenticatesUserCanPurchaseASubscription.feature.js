describe('authenticates user can purchase a sub', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/articles', {
      fixture: 'articles.json',
    }).as('getArticles')
   // cy.intercept("POST", "https://r.stripe.com/0", { statusCode: 201 })
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'SET_USER_AUTHENTICATED',
      payload: true,
    })
    cy.get('[data-cy=subscription-button]').as('subscriptionButton')
  })
  it('is expected to see a purchase subscription  button', () => {
    cy.get('@subscriptionButton').should('be.visible')
  })

  

  describe.only('filling in form with valid cc-details', () => {
    beforeEach(() => {
        cy.get('@subscriptionButton').click()
        cy.url().should('contain', '/payment')
      // get the cc data-number, expiry date & cvc
      cy.get('div[data-cy=cc-number]').within(() => {
        cy.get('iframe[name^=__privateStripeFrame]').then(($iframe) => {
          const $body = $iframe.contents().find('body')
          cy.wrap($body)
            .find('input[name=cardnumber]')
            .type('4242424242424242', { delay: 10 })
        })
      })
    })
    it('is expected to get his status to subscriber', () => {})
  })
})
