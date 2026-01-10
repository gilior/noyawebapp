import { Component } from '@angular/core';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NoyaBookReviewsComponent } from "../../noya-book-reviews/noya-book-reviews.component";

@Component({
  selector: 'noya-book',
  standalone: true,
  imports: [NgbCarouselModule, NgbNavModule, NoyaBookReviewsComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
    active = 1;
}
