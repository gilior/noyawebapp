import { Component } from '@angular/core';
import { NgbCarousel, NgbSlide } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'noya-students-review',
  standalone: true,
  imports: [NgbCarousel,NgbSlide ],
  templateUrl: './noya-students.component.html',
  styleUrl: './noya-students.component.scss'
})
export class NoyaStudentsComponent {

}
