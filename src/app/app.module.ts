import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { StatsComponent } from './components/stats/stats.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

import { TypingService } from './services/typing.service';
import { LessonService } from './services/lesson.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

// Custom Translation Loader
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

// Função factory para carregar arquivos de tradução
export function createTranslateLoader(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

const routes: Routes = [
  { path: '', redirectTo: 'user-selector', pathMatch: 'full' },
  { path: 'user-selector', component: UserSelectorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'lesson/:id', component: LessonComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'user-selector' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonComponent,
    StatsComponent,
    SettingsComponent,
    UserSelectorComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    TranslateModule.forRoot({
      defaultLanguage: 'pt-BR',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TypingService,
    LessonService,
    StorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
