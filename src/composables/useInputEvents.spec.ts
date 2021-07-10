import { FieldControl, TextField } from '/@/core/factories';
import { useInputEvents } from './useInputEvents';

describe('UseInputEvents', () => {
  let props;
  let ctx;
  let input;
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
    input = document.createElement('input');
    input.type = 'text';
  });

  it('should emit a change event with the value when element emit `input` event', async () => {
    const spy = jest.spyOn(ctx, 'emit');
    const { onInput } = useInputEvents(props, ctx.emit);
    input.value = 'Awiwi';
    input.addEventListener('input', onInput, false);
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(spy).toHaveBeenCalledWith('change', {
      name: 'test-input',
      value: 'Awiwi',
    });

    input.removeEventListener('input', onInput);
  });

  it('should not emit a change event if there is no value', async () => {
    const spy = jest.spyOn(ctx, 'emit');
    const { onInput } = useInputEvents(props, ctx.emit);

    input.addEventListener('input', onInput, false);
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(spy).not.toBeCalled();

    input.removeEventListener('input', onInput);
  });

  it('should stopImmediatePropagation of event', async () => {
    const { onInput } = useInputEvents(props, ctx.emit);

    const event = new Event('input', { bubbles: true });
    const spy = jest.spyOn(event, 'stopImmediatePropagation');

    input.addEventListener('input', onInput, false);
    input.dispatchEvent(event);

    expect(spy).toBeCalled();

    input.removeEventListener('input', onInput);
  });

  it('should stop propagation and prevent default if event change is trigerred', () => {
    const { onChange } = useInputEvents(props, ctx.emit);

    const event = new Event('change', { bubbles: true });
    const spy = jest.spyOn(event, 'stopImmediatePropagation');
    const spy2 = jest.spyOn(event, 'preventDefault');

    input.addEventListener('change', onChange, false);
    input.dispatchEvent(event);

    expect(spy).toBeCalled();
    expect(spy2).toBeCalled();
    input.removeEventListener('change', onChange);
  });

  it('should emit a change event with the value when element is checked', async () => {
    const spy = jest.spyOn(ctx, 'emit');
    const { onCheck } = useInputEvents(props, ctx.emit);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.addEventListener('check', onCheck, false);
    checkbox.dispatchEvent(new Event('check', { bubbles: true }));

    expect(spy).toHaveBeenCalledWith('change', {
      name: 'test-input',
      value: true,
    });

    checkbox.removeEventListener('check', onCheck);
  });

  it('should emit a focus event with the value when input is focused', async () => {
    const spy = jest.spyOn(ctx, 'emit');
    const { onFocus } = useInputEvents(props, ctx.emit);

    input.addEventListener('focus', onFocus, false);
    input.dispatchEvent(new Event('focus', { bubbles: true }));

    expect(spy).toHaveBeenCalledWith('focus', {
      name: 'test-input',
    });

    input.removeEventListener('focus', onFocus);
  });

  it('should emit a blur event with the value when input is blurred', async () => {
    const spy = jest.spyOn(ctx, 'emit');
    const { onBlur } = useInputEvents(props, ctx.emit);

    input.addEventListener('blur', onBlur, false);
    input.dispatchEvent(new Event('blur', { bubbles: true }));

    expect(spy).toHaveBeenCalledWith('blur', {
      name: 'test-input',
    });

    input.removeEventListener('blur', onBlur);
  });
});
