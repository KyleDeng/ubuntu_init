// todo.js - 纯 JavaScript 实现的待办事项逻辑（约100行）

// 假设 HTML 中有以下元素：
// <input id="todoInput" />
// <button id="addBtn">添加</button>
// <ul id="todoList"></ul>

class TodoApp {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.init();
  }

  init() {
    this.input = document.getElementById('todoInput');
    this.addButton = document.getElementById('addBtn');
    this.list = document.getElementById('todoList');

    if (!this.input || !this.addButton || !this.list) {
      console.error('缺少必要的 DOM 元素：#todoInput, #addBtn, #todoList');
      return;
    }

    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.addButton.addEventListener('click', () => this.addTodo());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });
  }

  addTodo() {
    const text = this.input.value.trim();
    if (!text) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };

    this.todos.push(newTodo);
    this.save();
    this.render();
    this.input.value = '';
    this.input.focus();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.save();
    this.render();
  }

  toggleComplete(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.save();
    this.render();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  render() {
    this.list.innerHTML = '';

    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';

      const span = document.createElement('span');
      span.textContent = todo.text;
      span.style.cursor = 'pointer';
      span.addEventListener('click', () => this.toggleComplete(todo.id));

      const delBtn = document.createElement('button');
      delBtn.textContent = '删除';
      delBtn.addEventListener('click', () => this.deleteTodo(todo.id));

      li.appendChild(span);
      li.appendChild(delBtn);
      this.list.appendChild(li);
    });
  }
}

// 页面加载完成后启动应用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new TodoApp());
} else {
  new TodoApp();
}
