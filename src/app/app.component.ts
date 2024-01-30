import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  taskProcessConfiguration!: Task;
  tasksInProgress: Promise<string>[] = [];
  feedbackMessages: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTaskProcessConfiguration();
  }

  startProcess(): void {
    this.getTasksInProgress();
    this.getFeedbackMessages();

    this.taskService.changeConfiguration(this.taskProcessConfiguration)
    this.taskService.processTasks()
  }

  getTasksInProgress(): void {
    this.tasksInProgress = this.taskService.getTasksInProgress();
  }

  getFeedbackMessages(): void {
    this.feedbackMessages = this.taskService.getFeedbackMessages();
  }

  getTaskProcessConfiguration(): void {
    this.taskProcessConfiguration = this.taskService.getConfiguration();
  }

}
