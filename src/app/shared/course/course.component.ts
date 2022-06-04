import { Component, Input, OnInit } from '@angular/core';
import { icourse } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() course!: icourse

  modalState: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalState = true
  }

  emitFunc(bool: boolean) {
    this.modalState = bool

  }

}
