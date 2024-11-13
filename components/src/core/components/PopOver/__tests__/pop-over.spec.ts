import {mount, shallowMount} from '@vue/test-utils';
import PopOver from '@orangehrm/oxd/core/components/PopOver/PopOver.vue';

describe('PopOver', () => {
  it('renders the pop-over component', () => {
    const wrapper = shallowMount(PopOver, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('before click the button, pop over content not appear', () => {
    const wrapper = shallowMount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();
  });

  it('after the button click pop over content should appear', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });
    const button = wrapper.find('.popover-icon');
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeTruthy();
  });

  it('click trigger button again to close the content when persistent is set to false', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      props: {
        show: false,
        persistent: false,
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });

    const button = wrapper.find('.popover-icon');

    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeTruthy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();
  });

  it('click trigger button again to close the content when persistent is set to true', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      props: {
        persistent: true,
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });

    const button = wrapper.find('.popover-icon');

    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeTruthy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();
  });

  it('click outside pop over to close the content when persistent is set to false', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      props: {
        persistent: false,
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });

    const outsideElement = document.createElement('button');
    outsideElement.classList.add('outside-element');
    document.body.appendChild(outsideElement);

    expect(wrapper.find('.oxd-pop-over-button').exists()).toBe(true);
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(false);

    const button = wrapper.find('.oxd-pop-over-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(true);

    await outsideElement.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(false);
    document.body.removeChild(outsideElement);
  });

  it('click outside pop over to not close the content when persistent is set to true', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      props: {
        persistent: true,
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });

    const outsideElement = document.createElement('button');
    outsideElement.classList.add('outside-element');
    document.body.appendChild(outsideElement);

    expect(wrapper.find('.oxd-pop-over-button').exists()).toBe(true);
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(false);

    const button = wrapper.find('.oxd-pop-over-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(true);

    await outsideElement.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(true);
    document.body.removeChild(outsideElement);
  });

  it('press ESC on keyboard to close the content when persistent is set to false', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      props: {
        persistent: false,
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });

    expect(wrapper.find('.oxd-pop-over-button').exists()).toBe(true);
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(false);

    const button = wrapper.find('.oxd-pop-over-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(true);

    const div = wrapper.find('.oxd-pop-over-content');
    await div.trigger('keyup.esc');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(false);
  });

  it('press ESC on keyboard to not close the content when persistent is set to true', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      props: {
        persistent: true,
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />',
          },
        },
      },
    });

    expect(wrapper.find('.oxd-pop-over-button').exists()).toBe(true);
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(false);

    const button = wrapper.find('.oxd-pop-over-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(true);

    const escapeEvent = new KeyboardEvent('keyup', {key: 'Escape'});
    wrapper.find('.oxd-pop-over-content').element.dispatchEvent(escapeEvent);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-pop-over-content').exists()).toBe(true);
  });

  it('should toggle pop-over when show prop changes', async () => {
    const wrapper = mount(PopOver, {
      props: {
        show: false,
      },
      global: {
        stubs: {
          'oxd-icon-button': {template: '<i />'},
        },
      },
    });

    expect(wrapper.vm.isActive).toBe(false);

    await wrapper.setProps({show: true});
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isActive).toBe(true);

    await wrapper.setProps({show: false});
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isActive).toBe(false);
  });

  it('check closePopOver function', async () => {
    const wrapper = shallowMount(PopOver, {});
    const clickEvent = new MouseEvent('click');
    wrapper.vm.isActive = true;
    wrapper.vm.closePopOver(clickEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isActive).toEqual(false);
    wrapper.vm.closePopOver(clickEvent);
    expect(wrapper.vm.isActive).toEqual(false);
  });
});
