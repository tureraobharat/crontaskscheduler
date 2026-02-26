import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Task } from 'src/app/core/models/task/task.module';
import { TaskService } from 'src/app/core/Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchForm!: FormGroup;

  constructor(private taskService: TaskService) {}

 
  // INIT
 
  ngOnInit(): void {

    this.initForm();

    // ✅ Listen Global Task State
    this.taskService.getTasks().subscribe(tasks => {

      this.tasks = tasks;

      // always re-apply filter when data changes
      this.applyFilter();
    });

    this.listenSearchChanges();
  
  }

  // Page Refreshing

  refreshPage(){
    window.location.reload()
  }
 
  // FORM INIT
 
  initForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      status: new FormControl('all')
    });
  }

 
  // SEARCH LISTENER
 
  listenSearchChanges() {
    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

 
  // FILTER LOGIC
 
  applyFilter() {

    const searchText =
      this.searchForm.get('search')?.value?.toLowerCase() || '';

    const status =
      this.searchForm.get('status')?.value;

    this.filteredTasks = this.tasks.filter(task => {

      const matchSearch =
        task.name.toLowerCase().includes(searchText);

      const matchStatus =
        status === 'all' || task.status === status;

      return matchSearch && matchStatus;
    });
  }

 
  // DASHBOARD STATS
 
  getTotalTasks(): number {
    return this.tasks.length;
  }

  getActiveTasks(): number {
    return this.tasks.filter(t => t.status === 'active').length;
  }

  getPausedTasks(): number {
    return this.tasks.filter(t => t.status === 'paused').length;
  }

  // ✅ nearest upcoming task
  getNextRun(): string {

    if (!this.tasks.length) return '-';

    const sorted = [...this.tasks]
      .sort(
        (a, b) =>
          new Date(a.nextRun).getTime() -
          new Date(b.nextRun).getTime()
      );

    return new Date(sorted[0].nextRun)
      .toLocaleString();
  }
}