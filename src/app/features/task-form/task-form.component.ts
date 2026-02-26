import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/core/models/task/task.module';
import { TaskService } from 'src/app/core/Services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;
  isEditing = false;
  currentTask!: Task;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }


  // INIT

  ngOnInit(): void {

    this.createForm();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditing = true;

      const task = this.taskService.getTaskById(+id);

      if (task) {
        this.currentTask = task;
        this.taskForm.patchValue(task);
      }
    }
  }


  // CREATE FORM

  createForm() {

    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      cronExpression: ['', Validators.required],
      notifyOnComplete: [false],
      retryOnFailure: [false]
    });
  }


  // SUBMIT

  onSubmit() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formData = this.taskForm.value;

    if (this.isEditing) {

      const updatedTask = {
        ...this.currentTask,
        ...formData
      };

      this.taskService.updateTask(updatedTask);

    } else {

      const newTask: Task = {
        id: 0,
        name: formData.name,
        description: formData.description,
        cronExpression: formData.cronExpression,
        humanReadable: this.getHumanReadableCron(),
        nextRun: new Date(),
        status: 'active'
      };

      this.taskService.addTask(newTask);
    }

    // redirect after save
    this.router.navigate(['/']);
  }


  // CANCEL

  onCancel() {
    this.router.navigate(['/']);
  }


  // VALIDATION

  isFieldInvalid(field: string): boolean {

    const control = this.taskForm.get(field);

    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched)
    );
  }


  // CRON PRESET

  setCronPreset(value: string) {
    this.taskForm.patchValue({
      cronExpression: value
    });
  }


  // HUMAN CRON

  getHumanReadableCron(): string {

    const cron = this.taskForm.get('cronExpression')?.value;

    switch (cron) {
      case '0 0 * * *':
        return 'Runs Daily';
      case '0 0 * * 0':
        return 'Runs Weekly';
      case '0 0 1 * *':
        return 'Runs Monthly';
      default:
        return 'Custom Schedule';
    }
  }

}