describe('Login Demo', () => {
  beforeEach(() => {
    cy.visit('/basic'); // "baseUrl" is defined in cypress.json file
  });

  context('Basic Events', () => {
    it('should get focused when input is clicked', () => {
      cy.get('input[name="username"]').click();
      cy.get('input[name="username"]').should('be.focus');
    });

    it('should get blurred when input is leaved', () => {
      cy.get('input[name="username"]').click();
      cy.get('input[name="username"]').blur();
      cy.get('input[name="username"]').should('not.be.focus');
    });
  });
});
