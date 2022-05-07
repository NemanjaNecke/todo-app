import { Todo } from './../shared/todo.model';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() todoClicked: EventEmitter<void> = new EventEmitter();
  @Output() editClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @ViewChild('progress')
  progress!: ElementRef;
  showEdit: boolean = false;
 
  constructor() { }

  
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if (this.todo.completed) {
      this.progress.nativeElement.value = 100;
    }
    }
  onTodoClicked(){
    this.todoClicked.emit();
    if (this.todo.completed) {
      this.progress.nativeElement.value = 100;
    }else {
      this.progress.nativeElement.removeAttribute("value");
    }
  }

  onEditClicked(){
    this.editClicked.emit();
    this.showEdit = !this.showEdit   

  }
  changeTodo(text: string) {
    this.todo.text = text;
  }

  onDeleteClicked(){
    this.deleteClicked.emit();
  }


}
