describe("New Board", () => {
  before(() => {
    cy.log(`Visiting http://localhost:3000`);
    const cookieName = Cypress.env("COOKIE_NAME");
    const cookie = cy.getCookie(cookieName);
    if (!cookie) {
      cy.log(`Cookie ${cookieName} not found`);
    }
    cy.visit("/");
  });

  // Logout
  it("Logout", () => {
    cy.get('button[data-cy="menuBtn"]').should("be.visible").click();
    cy.get('button[data-cy="logoutBtn"]').should("be.visible").click();
    cy.url().should("include", "/auth/signin");
  });
});

export {};
