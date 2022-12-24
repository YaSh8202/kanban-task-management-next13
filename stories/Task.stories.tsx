import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { Button } from './Button';
import { Task } from "./Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Task",
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
    task: {
      title: "Task",
      description: "Task description",
      id: "1",
      status: "TASK_INBOX",
      subtasks: [],
    },
  },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  task: {
    title: "Task",
    description: "Task description",
    id: "1",
    status: "TASK_INBOX",
    subtasks: [],
  },
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
