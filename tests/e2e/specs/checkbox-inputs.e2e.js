describe('Checkbox Input test Suite', () => {
  beforeEach(() => {
    cy.visit('/checkbox-fields'); // "baseUrl" is defined in cypress.json file
  });

  context('General', () => {
    it('should change input value when type', () => {
      cy.get('input[name="awesomeness"]').check().blur();
      cy.get('input[name="awesomeness"]').should('be.checked');
    });
    it('should be disabled when prop disable is true', () => {
      cy.get('input[name="disabled"]').should('be.disabled');
    });
  });

  context('Non-required Fields', () => {
    it('should update FormValues when input changes', () => {
      cy.get('input[name="awesomeness"').check().blur();
      cy.get('[data-formValues]')
        .invoke('attr', 'data-formValues')
        .should(formValues => {
          const parsed = JSON.parse(formValues);
          expect(parsed.awesomeness).to.be.true;
        });
    });
  });

  context('Required Fields', () => {
    it('should have an "*" on label if field is required', () => {
      cy.get('label[for="required"]').should('contain', '*');
    });
  });

  context('Changes & Submit', () => {
    it('should not complain about non-required empty fields if form is submitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="certified"]')
        .parent()
        .should('not.have.class', 'checkbox-group--error');
    });

    it('should complain about empty required fields if form is submitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="required"]')
        .parent()
        .should('have.class', 'checkbox-group--error');
    });

    // TODO: Re-do when https://github.com/asigloo/vue-dynamic-forms/issues/216 is fixed.
    /*
    it('should reset fields if submitted and valid', () => {
      cy.get('input[name="awesomeness"]').check().blur();
      cy.get('input[name="required"]').check().blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="awesomeness"]').should('not.be.checked');
      cy.get('input[name="required"]').should('not.be.checked');
    });



    it('should not reset fields if submitted and invalid', () => {
      cy.get('input[name="required"]').check().blur();
      cy.get('input[name="private"]').check().blur();
      cy.get('input[name="email"]').type('jon.sn').blur();
      cy.get('input[name="password"]').type('Abc').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="required"]').should('not.have.value', null);
      cy.get('input[name="private"]').should('not.have.value', null);
      cy.get('input[name="email"]').should('not.have.value', null);
      cy.get('input[name="password"]').should('not.have.value', null);
    });

    it('should update FormValues when input changes', () => {
      cy.get('input[name="required"]').check().blur();
      cy.get('input[name="private"]').check().blur();
      cy.get('[data-cy=form-values]').should('contain', 'Snow');
    }); */
  });
  /*
  context('Non-required Fields', () => {
    it('should update FormValues when input changes', () => {
      cy.get('input[name="private"').check().blur();
      cy.get('[data-cy=form-values]').should('contain', 'private: true');
    });
  });

  context('Required Fields', () => {
    it('should have an "*" on label if field is required', () => {
      cy.get('label[for="required"]').should('contain', '*');
    });

    it('should show error state when input blurred without value (required)', () => {
      cy.get('input[name="required"]').focus().blur();
      cy.get('input[name="required"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should show success state when input blurred with value (required)', () => {
      cy.get('input[name="required"]').check().blur();
      cy.get('input[name="required"]').should(
        'have.class',
        'form-control--success',
      );
    });
  });

  context('Changes & Submit', () => {
    it('should not complain about non-required empty fields if form is submitted', () => {
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="private"]').should(
        'not.have.class',
        'form-control--error',
      );
    });

    it('should complain about empty required fields if form is submitted', () => {
      cy.get('input[name="private"]').check().blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="required"]').should(
        'have.class',
        'form-control--error',
      );
    });

    it('should reset fields if submitted and valid', () => {
      cy.get('input[name="required"]').check().blur();
      cy.get('input[name="private"]').check().blur();
      cy.get('input[name="email"]').type('jon.snow@winterfell.com').blur();
      cy.get('input[name="password"]').type('Abcd@1234').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="required"]').should('be.empty');
      cy.get('input[name="private"]').should('be.empty');
      cy.get('input[name="email"]').should('be.empty');
      cy.get('input[name="password"]').should('be.empty');
    });

    it('should not reset fields if submitted and invalid', () => {
      cy.get('input[name="required"]').check().blur();
      cy.get('input[name="private"]').check().blur();
      cy.get('input[name="email"]').type('jon.sn').blur();
      cy.get('input[name="password"]').type('Abc').blur();
      cy.get('[data-cy=submit]').click();
      cy.get('input[name="required"]').should('not.have.value', null);
      cy.get('input[name="private"]').should('not.have.value', null);
      cy.get('input[name="email"]').should('not.have.value', null);
      cy.get('input[name="password"]').should('not.have.value', null);
    });

    it('should update FormValues when input changes', () => {
      cy.get('input[name="required"]').check().blur();
      cy.get('input[name="private"]').check().blur();
      cy.get('[data-cy=form-values]').should('contain', 'Snow');
    });
  }); */
});
