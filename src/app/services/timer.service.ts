import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private startTime: number;
  private isRunning: boolean;
  private lastTime: string;

  constructor() {
    this.startTime = 0;
    this.isRunning = false;
    this.lastTime = '';
  }

  start() {
    this.startTime = Date.now();
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  getTime(): string {

    if (!this.isRunning) {
      return this.lastTime;
    }

    const elapsedMilliseconds = Date.now() - this.startTime;
    const minutes = Math.floor(elapsedMilliseconds / 60000);
    const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
    const milliseconds = elapsedMilliseconds % 1000;

    const formattedMinutes = this.padNumber(minutes, 2);
    const formattedSeconds = this.padNumber(seconds, 2);
    const formattedMilliseconds = this.padNumber(milliseconds, 3);

    this.lastTime = `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  }

  private padNumber(num: number, size: number): string {
    let numString = num.toString();
    while (numString.length < size) {
      numString = '0' + numString;
    }
    return numString;
  }
  
}
