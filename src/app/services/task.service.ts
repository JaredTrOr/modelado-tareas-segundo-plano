import { Injectable } from '@angular/core';
import { time } from '../utils/time';
import { Task } from '../models/task';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private timerService: TimerService){}

  //Default process values
  defaultConfiguration: Task = {
    taskTime: 5,
    numberOfTasksToExecute: 10,
    sendingTime: 1
  }
 
  feedbackMessages: string[] = [];
  tasksInProgress : Promise<string>[] = [];

  async task(numberOfTask: number): Promise<string> {
    await time(this.defaultConfiguration.taskTime);
    return `Tarea número ${numberOfTask} completada!!`;
  }

  async processTasks(): Promise<void> {
    for(let i = 1; i<= this.defaultConfiguration.numberOfTasksToExecute; i++) {
        this.feedbackMessages.push(`Se ha enviado la tarea número: ${i}`);
        this.tasksInProgress.push(this.task(i));
        await time(this.defaultConfiguration.sendingTime);
    }

    await Promise.all(this.tasksInProgress);
    this.timerService.stop() //--> Stop timer
  }

  getTasksInProgress(): Promise<string>[] {
    return this.tasksInProgress;
  }

  getFeedbackMessages(): string[] {
    return this.feedbackMessages;
  }

  getConfiguration(): Task {
    return this.defaultConfiguration;
  }

  changeConfiguration(configuration: Task) {
    this.defaultConfiguration = configuration;
  }

}
