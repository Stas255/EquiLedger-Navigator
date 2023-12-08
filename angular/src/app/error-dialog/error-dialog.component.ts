import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDetail } from 'Types/error';
import { ErrorService } from '../service/error/error.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDetail[],
  private errorService: ErrorService) {}
  paginatedErrors: ErrorDetail[] = [];
  currentPage = 0;
  pageSize = 5;
  private errorSubscription: Subscription | undefined;
  
  ngOnInit() {
    this.errorSubscription = this.errorService.errors$.subscribe((errors) => {
      this.data = errors;
      this.paginateErrors(this.currentPage, this.pageSize);
    });
    this.paginateErrors(this.currentPage, this.pageSize); // Initialize the first page
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  paginateErrors(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex;
    this.paginatedErrors = this.data.slice(startIndex, startIndex + pageSize);
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateErrors(event.pageIndex * event.pageSize, event.pageSize);
  }

  removeError(index: number) {
    this.errorService.removeError(index);
    this.paginateErrors(this.currentPage * this.pageSize, this.pageSize);
  }

  deleteAllErrors() {
    this.data = []; // Clear the local data
    // Also clear the errors in ErrorService
    this.errorService.clearAllErrors();
    this.ngOnInit();
  }
}

