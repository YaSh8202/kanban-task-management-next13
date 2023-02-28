describe("New Board", () => {
  before(() => {
    cy.log(`Visiting http://localhost:3000`);
    const user = {
      name: "Test User",
      email: "test@cypress.com",
      birthdate: "12/02/13",
      image: "https://i.imgur.com/4KeKvtH.png",
    };
    cy.login(user);
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
