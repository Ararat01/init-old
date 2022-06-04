import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { iwork } from 'src/app/interfaces/work';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  loaded: boolean = false;


  myWork: iwork[] = []

  filteredWork = this.myWork

  constructor(private httpClient: HttpClient, private firebase: AngularFirestore) { }

  ngOnInit(): void {
    this.firebase.collection('work').snapshotChanges().subscribe(data => {
      const work = data.map(course => {
        const newData = (course.payload.doc.data() as iwork)
        return ({
          id: course.payload.doc.id,
          name: newData['name'],
          degree: newData['degree'],
          deadline: newData['deadline'],
          requiredSkills: newData['requiredSkills'],
          niceSkills: newData['niceSkills'],
          format: newData['format'],
          logo: newData['logo'],
          company: newData['company'],
        })
      })
      this.myWork = work
      this.filteredWork = this.myWork
      setTimeout(() => {
        this.loaded = true;
      }, 500);

    })
  }

  get array() {
    return [...Array(16).keys()];
  }

}
