import { Component, Input, OnInit } from '@angular/core';
import { iwork } from 'src/app/interfaces/work';

@Component({
  selector: 'app-work-block',
  templateUrl: './work-block.component.html',
  styleUrls: ['./work-block.component.scss']
})
export class WorkBlockComponent implements OnInit {

  @Input() work!: iwork
  
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
