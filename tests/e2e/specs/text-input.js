describe('Text Input test Suite', () => {
  beforeEach(() => {
    cy.visit('/'); // "baseUrl" is defined in cypress.json file
  });

  context('Change Value', () => {
    it.only('should allow me to change value', () => {
      cy.get('input[type="email"').type('jon.snow@gmail.com').blur();
      cy.get('[data-cy=form-values]').should('contain', 'jon.snow@gmail.com');
    });
  });
});
