import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { icourse } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {

  @Input() modalOpened: boolean = false
  @Input() course!: icourse
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.newItemEvent.emit(false)
  }

}
