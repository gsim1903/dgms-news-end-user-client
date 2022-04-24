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
      
      cy.wait(1000)
      cy.fillInPaymentFormField('cardnumber', '4242424242424242')
      cy.fillInPaymentFormField('exp-date', '1122')
      cy.fillInPaymentFormField('cvc', '999')
      cy.get('[data-cy=submit-payment]').click()
    })
    it('is expected to display a success message', () => {
      cy.get('[data-cy=message]').should(
        'contain.text',
        'thank you for subscribing!',
      )
    })
    it('is expected to the last four digits of the card number are 4242', () => {
       cy.get("[data-cy=cardnumber]").should("exist")
     })
  })
})


