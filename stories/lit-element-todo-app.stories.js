import { html } from 'lit';
import '../src/lit-element-todo-app.js';

export default {
  title: 'LitElementTodoApp',
  component: 'lit-element-todo-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <lit-element-todo-app
      style="--lit-element-todo-app-background-color: ${backgroundColor ||
      'white'}"
      .header=${header}
    >
    </lit-element-todo-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
