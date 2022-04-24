describe("visitor can see an single article by authenticating right away", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/articles", {
      fixture: "articles.json",
    }).as("getArticles");
    cy.intercept("GET", "**/article/**", {
      fixture: "articleShow.json",
    }).as("getSingleArticle");

    cy.intercept("POST", "api/auth/sign_in", {
      fixture: "authenticationSuccess.json",
      headers: { uid: "user@email.com" },
    });
    cy.intercept("GET", "api/auth/validate_token**", {
      fixture: "authenticationSuccess.json",
    });

    cy.visit("/", {
      onBeforeLoad(window) {
        const response = { error: { PERMISSION_DENIED: true } };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(response);
          }
        );
      },
    });
  });
  describe("visitor is able and required to authenticate", () => {
    it("is expected to display a sign in button", () => {
      cy.get("[data-cy=login-button]").should("be.visible");
    });

    it("is expected the user will be informed they need to log in", () => {
      cy.get("[data-cy=head-lines]").first().click();
      cy.get("[data-cy=flash-message]").should(
        "contain.text",
        "Please login to view full articles"
      );
    });
  });
  describe("logging in right away", () => {
    beforeEach(() => {
      cy.get("[data-cy=login-button]").click();
      cy.get("[data-cy=login-email]").type("user@email.com");
      cy.get("[data-cy=login-password]").type("password");
      cy.get("[data-cy=submit-button]").click();
    });

    it.only("is expected to redirect user to all articles", () => {
      cy.get("[data-cy=articles-list]").children().should("have.length", 6);
    });
    it("is expected to inform user that login was successful", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain.text",
        "Login successful"
      );
    });
  });
  describe("By clicking an article and then logging in", () => {
    beforeEach(() => {
      cy.get("[data-cy=head-lines]").first().click();
    });

    it("is expected to redirect visitor to login screen", () => {
      cy.url().should("eq", "http://localhost:3000/login");
    });

    it("is expected user to access full article after logging in", () => {
      cy.get("[data-cy=login-email]").type("user@email.com");
      cy.get("[data-cy=login-password]").type("password");
      cy.get("[data-cy=submit-button]").click();
      cy.url().should("eq", "http://localhost:3000/article/1");
    });
  });
});
