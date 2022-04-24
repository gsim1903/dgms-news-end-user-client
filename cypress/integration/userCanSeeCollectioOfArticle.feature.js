describe('user can see a collection of articles', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/articles', {
      fixture: 'articles.json',
    }).as('getArticles')

    cy.intercept('GET', 'https://api.opencagedata.com/geocode/v1/json**', {
      fixture: 'location.json',
    }).as('getLocation')

    cy.visit("/", {
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 57.7308044,
            longitude: 11.9834368,
          },
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(stubLocation);
          }
        );
      },
    });

  })

  it('is expected to make a GET request to the API', () => {
    cy.wait('@getArticles').its('request.method').should('eq', 'GET')
  })

  it('is expected to display a collection of 3 articles', () => {
    cy.get('[data-cy=articles-list]').children().should('have.length', 1)
  })

  it('is expected that the first title will be Sports and Business', () => {
    cy.get('[data-cy=articles-list]')
      .first()
      .should(
        'contain.text',
        'Business 1 Business 2 Business 3 Sports 1 Sports 2 Sports 3',
      )
  })
  it('is expected that the last title will be Business 3', () => {
    cy.get('[data-cy=articles-list]').last().should('contain', 'Business 3')
  })
})