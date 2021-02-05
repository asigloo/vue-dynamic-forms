describe('Reset after submission', () => {
  beforeEach(() => {
    cy.visit('/reset-after-submit'); // "baseUrl" is defined in cypress.json file
  });

  context('Basic Events', () => {
    it('should reset the form if resetAfterSubmit is checked', () => {
      cy.get('input[name="resetAfterSubmit"]').check();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="name"]').should('not.have.value', null);
    });

    it('should reset the form if resetAfterSubmit is unchecked', () => {
      cy.get('input[name="resetAfterSubmit"]').uncheck();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="name"]').should('have.value', 'Awiwiwi');
    });
  });
});
