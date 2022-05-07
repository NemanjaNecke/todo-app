import { Todo } from './../shared/todo.model';
import { NgForm } from '@angular/forms';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  @Input()
  openEdit: boolean = false;
  @Input()
  todo!:Todo;
  @Output()
  onClose = new EventEmitter();
  @ViewChild('edit')
  edit!: ElementRef;
  
  constructor() { }

  ngOnInit(): void {

  }
  onTodoUpdated(form: NgForm) {
    this.todo.text = form.value.text;
    this.onClose.emit(this.todo.text);
  }
  cancel() { 
    this.onClose.emit(this.todo.text); 
  }
  
}
