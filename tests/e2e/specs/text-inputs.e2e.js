describe('Text Input test Suite', () => {
  beforeEach(() => {
    cy.visit('/text-fields'); // "baseUrl" is defined in cypress.json file
  });

  context('General', () => {
    it('should change input value when type', () => {
      cy.get('input[name="lastName"]').type('Mandalorian').blur();
      cy.get('input[name="lastName"]').should('have.value', 'Mandalorian');
    });
    it('should be disabled when prop disable is true', () => {
      cy.get('input[name="disabled"]').should('be.disabled');
    });
  });

  context('Non-required Fields', () => {
    it('should not chage visual state when blur (No validation)', () => {
      cy.get('input[name="lastName"').type('Mandalorian').blur();
      cy.get('input[name="lastName"').should(
        'not.have.class',
        'form-control--success',
      );
    });

    it('should update FormValues when input changes', () => {
      cy.get('input[name="lastName"').type('Mandalorian').blur();
      cy.get('[data-cy=form-values]').should('contain', 'Mandalorian');
    });
  });

  context('Required Fields', () => {
    it('should have an "*" on label if field is required', () => {
      cy.get('label[for="firstName"]').should('contain', '*');
    });

    it('should show error state when input blurred without value (required)', () => {
      cy.get('input[name="firstName"]').focus().blur();
      cy.get('input[name="firstName"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should show success state when input blurred with value (required)', () => {
      cy.get('input[name="firstName"]').type('Jon').blur();
      cy.get('input[name="firstName"]').should(
        'have.class',
        'form-control--success',
      );
    });
  });

  context('Email Field', () => {
    it('should show error state when invalid email value', () => {
      cy.get('input[name="email"]').type('Jon-snow.com').blur();
      cy.get('input[name="email"]').should('have.class', 'form-control--error');
    });

    it('should show success state when valid email value', () => {
      cy.get('input[name="email"]').type('jonsnow@winterfell.com').blur();
      cy.get('input[name="email"]').should(
        'have.class',
        'form-control--success',
      );
    });
  });

  context('Password Field', () => {
    it('should show error state when invalid password value', () => {
      cy.get('input[name="password"]').type('abcd').blur();
      cy.get('input[name="password"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should show success state when valid password value', () => {
      cy.get('input[name="password"]').type('Abcd@1234').blur();
      cy.get('input[name="password"]').should(
        'have.class',
        'form-control--success',
      );
    });
  });

  context('Changes & Submit', () => {
    it('should not complain about non-required empty fields if form is submitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="lastName"]').should(
        'not.have.class',
        'form-control--error',
      );
    });

    it('should complain about empty required fields if form is submitted', () => {
      cy.get('input[name="lastName"]').type('Snow').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="firstName"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should reset fields if submitted and valid', () => {
      cy.get('input[name="firstName"]').type('Jon').blur();
      cy.get('input[name="lastName"]').type('Snow').blur();
      cy.get('input[name="email"]').type('jon.snow@winterfell.com').blur();
      cy.get('input[name="password"]').type('Abcd@1234').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="firstName"]').should('be.empty');
      cy.get('input[name="lastName"]').should('be.empty');
      cy.get('input[name="email"]').should('be.empty');
      cy.get('input[name="password"]').should('be.empty');
    });

    it('should not reset fields if submitted and invalid', () => {
      cy.get('input[name="firstName"]').type('Jon').blur();
      cy.get('input[name="lastName"]').type('Snow').blur();
      cy.get('input[name="email"]').type('jon.sn').blur();
      cy.get('input[name="password"]').type('Abc').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="firstName"]').should('not.have.value', null);
      cy.get('input[name="lastName"]').should('not.have.value', null);
      cy.get('input[name="email"]').should('not.have.value', null);
      cy.get('input[name="password"]').should('not.have.value', null);
    });

    it('should update FormValues when input changes', () => {
      cy.get('input[name="firstName"]').type('Jon').blur();
      cy.get('input[name="lastName"]').type('Snow').blur();
      cy.get('[data-cy=form-values]').should('contain', 'Snow');
    });
  });
});
