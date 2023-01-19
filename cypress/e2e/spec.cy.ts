describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.location('pathname').should('eq','/auth/signin')
    cy.get('[role="login"]').click()
  })
})