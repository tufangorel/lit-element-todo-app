import { LitElement, html, css } from 'lit';
import './todos-list';

class TodoApp extends LitElement {
  
  static properties = {
    todos: {type:Array}
  };

  static styles = css`

    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-element-todo-app-background-color);
    }

  `;

  constructor() {
    super();
    this.header = 'Todo App';

    this.todos = [
      { text:'Todo Item A', finished:true},
      { text:'Todo Item B', finished:false},
      { text:'Todo Item C', finished:false}    
    ];

  }

  render() {

    const finishedCount = this.todos.filter( e => e.finished ).length;
    const unfinishedCount = this.todos.length - finishedCount;

    return html`
      <div>
        <h1>${this.header}</h1>
        <div>

          <input id="addTodoInput" placeholder="Name"/>
          <button @click="${this._addTodo}">Add</button>

          <todo-list .todos=${this.todos}
            @change-todo-finished="${this._changeTodoFinished}"
            @remove-todo="${this._removeTodo}">
          </todo-list>

        </div>

        <div>Total finished count: ${finishedCount}</div>
        <div>Total unfinished count: ${unfinishedCount}</div>

      </div>

    `;
  }

  _addTodo(){

      const input = this.shadowRoot.getElementById('addTodoInput');
      const text = input.value;
      input.value = '';

      this.todos = [ ...this.todos, { text, finished:false } ];
      this.requestUpdate();
  }

  _removeTodo(e) {
    this.todos = this.todos.filter(todo => todo !== e.detail);
  }
  
  _changeTodoFinished(e) {
    const { changedTodo, finished } = e.detail;
  
    this.todos = this.todos.map((todo) => {
      if (todo !== changedTodo) {
        return todo;
      }
      return { ...changedTodo, finished };
    });
  }

}

customElements.define('todo-app', TodoApp);
