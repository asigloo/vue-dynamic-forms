/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckboxField,
  EmailField,
  PasswordField,
  TextField,
} from '/@/core/factories';
import { useDynamicForm } from './useDynamicForm';

describe('UseDynamicForm', () => {
  let form: any;
  let ctx: any;
  beforeEach(() => {
    form = {
      id: 'login-demo',
      fields: {
        name: TextField({
          label: 'Text',
          value: 'Awiwi',
        }),
        email: EmailField({
          label: 'Email',
        }),
        password: PasswordField({
          label: 'Password',
          autocomplete: 'current-password',
        }),
        rememberMe: CheckboxField({
          label: 'Remember Me',
          value: true,
        }),
      },
    };
    ctx = {
      emit: (path, obj) => ({
        path,
        ...obj,
      }),
    };
  });

  it('should map controls based on form fields', () => {
    const { controls, mapControls } = useDynamicForm(form, ctx);

    mapControls();
    expect(controls.value.length).toBe(4);
    expect(controls.value.map(control => control.name)).toStrictEqual([
      'name',
      'email',
      'password',
      'rememberMe',
    ]);
  });

  it('should be valid if all controls are valid', () => {
    const { mapControls, isValid } = useDynamicForm(form, ctx);
    mapControls();
    expect(isValid.value).toBe(true);
  });

  it('should be invalid if any of the controls is invalid', () => {
    const { mapControls, isValid, findControlByName } = useDynamicForm(
      form,
      ctx,
    );
    mapControls();
    findControlByName('email').valid = false;

    expect(isValid.value).toBeFalsy();
  });

  it('should format the options', () => {
    form.options = {
      customClass: 'flex flex-wrap',
      customStyles: { position: 'absolute' },
      netlify: true,
      autocomplete: true,
    };
    const { formattedOptions } = useDynamicForm(form, ctx);

    expect(formattedOptions.value.class).toBe('flex flex-wrap');
    expect(formattedOptions.value.style).toStrictEqual({
      position: 'absolute',
    });
    expect(formattedOptions.value['data-netlify']).toBe(true);
    expect(formattedOptions.value.autocomplete).toBe('on');
  });

  it('should map controls in order depending on fieldOrder prop', () => {
    form.fieldOrder = ['email', 'password', 'name', 'rememberMe'];
    const { controls, mapControls } = useDynamicForm(form, ctx);

    mapControls();
    expect(controls.value.map(control => control.name)).toStrictEqual([
      'email',
      'password',
      'name',
      'rememberMe',
    ]);
  });

  it('should map controls with value if empty = false', () => {
    const { controls, mapControls } = useDynamicForm(form, ctx);

    mapControls();
    expect(controls.value.map(control => control.value)).toStrictEqual([
      'Awiwi',
      undefined,
      undefined,
      true,
    ]);
  });

  it('should map controls with not value if empty = true', () => {
    const { controls, mapControls } = useDynamicForm(form, ctx);

    mapControls(true);
    expect(controls.value.map(control => control.value)).toStrictEqual([
      null,
      null,
      null,
      false,
    ]);
  });

  it('should return form values', () => {
    form.fields.email.value = 'alvaro@hi.dev';

    const { mapControls, formValues } = useDynamicForm(form, ctx);
    mapControls();

    expect(formValues.value).toEqual({
      name: 'Awiwi',
      email: 'alvaro@hi.dev',
      rememberMe: true,
    });
  });

  it('should update the control to dirty if value change', () => {
    const mockInputEvent = { name: 'email', value: 'awiwi@gmail.com' };
    const { mapControls, valueChange, findControlByName } = useDynamicForm(
      form,
      ctx,
    );
    mapControls();
    valueChange(mockInputEvent);

    expect(findControlByName('email').value).toBe('awiwi@gmail.com');
  });

  it('validateAll should set forceValidation to true', () => {
    const { mapControls, validateAll, forceValidation } = useDynamicForm(
      form,
      ctx,
    );
    mapControls();
    validateAll();
    expect(forceValidation.value).toBe(true);
  });

  it('resetForm should set control values to null and set forceValidation to false', () => {
    const { mapControls, controls, forceValidation, resetForm } =
      useDynamicForm(form, ctx);
    mapControls();
    resetForm();
    expect(controls.value.map(control => control.value)).toStrictEqual([
      null,
      null,
      null,
      false,
    ]);
    expect(forceValidation.value).toBeFalsy();
  });

  it('should emit submitted with formValues if hadleSubmit is called and is valid ', async () => {
    const spy = jest.spyOn(ctx, 'emit');
    const { mapControls, handleSubmit } = useDynamicForm(form, ctx);
    mapControls();

    await handleSubmit();

    expect(spy).toHaveBeenCalledWith('submitted', {
      name: 'Awiwi',
      rememberMe: true,
    });
  });
  // TODO: check this after on how to spy on functions  inside functions
  /*
  it('should reset form after valid form submission', async () => {
    const { mapControls, handleSubmit, resetForm } = useDynamicForm(form, ctx);
    const spy = jest.spyOn({ resetForm }, 'resetForm');
    mapControls();

    await handleSubmit();

    expect(spy).toHaveBeenCalled();
  }); */

  it('should emit error event with errors if hadleSubmit is called and is form is invalid ', async () => {
    const spy = jest.spyOn(ctx, 'emit');
    const { mapControls, handleSubmit, findControlByName } = useDynamicForm(
      form,
      ctx,
    );
    mapControls();
    const control = findControlByName('email');
    control.valid = false;
    control.errors = {
      required: { value: true, text: 'This field is required' },
    };

    await handleSubmit();

    expect(spy).toHaveBeenCalledWith('error', {
      email: {
        required: {
          text: 'This field is required',
          value: true,
        },
      },
    });
  });
});
