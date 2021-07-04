import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsFilterComponent } from './workouts-filter.component';

describe('WorkoutsFilterComponent', () => {
  let component: WorkoutsFilterComponent;
  let fixture: ComponentFixture<WorkoutsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
