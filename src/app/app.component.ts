import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })

    this.load()
  }

  add(){
    const title = this.form.controls['title'].value
    const id = this.todos.length + 1
    this.todos.push(new Todo(title, id, false))
    this.save()
    this.clear()
  }

  clear(){
    this.form.reset()
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if (!(index === -1)){
      this.todos.splice(index, 1);
    }
    this.save()
  }

  markAsDone(todo: Todo){
    todo.done = true; 
    this.save()
  }

  markAsUndone(todo: Todo){
    todo.done = false;
    this.save()
  }

  save(){
    const data = JSON.stringify(this.todos)
    localStorage.setItem('todos', data)
  }

  load(){
    const data = localStorage.getItem("todos")
    if(data){
      this.todos = JSON.parse(data!)
    }else{
      this.todos = []
    }
  }
}
