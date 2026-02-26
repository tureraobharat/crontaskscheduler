import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'task-form', component: TaskFormComponent },
  { path: 'task-form/:id', component: TaskFormComponent },
  { path: 'task-list', component: TaskListComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    TaskFormComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    
    RouterModule.forChild(routes)
  ]
})
export class FeaturesModule { }