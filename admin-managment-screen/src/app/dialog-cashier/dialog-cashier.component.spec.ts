import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCashierComponent } from './dialog-cashier.component';

describe('DialogCashierComponent', () => {
  let component: DialogCashierComponent;
  let fixture: ComponentFixture<DialogCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCashierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
