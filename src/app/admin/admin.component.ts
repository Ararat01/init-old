import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Validators, FormBuilder } from '@angular/forms';
import { iuser } from '../interfaces/user';
import { inews } from '../interfaces/news';
import { icourse } from '../interfaces/course';
import { iwork } from '../interfaces/work';
import { ievents } from '../interfaces/event';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminLoged: boolean = false
  error: boolean = false
  loading: boolean = false

  news: inews[] = []
  courses: icourse[] = []
  work: iwork[] = []
  events: ievents[] = []
  coursesShow: boolean = false
  workShow: boolean = false
  newsShow: boolean = false
  eventsShow: boolean = false
  form = this.fb.group({
    login: '',
    password: '',
  })


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
  courseEditForm: boolean = false
  courseAddForm: boolean = false
  courseValue = this.editCourse.value
  currentCourse!: icourse

  editWork = this.fb.group({
    name: ['', Validators.required],
    degree: ['', Validators.required],
    deadline: ['', Validators.required],
    requiredSkills: ['', Validators.required],
    niceSkills: ['', Validators.required],
    format: ['', Validators.required],
    logo: ['', Validators.required],
    companyLocation: ['', Validators.required],
    companyName: ['', Validators.required],
    companyAddress: ['', Validators.required],
    companyEmail: ['', Validators.required],
    companyPhone: ['', Validators.required],
  })
  workEditForm: boolean = false
  workAddForm: boolean = false
  workValue = this.editWork.value
  currentWork!: iwork


  constructor(public fb: FormBuilder, private httpClient: HttpClient, private firebase: AngularFirestore) { }

  ngOnInit(): void {
  }

  login() {
    this.firebase.collection('admin').snapshotChanges().subscribe(data => {
      const courses = data.map(course => {
        const newData = (course.payload.doc.data() as iuser)
        return ({
          login: newData['login'],
          password: newData['password'],
          privilege: newData['privilege'],
        })
      })
      courses.find(user => {
        if (user.login == this.form.value['login'] && user.password == this.form.value['password']) {
          this.adminLoged = true
          this.loading = true
          this.getFullData()
        }
      })
      if (this.adminLoged == false) {
        this.error = true
      }
    })

  }


  getCourses() {
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
      this.courses = courses

    })
  }

  getWork() {
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
      this.work = work

    })
  }


  openCourseEdit(course: icourse) {
    this.courseEditForm = true
    this.courseAddForm = false
    this.currentCourse = course
    this.courseValue = {
      name: course.name,
      type: course.type,
      duration: course.duration,
      deadline: course.deadline,
      format: course.format,
      location: course.location,
      price: course.price,
      logo: course.logo,
      start: course.start,
      contactsPhone: course.contacts.phone,
      contactsEmail: course.contacts.email,
      teacherName: course.teacher.name,
      teacherWork: course.teacher.work,
      course: course.course.join('\n'),
      advantage: course.advantage.join('\n'),
      about: course.about,
      companySubs: course.companySubs
    }
  }

  openCourseAdd() {
    this.courseEditForm = false
    this.courseAddForm = true
    this.courseValue = {
      name: '',
      type: '',
      duration: '',
      deadline: '',
      format: '',
      location: '',
      price: '',
      logo: '',
      start: '',
      contactsPhone: '',
      contactsEmail: '',
      teacherName: '',
      teacherWork: '',
      course: '',
      advantage: '',
      about: '',
      companySubs: ''
    }
  }

  openWorkEdit(work: iwork) {
    this.workEditForm = true
    this.workAddForm = false
    this.currentWork = work
    this.workValue = {
      name: work.name,
      degree: work.degree,
      deadline: work.deadline,
      requiredSkills: work.requiredSkills.join('\n'),
      niceSkills: work.niceSkills.join('\n'),
      format: work.format,
      logo: work.logo,
      companyLocation: work.company.location,
      companyName: work.company.name,
      companyAddress: work.company.address,
      companyEmail: work.company.email,
      companyPhone: work.company.phone,
    }
  }

  openWorkAdd() {
    this.workEditForm = false
    this.workAddForm = true
    this.workValue = {
      name: '',
      degree: '',
      deadline: '',
      requiredSkills: '',
      niceSkills: '',
      format: '',
      logo: '',
      companyLocation: '',
      companyName: '',
      companyAddress: '',
      companyEmail: '',
      companyPhone: '',
    }
  }

  close(form: string) {
    if (form == 'course') {
      this.getCourses()
    } else if (form == 'work') {
      this.getWork()
    }
    this.courseEditForm = false
    this.courseAddForm = false
    this.workAddForm = false
    this.workEditForm = false
  }

  getFullData() {
    this.getCourses()
    this.getWork()
    setTimeout(() => {
      this.loading = false
    }, 500)
  }

}