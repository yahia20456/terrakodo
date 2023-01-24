import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Task } from '../models/task';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  task : Task = new Task()
  tasks! : Task[]
  id:any;
  formTask!: FormGroup;

  addTaskValue : string ='';
  editTaskValue : string ='';

  constructor(private teskService:TaskServiceService,private formBuilder : FormBuilder){}
  ngOnInit(): void { 
    this.formTask = this.formBuilder.group({
       title:[''],
       description:[''],
       priority:[''],
       date:[''],
    });

    this.getTask();
    this.deleteTask(this.id);
  }


  addTask(){
    this.teskService.addTask(this.task).subscribe((data) =>{
      console.log(data)
    })
  }

  
  getTask(){
    this.teskService.getTask().subscribe((data) =>{
      this.tasks = data
    })
  }

  deleteTask(id:any){
    this.teskService.deleteTask(id).subscribe(()=>
    this.teskService.getTask().
     subscribe(data=>{this.tasks}));
     }

       
  editTask(id : any){
    this.teskService.updateTask(id).subscribe((data) =>{
      
    })

  }
  }

