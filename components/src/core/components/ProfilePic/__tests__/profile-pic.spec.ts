import {mount} from '@vue/test-utils';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import {SIZE_SMALL} from '@orangehrm/oxd/core/components/ProfilePic/types';

describe('ProfilePic.vue', () => {
  it('renders OXD ProfilePic with image', () => {
    const wrapper = mount(ProfilePic, {
      slots: {
        default: `<img/>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD ProfilePic with small image', () => {
    const wrapper = mount(ProfilePic, {
      props: {
        displayType: SIZE_SMALL,
      },
      slots: {
        default: `<img/>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call linkHandler with event payload on link click when linkHandler is provided', async () => {
    const mockLinkHandler = jest.fn();
    const wrapper = mount(ProfilePic, {
      props: {
        link: 'https://orangehrm.com',
        linkHandler: mockLinkHandler,
      },
    });

    const link = wrapper.find('a');
    await link.trigger('click');

    expect(mockLinkHandler).toHaveBeenCalledWith(expect.any(MouseEvent));
  });
});
