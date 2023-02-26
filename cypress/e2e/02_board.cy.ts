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
  it("Create a new board", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("[data-testid=newBoardBtn]").click();
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
  it("Edit Task", () => {
    cy.wait(1000);
    cy.contains("Test Task").should("exist").click();
    cy.get("label")
      .contains("Test Subtask", {
        matchCase: true,
      })
      .parent()
      .find("input")
      .click();
    cy.get("label")
      .contains("Test Subtask 2", {
        matchCase: true,
      })
      .parent()
      .find("input")
      .check();
    cy.get('button[data-cy="select"]').click();
    cy.get('li[data-cy="Column One"]').click();
    cy.get(".fixed.inset-0.bg-black.bg-opacity-25.opacity-100").click({
      force: true,
    });
    cy.wait(2000);
    cy.contains("Test Task", {})
      .should("exist")
      .parent()
      .parent()
      .siblings()
      .contains("Column One")
      .should("exist");
    cy.contains("Test Task").click();
    cy.contains("Test Subtask").parent().find("input").should("be.checked");
    cy.contains("Test Subtask 2").parent().find("input").should("be.checked");
    cy.get("button[data-cy='select']")
      .get("span")
      .should("contain", "Column One");
    cy.get(".fixed.inset-0.bg-black.bg-opacity-25.opacity-100").click({
      force: true,
    });
  });

  // Delete Task
  it("Delete Task", () => {
    cy.contains("Test Task").parent().click();
    cy.get('button[data-cy="deleteTask"]').click();
    cy.get('button[data-cy="confirmDelete"]').click();
    cy.contains("Test Task").should("not.exist");
  });

  // Delete Board
  it("Delete Board", () => {
    cy.get('[data-cy="deleteBoard"]').click();
    cy.get('[data-cy="confirmDeleteBoard"]').click();
    cy.contains("Test Board").should("not.exist");
  });
});

export {};
