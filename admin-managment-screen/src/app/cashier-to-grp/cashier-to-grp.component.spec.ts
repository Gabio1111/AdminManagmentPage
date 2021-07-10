import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierToGrpComponent } from './cashier-to-grp.component';

describe('CashierToGrpComponent', () => {
  let component: CashierToGrpComponent;
  let fixture: ComponentFixture<CashierToGrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierToGrpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierToGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
