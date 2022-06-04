import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { icourse } from 'src/app/interfaces/course';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  filtersState: boolean = false;
  orderCourse: boolean = false;
  loaded: boolean = false;

  form = this.fb.group({
    course: ['All', Validators.required],
    location: ['All', Validators.required],
    format: ['all', Validators.required],
  })

  myCourse: icourse[] = []

  filteredCourses = this.myCourse

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private firebase: AngularFirestore) {}

  ngOnInit(): void {
    this.firebase.collection('courses').snapshotChanges().subscribe(data => {
      const courses = data.map(course => {
        const newData = (course.payload.doc.data() as icourse)
        
        return ({
          id: course.payload.doc.id,
          name: newData['name'],
          type: newData['type'],
          duration: newData['duration'],
          deadline: newData['deadline'],
          format: newData['format'],
          location: newData['location'],
          price: newData['price'],
          logo: newData['logo'],
          start: newData['start'],
          contacts: newData['contacts'],
          teacher: newData['teacher'],
          course: newData['course'],
          advantage: newData['advantage'],
          about: newData['about'],
          companySubs: newData['companySubs'],
        })
      })
      this.myCourse = courses
      this.filteredCourses = this.myCourse

    })
    
    
    setTimeout(() => {
      this.loaded = true;
    }, 500);

  }

  openFilters() {
    this.filtersState = !this.filtersState;
  }

  get array() {
    return [...Array(16).keys()];
  }

  filter() {
    this.filteredCourses = this.myCourse.filter((course: icourse) => {
      return (
        (course.location == this.form.value['location'] || this.form.value['location'] == "All")
        && (course.type == this.form.value['course'] || this.form.value['course'] == "All")
        && (course.format == this.form.value['format'] || this.form.value['format'] == "all")
      )
    })
    this.filtersState = false
  }


  addCourse(bool: boolean) {
    this.orderCourse = bool
  }

}
