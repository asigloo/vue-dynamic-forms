import { shallowMount } from '@vue/test-utils';
import {{name_pc}} from './{{name_pc}}.vue';

describe('{{name_pc}}', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount({{name_pc}});
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
