describe('Visitor can switch to sport news category tab', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/articles', {
      fixture: 'articles.json',
    }).as('getArticles')

    cy.intercept('GET', 'https://api.opencagedata.com/geocode/v1/json**', {
      fixture: 'location.json',
    }).as('getLocation')

    cy.visit('/', {
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 57.7308044,
            longitude: 11.9834368,
          },
        }
        cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake(
          (callback) => {
            return callback(stubLocation)
          },
        )
      },
    })
  })

  it('is expected to make a GET request to the API', () => {
    cy.wait('@getArticles').its('request.method').should('eq', 'GET')
  })

  it('is expected to articles sorted by sport ', () => {
    cy.get('[data-cy=articles-list]')
      .first()
      .should(
        'contain.text',
        'Business 1 Business 2 Business 3 Sports 1 Sports 2 Sports 3',
      )
  })

  it('is expected to display Sport News header', () => {
    cy.get('[data-cy=sports-link]').should('contain.text', 'Sports News')
  })

  it('is expected to display relevant category articles on clicking ', () => {
    cy.get('[data-cy=sports-link]').click()
    cy.get('[data-cy="category_header"]').should('contain', 'sports')
  })
})

describe('visitor can switch to business news category tab', () => {
  it('is expected to display Business News header', () => {
    cy.get('[data-cy=business-link]').should('contain.text', 'Business News')
  })
  it('is expected to display relevant category articles on clicking ', () => {
    cy.get('[data-cy=business-link]').click()
    cy.get('[data-cy=category_header]').should('contain', 'business')
  })

  it('is expected to see business article title', () => {
    cy.get('[data-cy=business-link]').click()
    cy.get('[data-cy=articles-list]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy=article-title]')
          .should('contain.text', 'Business 2')
          .and('be.visible')
      })
  })
})
