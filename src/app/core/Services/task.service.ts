import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task/task.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];

  private taskSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.taskSubject.asObservable();

  constructor() {
    this.loadTasks();
  }


  // LOAD FROM STORAGE

  private loadTasks() {

    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    } else {

      // default data
      this.tasks = [
        {
          id: 1,
          name: 'Daily Email Job',
          description: 'Send report',
          cronExpression: '0 9 * * *',
          humanReadable: 'Every day 9 AM',
          nextRun: new Date(),
          status: 'active'
        }
      ];

      this.saveTasks();
    }

    this.taskSubject.next([...this.tasks]);
  }


  // SAVE TO STORAGE

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


  getTasks() {
    return this.tasks$;
  }


  addTask(task: Task) {

    task.id = Date.now();

    this.tasks.push(task);

    this.saveTasks();
    this.taskSubject.next([...this.tasks]);
  }


  updateTask(updatedTask: Task) {

    this.tasks = this.tasks.map(t =>
      t.id === updatedTask.id ? updatedTask : t
    );

    this.saveTasks();
    this.taskSubject.next([...this.tasks]);
  }


  deleteTask(id: number) {

    this.tasks = this.tasks.filter(t => t.id !== id);

    this.saveTasks();
    this.taskSubject.next([...this.tasks]);
  }


  toggleStatus(task: Task) {

    const updated = {
      ...task,
      status: task.status === 'active'
        ? 'paused'
        : 'active'
    };

    this.updateTask(updated);
  }


  getTaskById(id: number) {
    return this.tasks.find(t => t.id === id);
  }
}