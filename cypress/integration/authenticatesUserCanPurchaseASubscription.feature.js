describe("authenticated user", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/articles", {
      fixture: "articles.json",
    });
    cy.intercept("POST", "https://r.stripe.com/0", { statusCode: 201 });
  });
  describe("when user purchase subscription successfully", () => {
    beforeEach(() => {
      cy.intercept("POST", "api/subscriptions", {
        statusCode: 201,
        body: { paid: true },
      });
      cy.visit("/");
      cy.window().its("store").invoke("dispatch", {
        type: "SET_USER_AUTHENTICATED",
        payload: true,
      });
      cy.get("[data-cy=subscription-button]").as("subscriptionButton");
    });
    it("is expected to see a purchase subscription button", () => {
      cy.get("@subscriptionButton").should("be.visible");
    });

    describe("filling in a form with valid cc-details", () => {
      beforeEach(() => {
        cy.get("@subscriptionButton").click();
        cy.url().should("contain", "/payment");

        cy.wait(1000);
        cy.fillInPaymentFormField("cardnumber", "4242424242424242");
        cy.fillInPaymentFormField("exp-date", "1223");
        cy.fillInPaymentFormField("cvc", "123");
        cy.get("[data-cy=submit-payment]").click();
      });
      it("is expected to display a success message", () => {
        cy.get("[data-cy=message]").should(
          "contain.text",
          "Thank you for subscribing!"
        );
      });
    });
  });

  describe("when user cannot purchase subscription successfully", () => {
    beforeEach(() => {
      cy.intercept("POST", "api/subscriptions", {
        statusCode: 402,
        fixture: "lost_card_response.json",
      }).as("lostCardResponse");
      cy.visit("/");
      cy.window().its("store").invoke("dispatch", {
        type: "SET_USER_AUTHENTICATED",
        payload: true,
      });
      cy.get("[data-cy=subscription-button]").as("subscriptionButton");
      cy.get("@subscriptionButton").click();
      cy.url().should("contain", "/payment");

      cy.wait(1000);
      cy.fillInPaymentFormField("cardnumber", "4000000000009987");
      cy.fillInPaymentFormField("exp-date", "1223");
      cy.fillInPaymentFormField("cvc", "123");
      cy.get("[data-cy=submit-payment]").click();
    });
    
    it("is expected to cancel transcation when lost card is reported", () => {
      cy.wait("@lostCardResponse").then(() => {});
    });
  });
});
