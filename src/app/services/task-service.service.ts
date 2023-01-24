import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpHandler , HttpResponse, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http : HttpClient) { }

  addTask(task:any){
    return this.http.post("http://localhost:9090/tasks",task)
  } 

  getTask(): Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:9090/tasks")
  } 

  deleteTask(id:any){
    return this.http.delete("http://localhost:9090/tasks/"+id)
  } 

  updateTask(idTask:any){
    return this.http.put<Task>("http://localhost:9090/tasks/"+idTask,Task)
  } 

}
