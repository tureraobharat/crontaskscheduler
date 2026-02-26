import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task/task.module';
import { TaskService } from 'src/app/core/Services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  isLoading = true;

  @Input() tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }


  ngOnInit() {

    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.isLoading = false;
    });
  }


  // STATIC DATA (NO API)

  loadTasks() {

    setTimeout(() => {
      this.tasks = [
        {
          id: 1,
          name: 'Daily Email Job',
          description: 'Send daily reports',
          cronExpression: '0 9 * * *',
          humanReadable: 'Every day at 9 AM',
          nextRun: new Date(),
          status: 'active'
        },
        {
          id: 2,
          name: 'Database Backup',
          description: 'Backup production DB',
          cronExpression: '0 0 * * 0',
          humanReadable: 'Every Sunday midnight',
          nextRun: new Date(),
          status: 'paused'
        },
        {
          id: 3,
          name: 'Cleanup Logs',
          description: '',
          cronExpression: '*/30 * * * *',
          humanReadable: 'Every 30 minutes',
          nextRun: new Date(),
          status: 'active'
        }
      ];

      this.isLoading = false;

    }, 800);
  }


  // TOGGLE STATUS

  toggleStatus(task: Task) {

    const updatedTask = {
      ...task,
      status: task.status === 'active' ? 'paused' : 'active'
    };

    this.taskService.updateTask(updatedTask);
  }


  // EDIT TASK

  editTask(task: Task) {

    console.log('Edit task', task);

    this.router.navigate(['/task-form', task.id]);

  }


  // DELETE TASK

  deleteTask(task: Task) {

    const confirmDelete = confirm(
      `Delete task "${task.name}" ?`
    );

    if (!confirmDelete) return;

    this.taskService.deleteTask(task.id);
    console.log('Task deleted');
  }


  // CREATE NEW TASK

  createNewTask() {
    this.router.navigate(['/task-form']);
  }

}