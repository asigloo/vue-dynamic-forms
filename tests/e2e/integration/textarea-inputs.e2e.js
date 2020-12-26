describe('Textarea test Suite', () => {
  beforeEach(() => {
    cy.visit('/textarea-fields'); // "baseUrl" is defined in cypress.json file
  });

  context('General', () => {
    it('should change input value when type', () => {
      cy.get('textarea[name="bio"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea ¿Vas a seguir Abigail? ron!',
        )
        .blur();
      cy.get('textarea[name="bio"]').should(
        'have.value',
        'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea ¿Vas a seguir Abigail? ron!',
      );
    });
    it('should be disabled when prop disable is true', () => {
      cy.get('textarea[name="disabled"]').should('be.disabled');
    });
  });

  context('Non-required Fields', () => {
    it('should not chage visual state when blur (No validation)', () => {
      cy.get('textarea[name="bio"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('textarea[name="bio"]').should(
        'not.have.class',
        'form-control--success',
      );
    });

    it('should update FormValues when input changes', () => {
      cy.get('textarea[name="bio"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('[data-cy=form-values]').should(
        'contain',
        'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
      );
    });
  });

  context('Required Fields', () => {
    it('should have an "*" on label if field is required', () => {
      cy.get('label[for="aboutMe"]').should('contain', '*');
    });

    it('should show error state when textarea blurred without value (required)', () => {
      cy.get('textarea[name="aboutMe"]').focus().blur();
      cy.get('textarea[name="aboutMe"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should show success state when textarea blurred with value (required)', () => {
      cy.get('textarea[name="aboutMe"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('textarea[name="aboutMe"]').should(
        'have.class',
        'form-control--success',
      );
    });
  });

  /*   context('Cols & Rows', () => {
    it('should have value equal to minimum when up increase via control', () => {
      cy.get('textarea[name="age"]').type('{uparrow}');
      cy.get('textarea[name="age"]').should('have.value', '18');
    });

    it('should value stay equal to minimum when up decrease via control', () => {
      cy.get('textarea[name="age"]').type('18{downarrow}');
      cy.get('textarea[name="age"]').should('have.value', '18');
    });

    it('should show error state when input value is less than min value (18)', () => {
      cy.get('textarea[name="age"]').type(15).blur();
      cy.get('textarea[name="age"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should show error state when input value is greater than max value (100)', () => {
      cy.get('textarea[name="percentage"]').type(102).blur();
      cy.get('textarea[name="percentage"]').should(
        'have.class',
        'form-control--error',
      );
    });
  }); */

  context('Changes & Submit', () => {
    it('should not complain about non-required empty fields if form is submitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('textarea[name="bio"]').should(
        'not.have.class',
        'form-control--error',
      );
    });

    it('should complain about empty required fields if form is submitted', () => {
      cy.get('textarea[name="bio"]').type('Awiwiiw').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('textarea[name="aboutMe"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should reset fields if submitted and valid', () => {
      cy.get('textarea[name="bio"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('textarea[name="aboutMe"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('textarea[name="interests"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('[data-cy=submit]').click();
      cy.get('textarea[name="bio"]').should('be.empty');
      cy.get('textarea[name="aboutMe"]').should('be.empty');
      cy.get('textarea[name="interests"]').should('be.empty');
    });

    it('should not reset fields if submitted and invalid', () => {
      cy.get('textarea[name="bio"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('textarea[name="interests"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('[data-cy=submit]').click();
      cy.get('textarea[name="bio"]').should('not.have.value', null);
      cy.get('textarea[name="aboutMe"]').should('not.have.value', null);
      cy.get('textarea[name="interests"]').should('not.have.value', null);
    });

    it('should update FormValues when input changes', () => {
      cy.get('textarea[name="bio"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('textarea[name="aboutMe"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('textarea[name="interests"]')
        .type(
          'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea',
        )
        .blur();
      cy.get('[data-cy=form-values]').should('contain', 'Arepa ipsum');
    });
  });
});
