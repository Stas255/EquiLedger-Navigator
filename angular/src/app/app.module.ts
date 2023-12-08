import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DbStatusComponent } from './db-status/db-status.component';
import { CommonModule } from '@angular/common';
import { ReceiptFundsInputComponent } from './components/receipt-funds-input/receipt-funds-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ErrorDialogComponent,
    DbStatusComponent,
    ReceiptFundsInputComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatIconModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
