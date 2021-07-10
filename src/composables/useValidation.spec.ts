import { useInputValidation } from '/@/composables/useValidation';
import { FieldControl, TextField, Validator } from '/@/core/factories';
import { required } from '/@/core/utils/validators';

describe('UseValidation', () => {
  let props;
  let ctx;
  beforeEach(() => {
    props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
        }),
      }),
    };
    ctx = {
      emit: (path, obj) => ({
        path,
        ...obj,
      }),
    };
  });
  it('should set all validation classes to false if there is no validators', () => {
    const {
      getValidationClasses,
      getCheckboxValidationClasses,
      getRadioValidationClasses,
    } = useInputValidation(props, ctx.emit);

    expect(getValidationClasses.value).toEqual([
      { 'form-control--success': false },
      { 'form-control--error': false, 'form-control--validating': false },
    ]);
    expect(getCheckboxValidationClasses.value).toEqual([
      { 'checkbox-group--success': false },
      { 'checkbox-group--error': false, 'checkbox-group--validating': false },
    ]);
    expect(getRadioValidationClasses.value).toEqual([
      { 'radio-group--success': false },
      { 'radio-group--error': false, 'radio-group--validating': false },
    ]);
  });

  it('should set error validation classes to true if control is invalid', async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const {
      validate,
      getValidationClasses,
      getCheckboxValidationClasses,
      getRadioValidationClasses,
    } = useInputValidation(props, ctx.emit);
    props.control.dirty = true;
    props.control.valid = false;
    await validate();

    expect(getValidationClasses.value).toEqual([
      { 'form-control--success': null },
      { 'form-control--error': true, 'form-control--validating': false },
    ]);
    expect(getCheckboxValidationClasses.value).toEqual([
      { 'checkbox-group--success': null },
      { 'checkbox-group--error': true, 'checkbox-group--validating': false },
    ]);
    expect(getRadioValidationClasses.value).toEqual([
      { 'radio-group--success': null },
      { 'radio-group--error': true, 'radio-group--validating': false },
    ]);
  });

  it('should set success validation classes to true if control is valid after being dirty', async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          value: 'Awiwi',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const {
      validate,
      getValidationClasses,
      getCheckboxValidationClasses,
      getRadioValidationClasses,
    } = useInputValidation(props, ctx.emit);
    props.control.dirty = true;
    props.control.touched = true;
    props.control.valid = true;
    props.control.errors = {};
    await validate();

    expect(getValidationClasses.value).toEqual([
      { 'form-control--success': true },
      { 'form-control--error': false, 'form-control--validating': false },
    ]);
    expect(getCheckboxValidationClasses.value).toEqual([
      { 'checkbox-group--success': true },
      { 'checkbox-group--error': false, 'checkbox-group--validating': false },
    ]);
    expect(getRadioValidationClasses.value).toEqual([
      { 'radio-group--success': true },
      { 'radio-group--error': false, 'radio-group--validating': false },
    ]);
  });

  it('should set isRequired to false if there is a validator required declared on the field definition', () => {
    const { isRequired } = useInputValidation(props, ctx.emit);

    expect(isRequired.value).toBeFalsy();
  });
  it('should set isRequired to true if there is a validator required declared on the field definition', () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const { isRequired } = useInputValidation(props, ctx.emit);

    expect(isRequired.value).toBe(true);
  });

  it('should set requiresValidation to false if there is a validator declared on the field definition', () => {
    const { requiresValidation } = useInputValidation(props, ctx.emit);

    expect(requiresValidation.value).toBeFalsy();
  });
  it('should set requiresValidation to true if there is a validator declared on the field definition', () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const { requiresValidation } = useInputValidation(props, ctx.emit);

    expect(requiresValidation.value).toBe(true);
  });

  it("should not validate if the control hasn't being touched", async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const spy = jest.spyOn(ctx, 'emit');
    const { validate } = useInputValidation(props, ctx.emit);

    await validate();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should  validate if the control has being touched', async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const spy = jest.spyOn(ctx, 'emit');
    const { validate } = useInputValidation(props, ctx.emit);
    props.control.touched = true;
    await validate();

    expect(spy).toHaveBeenCalledWith('validate', {
      name: 'test-input',
      errors: { required: { value: true, text: 'This field is required' } },
      valid: false,
    });
  });

  it("should not validate if the control hasn't being dirty", async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const spy = jest.spyOn(ctx, 'emit');
    const { validate } = useInputValidation(props, ctx.emit);

    await validate();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should validate if the control has being dirty', async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const spy = jest.spyOn(ctx, 'emit');
    const { validate } = useInputValidation(props, ctx.emit);
    props.control.dirty = true;
    await validate();

    expect(spy).toHaveBeenCalledWith('validate', {
      name: 'test-input',
      errors: { required: { value: true, text: 'This field is required' } },
      valid: false,
    });
  });

  it('should validate if forced', async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
      forceValidation: true,
    };
    const spy = jest.spyOn(ctx, 'emit');
    const { validate } = useInputValidation(props, ctx.emit);

    await validate(true);

    expect(spy).toHaveBeenCalledWith('validate', {
      name: 'test-input',
      errors: { required: { value: true, text: 'This field is required' } },
      valid: false,
    });
  });

  it('should not  generate error messages if errors is empty', async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const { errorMessages, validate } = useInputValidation(props, ctx.emit);
    await validate(true);
    expect(errorMessages.value).toStrictEqual([]);
  });
  it('should generate error messages if errors', async () => {
    const props = {
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    };
    const { errorMessages, validate } = useInputValidation(props, ctx.emit);
    props.control.errors = {
      required: { value: true, text: 'This field is required' },
    };
    await validate(true);
    expect(errorMessages.value).toStrictEqual(['This field is required']);
  });
});
