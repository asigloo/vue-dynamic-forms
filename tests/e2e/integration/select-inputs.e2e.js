describe('Select Dropdown test Suite', () => {
  beforeEach(() => {
    cy.visit('/select-fields'); // "baseUrl" is defined in cypress.json file
  });

  context('General', () => {
    it('should change input value when type', () => {
      cy.get('select[name="character"]').select('crash').blur();
      cy.get('select[name="character"]').should('have.value', 'crash');
    });
    it('should be disabled when prop disable is true', () => {
      cy.get('select[name="disabled"]').should('be.disabled');
    });
  });

  context('Non-required Fields', () => {
    it('should not chage visual state when blur (No validation)', () => {
      cy.get('select[name="character"]').select('crash').blur();
      cy.get('select[name="character"]').should(
        'not.have.class',
        'form-control--success',
      );
    });
  });

  context('Required Fields', () => {
    it('should have an "*" on label if field is required', () => {
      cy.get('label[for="game"]').should('contain', '*');
    });

    it('should show error state when select blurred without value (required)', () => {
      cy.get('select[name="game"]').focus().blur();
      cy.get('select[name="game"]').should('have.class', 'form-control--error');
    });

    it('should show success state when select blurred with value (required)', () => {
      cy.get('select[name="game"]').select('the-last-of-us').blur();
      cy.get('select[name="game"]').should(
        'have.class',
        'form-control--success',
      );
    });
  });

  context('Changes & Submit', () => {
    it('should not complain about non-required empty fields if form is submitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('select[name="character"]').should(
        'not.have.class',
        'form-control--error',
      );
    });

    it('should complain about empty required fields if form is submitted', () => {
      cy.get('select[name="character"]').select('crash').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('select[name="game"]').should('have.class', 'form-control--error');
    });
    /*
    it('should reset fields if submitted and valid', () => {
      cy.get('select[name="game"]').select('the-last-of-us').blur();
      cy.get('select[name="character"]').select('crash').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('select[name="game"]').should('be.empty');
      cy.get('select[name="character"]').should('be.empty');
    }); */

    it('should not reset fields if submitted and invalid', () => {
      cy.get('select[name="character"]').select('crash').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('select[name="character"]').should('not.have.value', null);
    });

    it('should update FormValues when input changes', () => {
      cy.get('select[name="game"]').select('the-last-of-us').blur();
      cy.get('select[name="character"]').select('crash').blur();
      cy.get('[data-cy=form-values]').should('contain', 'crash');
    });

    /* it('should not reset fields if submitted and invalid', () => {
      cy.get('input[name="qty"]').type(5).blur();
      cy.get('input[name="stock"]').type(5).blur();
      cy.get('input[name="age"]').type(30).blur();
      cy.get('input[name="percentage"]').type(95).blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="qty"]').should('be.empty');
      cy.get('input[name="stock"]').should('be.empty');
      cy.get('input[name="age"]').should('be.empty');
      cy.get('input[name="percentage"]').should('be.empty');
    });

    it('should not reset fields if submitted and invalid', () => {
      cy.get('input[name="qty"]').type(5).blur();
      cy.get('input[name="stock"]').focus().blur();
      cy.get('input[name="age"]').type(12).blur();
      cy.get('input[name="percentage"]').type(95).blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="qty"]').should('not.have.value', null);
      cy.get('input[name="stock"]').should('not.have.value', null);
      cy.get('input[name="age"]').should('not.have.value', null);
      cy.get('input[name="percentage"]').should('not.have.value', null);
    });

    it('should update FormValues when input changes', () => {
      cy.get('input[name="qty"]').type(5).blur();
      cy.get('input[name="stock"]').type(5).blur();
      cy.get('input[name="age"]').type(30).blur();
      cy.get('input[name="percentage"]').type(95).blur();
      cy.get('[data-cy=form-values]').should('contain', 95);
    }); */
  });
});
