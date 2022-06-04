import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ievents } from 'src/app/interfaces/event';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  loaded: boolean = false;
  events: ievents[] = []
  pos: number = 0


  constructor(private firebase: AngularFirestore) { }

  ngOnInit(): void {
    this.firebase.collection('events').snapshotChanges().subscribe(data => {
      const events = data.map(course => {
        const newData = (course.payload.doc.data() as ievents)
        return ({
          id: course.payload.doc.id,
          name: newData['name'],
          about: newData['about'],
          date: newData['date'],
          phone: newData['phone'],
          place: newData['place'],
          img: newData['img'],
        })
      })
      this.events = events
      setTimeout(() => {
        this.loaded = true;
      }, 500);

    })
  }

  next() {
    this.pos++
    if (this.pos == this.events.length) {
      this.pos = 0
    }
  }

  prev() {
    this.pos--
    if (this.pos == -1) {
      this.pos = this.events.length - 1
    }
  }

  get position() {
    return `-${this.pos * 100}%`
  }

}
