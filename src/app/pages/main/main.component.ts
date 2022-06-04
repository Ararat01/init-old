import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pos: number = 0
  sliderInterval!: ReturnType<typeof setInterval>
  loaded: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.sliderInterval = setInterval(() => {
      if (this.pos == 3) {
        this.pos = 0
      } else {
        this.pos++
      }
    }, 7000)

    if (!sessionStorage.getItem('siteInit')) {
      setTimeout(() => {
        sessionStorage.setItem('siteInit', 'true');
        this.loaded = true
      }, 2900)
    }
    else {
      this.loaded = true
    }
  }

  carousel(position: number) {
    clearInterval(this.sliderInterval)
    this.sliderInterval = setInterval(() => {
      if (this.pos == 3) {
        this.pos = 0
      } else {
        this.pos++
      }
    }, 7000)
    this.pos = position
  }
}
