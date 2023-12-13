import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ReceiptFundsInputComponent } from './components/receipt-funds-input/receipt-funds-input.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent /*ReceiptFundsInputComponent*/ },
  { path: 'ReceiptFundsInput', component:  ReceiptFundsInputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
