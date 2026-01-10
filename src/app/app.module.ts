import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { StatsComponent } from './components/stats/stats.component';
import { SettingsComponent } from './components/settings/settings.component';

import { TypingService } from './services/typing.service';
import { LessonService } from './services/lesson.service';
import { StorageService } from './services/storage.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lesson/:id', component: LessonComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonComponent,
    StatsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    TypingService,
    LessonService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
