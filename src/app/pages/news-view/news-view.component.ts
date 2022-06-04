import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { inews } from 'src/app/interfaces/news';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {

  @Input() modalOpened: boolean = false
  @Input() news!: inews
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.newItemEvent.emit(false)
  }

}
