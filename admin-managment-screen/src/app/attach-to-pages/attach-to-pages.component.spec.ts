import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachToPagesComponent } from './attach-to-pages.component';

describe('AttachToPagesComponent', () => {
  let component: AttachToPagesComponent;
  let fixture: ComponentFixture<AttachToPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachToPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachToPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
