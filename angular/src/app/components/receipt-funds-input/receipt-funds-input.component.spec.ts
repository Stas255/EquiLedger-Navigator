import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptFundsInputComponent } from './receipt-funds-input.component';

describe('ReceiptFundsInputComponent', () => {
  let component: ReceiptFundsInputComponent;
  let fixture: ComponentFixture<ReceiptFundsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptFundsInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptFundsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
