import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Validators, FormBuilder } from '@angular/forms';
import { icourse } from '../../interfaces/course';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnChanges {

  editCourse = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    duration: ['', Validators.required],
    deadline: ['', Validators.required],
    format: ['', Validators.required],
    location: [''],
    price: ['', Validators.required],
    logo: ['', Validators.required],
    start: ['', Validators.required],
    course: ['', Validators.required],
    advantage: ['', Validators.required],
    about: ['', Validators.required],
    contactsPhone: ['', Validators.required],
    contactsEmail: ['', Validators.required],
    teacherName: ['', Validators.required],
    teacherWork: ['', Validators.required],
    companySubs: ['', Validators.required],
  })

  @Input() courseEditForm: boolean = false
  @Input() courseAddForm: boolean = false
  @Input() currentCourse!: icourse
  @Input() courseValue = this.editCourse.value
  @Output() newItemEvent = new EventEmitter<string>();


  constructor(public fb: FormBuilder, private httpClient: HttpClient, private firebase: AngularFirestore) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(): void {
    this.editCourse.patchValue(this.courseValue)
  }

  editCourseSubmit() {
    const course: icourse = {
      id: this.currentCourse.id,
      name: this.editCourse.value['name'],
      type: this.editCourse.value['type'],
      duration: this.editCourse.value['duration'],
      deadline: this.editCourse.value['deadline'],
      format: this.editCourse.value['format'],
      location: this.editCourse.value['location'],
      price: this.editCourse.value['price'],
      logo: this.editCourse.value['logo'],
      start: this.editCourse.value['start'],
      contacts: {
        phone: this.editCourse.value['contactsPhone'],
        email: this.editCourse.value['contactsEmail'],
      },
      teacher: {
        work: this.editCourse.value['teacherWork'],
        name: this.editCourse.value['teacherName'],
        img: this.currentCourse.teacher.img,
      },
      course: this.editCourse.value['course'].split('\n'),
      advantage: this.editCourse.value['advantage'].split('\n'),
      about: this.editCourse.value['about'],
      companySubs: this.editCourse.value['companySubs']
    }
    this.httpClient.put<icourse>(`http://localhost:3000/courses/${this.currentCourse.id}`, course).subscribe(
      () => this.newItemEvent.emit('course')
    )
  }

  deleteCourse() {
    this.httpClient.delete<icourse>(`http://localhost:3000/courses/${this.currentCourse.id}`).subscribe(
      () => this.newItemEvent.emit('course')
    )

  }

  addCourseSubmit() {
    const course: icourse = {
      id: Date.now() + '',
      name: this.editCourse.value['name'],
      type: this.editCourse.value['type'],
      duration: this.editCourse.value['duration'],
      deadline: this.editCourse.value['deadline'],
      format: this.editCourse.value['format'],
      location: this.editCourse.value['location'],
      price: this.editCourse.value['price'],
      logo: this.editCourse.value['logo'],
      start: this.editCourse.value['start'],
      contacts: {
        phone: this.editCourse.value['contactsPhone'],
        email: this.editCourse.value['contactsEmail'],
      },
      teacher: {
        work: this.editCourse.value['teacherWork'],
        name: this.editCourse.value['teacherName'],
        img: "assets/design/teacher.png",
      },
      course: this.editCourse.value['course'].split('\n'),
      advantage: this.editCourse.value['advantage'].split('\n'),
      about: this.editCourse.value['about'],
      companySubs: this.editCourse.value['companySubs']
    }
    return this.firebase.collection('courses').add(course).then(res => {
      console.log(res)
      this.newItemEvent.emit('course')
    }).catch((err) => {
      console.log(err);
    })

  }

  cancel() {
    this.newItemEvent.emit('course')
  }

}
