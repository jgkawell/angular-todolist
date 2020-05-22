import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Todo } from "../models/Todo";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TodoService {
  todosUrl: string = "http://localhost:3000/todo";

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    console.log("Requesting todos...");
    return this.http.get<Todo[]>(`${this.todosUrl}/all`);
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const url: string = `${this.todosUrl}/${todo.id}`;
    console.log(url);
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo): Observable<any> {
    const url: string = `${this.todosUrl}/toggle/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
