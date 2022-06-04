import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './menu/menu.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseComponent } from './shared/course/course.component';
import { CourseViewComponent } from './pages/course-view/course-view.component';
import { WorkComponent } from './pages/work/work.component';
import { WorkBlockComponent } from './shared/work-block/work-block.component';
import { WorkViewComponent } from './pages/work-view/work-view.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsViewComponent } from './pages/news-view/news-view.component';
import { EventsComponent } from './pages/events/events.component';
import { AdminComponent } from './admin/admin.component';
import { CourseFormComponent } from './shared/course-form/course-form.component';
import { WorkFormComponent } from './shared/work-form/work-form.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    CoursesComponent,
    CourseComponent,
    CourseViewComponent,
    WorkComponent,
    WorkBlockComponent,
    WorkViewComponent,
    AboutUsComponent,
    NewsComponent,
    NewsViewComponent,
    EventsComponent,
    AdminComponent,
    CourseFormComponent,
    WorkFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
