import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { TimerService } from './services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  taskProcessConfiguration!: Task;
  tasksInProgress: Promise<string>[] = [];
  feedbackMessages: string[] = [];

  //Timer
  private intervalId: any;
  formattedTime: string = '00:00.000';

  taskCompletedTime: Object[] = [];

  constructor(private taskService: TaskService, private timerService: TimerService) {}

  ngOnInit(): void {
    this.getTaskProcessConfiguration();
  }

  startProcess(): void {
    this.getTasksInProgress();
    this.getFeedbackMessages();

    this.taskService.changeConfiguration(this.taskProcessConfiguration)
    this.start() //--> Start timer
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

  start() {
    this.timerService.start();
    this.intervalId = setInterval(() => {
      this.formattedTime = this.timerService.getTime();
    }, 1);
  }

}
