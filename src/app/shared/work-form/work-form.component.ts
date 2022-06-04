import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Validators, FormBuilder } from '@angular/forms';
import { iwork } from '../../interfaces/work';
@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit, OnChanges {

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

  @Input() workEditForm: boolean = false
  @Input() workAddForm: boolean = false
  @Input() currentWork!: iwork
  @Input() workValue = this.editWork.value
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(public fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.editWork.patchValue(this.workValue)
  }

  editWorkSubmit() {
    const work: iwork = {
      id: this.currentWork.id,
      name: this.editWork.value['name'],
      degree: this.editWork.value['degree'],
      deadline: this.editWork.value['deadline'],
      requiredSkills: this.editWork.value['requiredSkills'].split('\n'),
      niceSkills: this.editWork.value['niceSkills'].split('\n'),
      format: this.editWork.value['format'],
      logo: this.editWork.value['logo'],
      company: {
        location: this.editWork.value['companyLocation'],
        address: this.editWork.value['companyAddress'],
        name: this.editWork.value['companyName'],
        email: this.editWork.value['companyEmail'],
        phone: this.editWork.value['companyPhone']
      }
    }
    this.httpClient.put<iwork>(`http://localhost:3000/work/${this.currentWork.id}`, work).subscribe(
      () => this.newItemEvent.emit('work')
    )

  }

  deleteCourse() {
    this.httpClient.delete<iwork>(`http://localhost:3000/work/${this.currentWork.id}`).subscribe(
      () => this.newItemEvent.emit('work')
    )

  }

  addCourseSubmit() {
    const work: iwork = {
      id: this.currentWork.id,
      name: this.editWork.value['name'],
      degree: this.editWork.value['degree'],
      deadline: this.editWork.value['deadline'],
      requiredSkills: this.editWork.value['requiredSkills'].split('\n'),
      niceSkills: this.editWork.value['niceSkills'].split('\n'),
      format: this.editWork.value['format'],
      logo: this.editWork.value['logo'],
      company: {
        location: this.editWork.value['companyLocation'],
        address: this.editWork.value['companyAddress'],
        name: this.editWork.value['companyName'],
        email: this.editWork.value['companyEmail'],
        phone: this.editWork.value['companyPhone']
      }
    }
    this.httpClient.post<iwork>(`http://localhost:3000/work`, work).subscribe(
      () => this.newItemEvent.emit('work')
    )
  }

  cancel() {
    this.newItemEvent.emit('work')
  }

}
