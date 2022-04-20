describe('authenticates user can purchase a sub', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/articles', {
      fixture: 'articles.json',
    }).as('getArticles')
   cy.intercept("POST", "https://r.stripe.com/0", { statusCode: 201 })
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

  
  describe('filling in form with valid cc-details', () => {
    beforeEach(() => {
        cy.get('@subscriptionButton').click()
        cy.url().should('contain', '/payment')
      // get the cc data-number, expiry date & cvc
      cy.wait(2000)
      cy.get('div[data-cy=cardnumber]').within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then((iframe) => {
          const body = iframe.contents().find('body')
          //cy.wrap(body).find('[name="cardnumber"]').type('4242424242424242', { delay: 2 })
          cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242', { delay: 2 });
        })
      })
    })
    it('is expected to the last four digits of the card number are 4242', () => {
      cy.get("[data-cy=cardnumber]").should("contain",4242)
    })
  })
})
