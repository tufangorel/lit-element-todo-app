import { LitElement, html, css } from 'lit';

const author = 'open-wc';
const homepage = 'https://open-wc.org/';
const footerTemplate = html`<footer>Based on template from <a href="${homepage}">${author}</a></footer>`;

class TodoApp extends LitElement {
  
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
      { text:'Do A', finished:true},
      { text:'Do B', finished:false},
      { text:'Do C', finished:false}    
    ];

  }

  render() {

    return html`
      <div>
        <h1>${this.header}</h1>
        <div>

          <input id="addTodoInput" placeholder="Name"/>
          <button @click="${this._addTodo}">Add</button>
          <ol>
            ${this.todos.map(
              todo => html`
                <li>${todo.text} (${todo.finished ? 'Finished':'Unfinished'}) </li>
              `,
            )}
          </ol>
        </div>

        ${footerTemplate}
      </div>

    `;
  }

  _addTodo(){

      const input = this.shadowRoot.getElementById('addTodoInput');
      const text = input.ariaValueMax;
      input.value = '';

      this.todos.push( { text, finished:false } );
      this.requestUpdate();
  }
}

customElements.define('lit-element-todo-app', TodoApp);
