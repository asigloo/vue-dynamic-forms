describe('Number Input test Suite', () => {
  beforeEach(() => {
    cy.visit('/number-fields'); // "baseUrl" is defined in cypress.json file
  });

  context('General', () => {
    it('should change input value when type', () => {
      cy.get('input[name="stock"]').type(10).blur();
      cy.get('input[name="stock"]').should('have.value', '10');
    });
    it('should be disabled when prop disable is true', () => {
      cy.get('input[name="disabled"]').should('be.disabled');
    });
  });

  context('Non-required Fields', () => {
    it('should not chage visual state when blur (No validation)', () => {
      cy.get('input[name="qty"').type(5).blur();
      cy.get('input[name="qty"').should(
        'not.have.class',
        'form-control--success',
      );
    });

    it('should update FormValues when input changes', () => {
      cy.get('input[name="stock"').type(10).blur();
      cy.get('[data-cy=form-values]').should('contain', '10');
    });
  });

  context('Required Fields', () => {
    it('should have an "*" on label if field is required', () => {
      cy.get('label[for="stock"]').should('contain', '*');
    });

    it('should show error state when input blurred without value (required)', () => {
      cy.get('input[name="stock"]').focus().blur();
      cy.get('input[name="stock"]').should('have.class', 'form-control--error');
    });

    it('should show success state when input blurred with value (required)', () => {
      cy.get('input[name="stock"]').type(10).blur();
      cy.get('input[name="stock"]').should(
        'have.class',
        'form-control--success',
      );
    });
  });

  context('Min & Max', () => {
    it('should have value equal to minimum when up increase via control', () => {
      cy.get('input[name="age"]').type('{uparrow}');
      cy.get('input[name="age"]').should('have.value', '18');
    });

    it('should value stay equal to minimum when up decrease via control', () => {
      cy.get('input[name="age"]').type('18{downarrow}');
      cy.get('input[name="age"]').should('have.value', '18');
    });

    it('should show error state when input value is less than min value (18)', () => {
      cy.get('input[name="age"]').type(15).blur();
      cy.get('input[name="age"]').should('have.class', 'form-control--error');
    });

    it('should show error state when input value is greater than max value (100)', () => {
      cy.get('input[name="percentage"]').type(102).blur();
      cy.get('input[name="percentage"]').should(
        'have.class',
        'form-control--error',
      );
    });
  });

  context('Step', () => {
    it('should increase value based on step value (5)', () => {
      cy.get('input[name="percentage"]').type('{uparrow}');
      cy.get('input[name="percentage"]').should('have.value', '5');
      cy.get('input[name="percentage"]').type('{uparrow}');
      cy.get('input[name="percentage"]').should('have.value', '10');
    });
  });

  context('Changes & Submit', () => {
    it('should not complain about non-required empty fields if form is submitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="qty"]').should(
        'not.have.class',
        'form-control--error',
      );
    });

    it('should complain about empty required fields if form is submitted', () => {
      cy.get('input[name="qty"]').type(100).blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="stock"]').should('have.class', 'form-control--error');
    });

    it('should reset fields if submitted and valid', () => {
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
    });
  });
});
