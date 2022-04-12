/* eslint-disable no-undef */
describe("Visitor  can ", () => {
  describe("see a full single article when authenticated", () => {
    beforeEach(() => {
      cy.intercept("GET", "api/articles", {
        fixture: "articles.json",
      }).as("getArticles");
      cy.visit("/");
      cy.window().its("store").invoke("dispatch", {
        type: "SET_USER_AUTHENTICATED",
        payload: true,
      });
      cy.intercept("GET", "**/article/**", {
        fixture: "articleShow.json",
      }).as("getSingleArticle");
      cy.get("[data-cy=head-lines]").first().click();
    });



    it.only("is expected to not display the sign in button for an authenticated user", () => {
      cy.get("[data-cy=login-button]").should("not.exist");
    });

    it("is expected to display correct url", () => {
      cy.url().should("contain", "http://localhost:3000/article/1");
    });
    it("is expected to redirect user to selected article after loggin in", () => {
      cy.url().should("eq", "http://localhost:3000/article/1");
    });

    it("is expected to display the body of the article", () => {
      cy.get("[data-cy=article-body]").should(
        "contain.text",
        "Lorem ipsum dolor"
      );
    });
  });

  describe("cannot see an full article when unauthenticated", () => {
    beforeEach(() => {
      cy.intercept("GET", "api/articles", {
        fixture: "articles.json",
      }).as("getArticles");

      cy.intercept("GET", "**/article/**", {
        fixture: "articleShow.json",
      }).as("getSingleArticle");

      cy.visit("/");

      cy.get("[data-cy=head-lines]").first().click();
    });

    it("is expected to ask the user to sign in", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain.text",
        "Please login to view full articles"
      );
    });

    it("is expected to redirect user to login screen", () => {
      cy.url().should("contain", "http://localhost:3000/login");
    });
  });
});
