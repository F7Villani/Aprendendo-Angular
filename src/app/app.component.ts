import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', // selector se transforma numa tag html, no caso <app-root>
  templateUrl: './app.component.html',
//template: '<p>Template html</p>', pode ser chumbado aqui, ou externalizado como na linha de cima
  styleUrls: ['./app.component.css'] // css do componente
})

export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form!: FormGroup;

  constructor() { 
    this.todos.push(new Todo('Passear com o cachorro', 1, false));
    this.todos.push(new Todo('Ir ao supermercado', 2, false));
    this.todos.push(new Todo('Cortar o cabelo', 3, true));
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if (!(index === -1)){
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo){
    todo.done = true; 
  }

  markAsUndone(todo: Todo){
    todo.done = false;
  }
}
