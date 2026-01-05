import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoyaStudentsComponent } from './noya-students.component';

describe('NoyaStudentsComponent', () => {
  let component: NoyaStudentsComponent;
  let fixture: ComponentFixture<NoyaStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoyaStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoyaStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
