describe('Authenticated user can ', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/articles', {
      fixture: 'articles.json',
    }).as('getArticles')

    cy.visit('/')
  })

  describe('subscribe by clicking subsciption button when authenticated', () => {
    beforeEach(() => {
      cy.window().its('store').invoke('dispatch', {
        type: 'SET_USER_AUTHENTICATED',
        payload: true,
      })
    })

    it('is expected to display a subscribe button', () => {
      cy.get('[data-cy=subscribe-button]').should('be.visible')
    })

    it('is to inform user that they have subscribed after clicking button', () => {
      cy.get('[data-cy=subscribe-button]').click()
      cy.get('[data-cy=flash-message]').should(
        'Contain.text',
        "You've succesfully subscribed",
      )
    })

    it('is expected not to show the subscribe button once user is subcribed', () => {
      cy.get('[data-cy=subscribe-button]').click()
      cy.get('[data-cy=subscribe-button]').should('not.exist')
    })
  })
  
  describe('not see the subscribe  button when not authenticated', () => {
    it('is expected to not render a subscrbe button', () => {
      cy.get('[data-cy=subscribe-button]').should('not.exist')
    })
  })
  
})

