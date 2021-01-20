describe('Toggle Visibility', () => {
  beforeEach(() => {
    cy.visit('/toggle-visibility'); // "baseUrl" is defined in cypress.json file
  });

  context('Basic Events', () => {
    it('first input should be invisible when toggle visibility is false using CustomClass property', () => {
      cy.get('input[name="hideUsingCustomClass"]').check();
      cy.get('input[name="hideMe"]').should('not.be.visible');
    });

    it('first input should be visible again when toggle visibility is true using CustomClass property', () => {
      cy.get('input[name="hideUsingCustomClass"]').check();
      cy.get('input[name="hideMe"]').should('not.be.visible');
      cy.get('input[name="hideUsingCustomClass"]').uncheck();
      cy.get('input[name="hideMe"]').should('be.visible');
    });

    it('second input should be invisible when toggle visibility is false using CustomStyle property', () => {
      cy.get('input[name="hideUsingCustomStyles"]').check();
      cy.get('input[name="hideMe2"]').should('not.be.visible');
    });

    it('second input should be visible again when toggle visibility is true using CustomClass property', () => {
      cy.get('input[name="hideUsingCustomStyles"]').check();
      cy.get('input[name="hideMe2"]').should('not.be.visible');
      cy.get('input[name="hideUsingCustomStyles"]').uncheck();
      cy.get('input[name="hideMe2"]').should('be.visible');
    });
  });
});
