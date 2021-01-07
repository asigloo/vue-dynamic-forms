describe('Login Demo', () => {
  beforeEach(() => {
    cy.visit('/login'); // "baseUrl" is defined in cypress.json file
  });

  context('Changes Value', () => {
    it('should validate on blur', () => {
      cy.get('input[type="email"').type('jon.sno').blur();
      cy.get('input[type="email"').should('have.class', 'form-control--error');
    });
    it('should success when validation is valid', () => {
      cy.get('input[type="email"').type('jon.snow@gmail.com').blur();
      cy.get('input[type="email"').should(
        'have.class',
        'form-control--success',
      );
    });
    it('should complain about empty required fields if form is sumitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('input[type="email"').should('have.class', 'form-control--error');
      cy.get('input[type="password"').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should update FormValues when input changes', () => {
      cy.get('input[type="email"').type('jon.snow@gmail.com').blur();
      cy.get('[data-cy=form-values]').should('contain', 'jon.snow@gmail.com');
    });
  });
});
