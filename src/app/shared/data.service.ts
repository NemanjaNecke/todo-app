import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = "http://127.0.0.1:8000/todos/";
  todos: Todo[] = []; 
  constructor(private http: HttpClient) { }

  getAllTodos () {
    return this.http.get(`${this.baseUrl}`);
  }

  get(id:any) {
    return this.http.get(`${this.baseUrl}${id}/`);
  }
  create(data:any) {
    return this.http.post<any>(this.baseUrl, data);
  }
  update(id:any, data:any) {
    return this.http.put(`${this.baseUrl}${id}/`, data);
  }
  delete(id:any) {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
  deleteAll() {
    return this.http.delete(this.baseUrl);
  }
 
}
