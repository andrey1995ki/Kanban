/* eslint-disable */
import {Meta, StoryObj} from "@storybook/react";
import '../../../../index.scss'
import {Options} from "./Options";

const options: Meta<typeof Options> = {
    title: "Components/Options",
    component: Options,
    tags: ['autodocs'],
    decorators: (Story) => (<div style={{height: '120px'}}><Story/></div>),
    argTypes: {
        optionsArray: {
            description: 'Массив опций где title- заголовок кнопки callback - функция которая будет выполнена',
            control: false,
            table: {
                type: {summary: "Array<{title: 'string', callback: () => void}>"}
            }
        },
    }
}
export default options;
type Story = StoryObj<typeof Options>;

export const OptionsDefault: Story = {
    args: {
        optionsArray: [{
            callback: () => alert('Действие 1'),
            title: 'Действие 1'
        }, {
            callback: () => alert('Действие 2'),
            title: 'Действие 2'
        }]
    }
};
