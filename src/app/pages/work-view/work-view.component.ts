import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { iwork } from 'src/app/interfaces/work';


@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.scss']
})
export class WorkViewComponent implements OnInit {

  @Input() modalOpened: boolean = false
  @Input() work!: iwork
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.newItemEvent.emit(false)
  }

}
