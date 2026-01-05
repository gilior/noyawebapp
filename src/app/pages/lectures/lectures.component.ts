import { Component } from '@angular/core';
import { ConcertCardComponent } from '../../components/concert-card/concert-card.component';
import { ConcertsIntroComponent } from '../../components/concerts-intro/concerts-intro.component';
import { RadioComponent, RadioTrack } from "../../components/radio/radio.component";
import { LecturesReviewsComponent } from '../../components/lectures-reviews/lectures-reviews.component';
import { ReviewImageComponent } from '../../components/review-image/review-image.component';
import { NoyaStudentsComponent } from "../../components/noya-students/noya-students.component";

@Component({
  selector: 'noya-lectures',
  standalone: true,
  imports: [ConcertCardComponent, ConcertsIntroComponent, RadioComponent, LecturesReviewsComponent, ReviewImageComponent, NoyaStudentsComponent],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.scss'
})
export class LecturesComponent {
  currentTrack: RadioTrack = {
    title: $localize`Noya Schleien (featuring Liat Regev)`,
    artist: $localize`Noya Schleien guest-appearing with Liat Regev`,
    details: $localize`On “Half-Day,” Reshet Bet`,
    album: $localize`Reshet Bet`,
    audioSrc: 'https://music.wixstatic.com/preview/6ddb5b_87d8e632b0d5453886c400342cf8b9d2-128.mp3',
    imageSrc: 'https://static.wixstatic.com/media/6ddb5b_e549630e47c644cd83a506445878fb38~mv2.jpg/v1/fill/w_317,h_317,q_85,usm_0.66_1.00_0.01/6ddb5b_e549630e47c644cd83a506445878fb38~mv2_mscwdt.jpg'
  };
}
