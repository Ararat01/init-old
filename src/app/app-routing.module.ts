import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CourseViewComponent } from './pages/course-view/course-view.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { EventsComponent } from './pages/events/events.component';
import { MainComponent } from './pages/main/main.component';
import { NewsComponent } from './pages/news/news.component';
import { WorkComponent } from './pages/work/work.component';


const route: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'work',
    component: WorkComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'QmYzcL6JuYNR62Vc',
    component: AdminComponent
  }
  //   {
  //     path: 'user',
  //     loadChildren: () => import('./modules/userModule/user.module').then(
  //       module => module.UserModule
  //     ) 
  //   },
];

@NgModule({
  imports: [
    RouterModule.forRoot(route, { scrollPositionRestoration: 'enabled' })//, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }