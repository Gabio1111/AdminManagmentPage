import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPagesComponent } from './dialog-pages.component';

describe('DialogPagesComponent', () => {
  let component: DialogPagesComponent;
  let fixture: ComponentFixture<DialogPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
