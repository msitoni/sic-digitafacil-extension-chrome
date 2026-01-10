import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LessonService, Lesson } from '../../services/lesson.service';
import { StorageService, UserProgress } from '../../services/storage.service';
import { UserService, UserProfile } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lessons: Lesson[] = [];
  progress: UserProgress | null = null;
  selectedLevel: 'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'all';
  currentUser: UserProfile | null = null;
  showLanguageSelector = false;
  currentLanguage = 'pt-BR';
  availableLanguages: Array<{code: 'pt-BR' | 'en' | 'es' | 'de' | 'fr' | 'it' | 'ja' | 'zh' | 'ru' | 'ar', name: string, flag: string}> = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  constructor(
    private lessonService: LessonService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Verifica se há usuário logado
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        // Redireciona para seleção de usuário se não estiver logado
        this.router.navigate(['/user-selector']);
      }
    });

    // Carrega idioma atual
    this.storageService.settings$.subscribe(settings => {
      if (settings && settings.language) {
        this.currentLanguage = settings.language;
      }
    });

    this.loadLessons();
    this.loadProgress();
  }

  toggleLanguageSelector(): void {
    this.showLanguageSelector = !this.showLanguageSelector;
  }

  async changeLanguage(languageCode: string): Promise<void> {
    this.currentLanguage = languageCode;
    await this.storageService.updateSetting('language', languageCode as any);
    this.translate.use(languageCode);
    this.showLanguageSelector = false;
  }

  getCurrentLanguageFlag(): string {
    const lang = this.availableLanguages.find(l => l.code === this.currentLanguage);
    return lang ? lang.flag : '🌐';
  }

  async logout(): Promise<void> {
    await this.userService.logout();
    this.router.navigate(['/user-selector']);
  }

  loadLessons(): void {
    if (this.selectedLevel === 'all') {
      this.lessons = this.lessonService.getAllLessons();
    } else {
      this.lessons = this.lessonService.getLessonsByLevel(this.selectedLevel);
    }
  }

  loadProgress(): void {
    this.storageService.progress$.subscribe(progress => {
      this.progress = progress;
    });
  }

  startLesson(lessonId: number): void {
    this.router.navigate(['/lesson', lessonId]);
  }

  isLessonCompleted(lessonId: number): boolean {
    return this.progress?.completedLessons.includes(lessonId) || false;
  }

  isLessonLocked(lessonId: number): boolean {
    if (!this.progress) return lessonId > 1;
    // Libera a lição se a anterior foi completada ou se é a primeira
    return lessonId > 1 && !this.progress.completedLessons.includes(lessonId - 1);
  }

  filterByLevel(level: 'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert'): void {
    this.selectedLevel = level;
    this.loadLessons();
  }

  getLevelColor(level: string): string {
    switch (level) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#3b82f6';
      case 'advanced': return '#f59e0b';
      case 'expert': return '#ef4444';
      default: return '#6b7280';
    }
  }

  getLevelLabel(level: string): string {
    switch (level) {
      case 'beginner': return this.translate.instant('HOME.BEGINNER');
      case 'intermediate': return this.translate.instant('HOME.INTERMEDIATE');
      case 'advanced': return this.translate.instant('HOME.ADVANCED');
      case 'expert': return this.translate.instant('HOME.EXPERT');
      default: return '';
    }
  }

  goToStats(): void {
    this.router.navigate(['/stats']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  goToInstructions(): void {
    this.router.navigate(['/instructions']);
  }

  getProgressPercentage(): number {
    if (!this.progress) return 0;
    const totalLessons = this.lessonService.getAllLessons().length;
    return Math.round((this.progress.completedLessons.length / totalLessons) * 100);
  }
}
