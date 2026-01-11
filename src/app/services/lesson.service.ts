import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  targetKeys: string[];
  text: string;
  minPPM: number;
  minAccuracy: number;
  repetitionCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  public lessons$ = this.lessonsSubject.asObservable();
  private lessons: Lesson[] = [];

  constructor(private http: HttpClient) {
    this.loadLessons();
  }

  /**
   * Carrega as lições do arquivo JSON
   */
  private loadLessons(): void {
    this.http.get<Lesson[]>('./assets/data/lessons.json').subscribe({
      next: (data) => {
        this.lessons = data;
        this.lessonsSubject.next(data);
      },
      error: (error) => {
        console.error('Erro ao carregar lições:', error);
        this.lessons = [];
        this.lessonsSubject.next([]);
      }
    });
  }

  /**
   * Retorna todas as lições
   */
  getAllLessons(): Lesson[] {
    return [...this.lessons];
  }

  /**
   * Retorna uma lição específica por ID
   */
  getLessonById(id: number): Lesson | undefined {
    return this.lessons.find(lesson => lesson.id === id);
  }

  /**
   * Retorna lições por nível
   */
  getLessonsByLevel(level: Lesson['level']): Lesson[] {
    return this.lessons.filter(lesson => lesson.level === level);
  }

  /**
   * Retorna a próxima lição
   */
  getNextLesson(currentId: number): Lesson | undefined {
    return this.lessons.find(lesson => lesson.id === currentId + 1);
  }

  /**
   * Verifica se o usuário passou nos requisitos da lição
   */
  checkLessonPassed(lesson: Lesson, ppm: number, accuracy: number): boolean {
    return ppm >= lesson.minPPM && accuracy >= lesson.minAccuracy;
  }

  /**
   * Retorna estatísticas gerais das lições
   */
  getLessonStats() {
    return {
      total: this.lessons.length,
      beginner: this.lessons.filter(l => l.level === 'beginner').length,
      intermediate: this.lessons.filter(l => l.level === 'intermediate').length,
      advanced: this.lessons.filter(l => l.level === 'advanced').length,
      expert: this.lessons.filter(l => l.level === 'expert').length
    };
  }
}
