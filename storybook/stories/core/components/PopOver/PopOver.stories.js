import PopOver from '@orangehrm/oxd/core/components/PopOver/PopOver';
import PopOverStory from "../PopOver/PopOver.story";
import PopOverStoryRightAligned from "../PopOver/PopOverRightAligned.story";

export default {
    title: 'Popups/PopOver',
    component: PopOver,
    argTypes: {
        persistent: {
            control: {type: 'boolean'},
            table: {
                type: {summary: 'Set persistent'},
            },
        },
    }
};

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {'oxd-pop-over': PopOverStory},
    template: '<div><oxd-pop-over v-bind="args" /></div>'
});

export const Default = Template.bind({});

export const RightAligned = () => PopOverStoryRightAligned;

export const Persistent = Template.bind({});
Persistent.args = {
    persistent: true,
    show: true,
};