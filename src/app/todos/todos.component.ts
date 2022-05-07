import { DataService } from './../shared/data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  showValidationErrors: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllTodos().subscribe((response: any) => {
     this.todos = response;
   });
  }



   onFormSubmit(form: NgForm) {
   if (form.valid) {
      this.dataService.create(new Todo(form.value.text, false)).subscribe(
        {next: (data: any) => {
          // refresh the list   
          this.dataService.getAllTodos().subscribe((response: any) => {
            this.todos = response;
          })
        }
      ,
        error: (err: any) => {
          console.error(err);
          }
        });;
      form.reset();
   }
    else {
    this.showValidationErrors = true;
   }
 }

   onTodoClicked(todo:any){
     const index = todo.id;
     todo.completed = !todo.completed;
     console.log(index)
     this.dataService.update(index, todo).subscribe((response: any) => {
      console.log(response)
   });
   

  }

 onEditClicked(todo: any) {
  const index = todo.id;
   this.dataService.update(index, todo).subscribe((response: any) => {
     
     console.log(response);
   });
  }

   onDeleteClicked(todo: any) {
     const index = todo.id;
     this.dataService.delete(index).subscribe((response: any) => {
      this.dataService.getAllTodos().subscribe((response: any) => {
        this.todos = response;
      })
       console.log(response);
     });
   }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
