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
  it("Create a new board", () => {
    cy.visit("/");
    cy.get('[role="newBoardBtn').click();
    // cy.get('[role="addBoardForm"]');
    cy.get('input[name="name"]').type("Test Board");
    cy.get('input[name="columns.0.name"]').type("Column One");
    cy.get('button[data-cy="addColumn"]').click();
    cy.get('input[name="columns.1.name"]').type("Column Two");
    cy.get('button[type="submit"]').click();
    cy.get('[role="addBoardForm"]').should("not.exist");
    cy.contains("Test Board").should("exist");
    cy.contains("Column One").should("exist");
    cy.contains("Column Two").should("exist");
  });

  it("Add Task", () => {
    cy.get(`[role="addTask"]`).click();
    cy.get('input[name="title"]').type("Test Task");
    cy.get('textarea[name="description"]').type("Test Description");
    cy.get('input[name="subtasks.0.name"]').type("Test Subtask");
    cy.get('button[data-cy="add-subtask"]').click();
    cy.get('input[name="subtasks.1.name"]').type("Test Subtask 2");
    cy.get('button[data-cy="select"]').click();
    cy.get('li[data-cy="Column Two"]').click();
    cy.get('button[type="submit"]').click();
    cy.contains("Test Task").should("exist").click();
    cy.contains("Test Description").should("exist");
    cy.contains("Test Subtask").should("exist");
    cy.contains("Test Subtask 2").should("exist");
    cy.contains("Column Two").should("exist");
    cy.get(".fixed.inset-0.bg-black.bg-opacity-25.opacity-100").click({
      force: true,
    });
  });

  // Edit Task
  
  // Delete Task

  // Delete Board

  // Logout
});

export {};