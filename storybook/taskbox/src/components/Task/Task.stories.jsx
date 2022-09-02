/** 
 * There are two basic levels of organization in Storybook: the component and its child stories.
 * Think of each story as a permutation of a component. You can have as many stories per component as you need.
*/
import Task from './Task.component'

// To tell Storybook the component we are documenting
export default {
  component: Task,
  title: 'Task', // how to refer to the component in the sidebar of the Storbybook app
}

/**
 * To define our stories, we export a function for each of our test states to generate a story.
 * The story is a function that returns a rendered element (i.e., a component with a set of props) in a given state
 */
const Template = args => <Task {...args} />

// Template.bind({}) is a standard JavaScript technique for making a copy of a function.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
export const Default = Template.bind({})
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
  },
}

export const Pinned = Template.bind({})
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
}

export const Archived = Template.bind({})
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
}
