import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { inews } from 'src/app/interfaces/news';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {


  loaded: boolean = false;
  modalState: boolean = false
  bigModalState: boolean = false
  news: inews[] = []
  bigNews: inews = {
    "id": "-999",
    "title": "Loading...",
    "blog": "Loading...",
    "date": "Loading...",
    "img": "assets/news/microsoft.png"
  }
  smallNews: inews[] = []
  otherNews: inews[] = []
  currentNews: inews = this.bigNews

  constructor(private firebase: AngularFirestore) { }

  ngOnInit(): void {
    this.firebase.collection('news').snapshotChanges().subscribe(data => {
      const news = data.map(course => {
        const newData = (course.payload.doc.data() as inews)
        return ({
          id: course.payload.doc.id,
          title: newData['title'],
          blog: newData['blog'],
          date: newData['date'],
          img: newData['img'],
        })
      })
      this.news = news
      this.bigNews = this.news[0]
      this.smallNews = this.news.slice(1, 3)
      this.otherNews = this.news.slice(3)
      setTimeout(() => {
        this.loaded = true;
      }, 500);
    })
  }

  newsImage(img: string): string {
    return `url(${img})`
  }


  openModal(news: inews) {
    this.currentNews = news
    this.modalState = true
  }

  emitFunc(bool: boolean) {
    this.modalState = false
  }

}
