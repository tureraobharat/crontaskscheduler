import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Task {
  id: number;
  name: string;
  description: string;
  cronExpression: string;
  humanReadable: string;
  nextRun: Date;
  status: string;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TaskModule { }
