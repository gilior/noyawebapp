import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoyaBookReviewsComponent } from './noya-book-reviews.component';

describe('NoyaBookReviewsComponent', () => {
  let component: NoyaBookReviewsComponent;
  let fixture: ComponentFixture<NoyaBookReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoyaBookReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoyaBookReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
