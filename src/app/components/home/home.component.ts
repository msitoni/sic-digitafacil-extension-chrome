import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LessonService, Lesson } from '../../services/lesson.service';
import { StorageService, UserProgress } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lessons: Lesson[] = [];
  progress: UserProgress | null = null;
  selectedLevel: 'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'all';

  constructor(
    private lessonService: LessonService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLessons();
    this.loadProgress();
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
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      case 'expert': return 'Expert';
      default: return '';
    }
  }

  goToStats(): void {
    this.router.navigate(['/stats']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  getProgressPercentage(): number {
    if (!this.progress) return 0;
    const totalLessons = this.lessonService.getAllLessons().length;
    return Math.round((this.progress.completedLessons.length / totalLessons) * 100);
  }
}
