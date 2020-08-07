import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteServiceComponent } from './complete-service.component';

describe('CompleteServiceComponent', () => {
  let component: CompleteServiceComponent;
  let fixture: ComponentFixture<CompleteServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
