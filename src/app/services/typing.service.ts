import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface TypingMetrics {
  ppm: number; // Presses per minute
  cpm: number; // Characters per minute
  accuracy: number; // Percentage
  errors: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  elapsedTime: number; // milliseconds
  consistency: number; // Variação do ritmo (0-100)
}

export interface KeyStroke {
  key: string;
  timestamp: number;
  correct: boolean;
  expected: string;
  timeSinceLast: number;
}

@Injectable({
  providedIn: 'root'
})
export class TypingService {
  private keyStrokes: KeyStroke[] = [];
  private startTime: number = 0;
  private lastKeyTime: number = 0;
  private currentIndex: number = 0;
  private targetText: string = '';

  // Observables para componentes se inscreverem
  private metricsSubject = new BehaviorSubject<TypingMetrics>(this.getInitialMetrics());
  public metrics$: Observable<TypingMetrics> = this.metricsSubject.asObservable();

  private keyPressSubject = new Subject<KeyStroke>();
  public keyPress$: Observable<KeyStroke> = this.keyPressSubject.asObservable();

  constructor() {}

  /**
   * Inicializa uma nova sessão de treino
   */
  startSession(text: string): void {
    this.targetText = text;
    this.keyStrokes = [];
    this.startTime = Date.now();
    this.lastKeyTime = this.startTime;
    this.currentIndex = 0;
    this.metricsSubject.next(this.getInitialMetrics());
  }

  /**
   * Processa uma tecla digitada
   */
  processKeyPress(key: string): boolean {
    if (this.currentIndex >= this.targetText.length) {
      return false; // Sessão já completa
    }

    const now = Date.now();
    const expectedChar = this.targetText[this.currentIndex];
    const isCorrect = key === expectedChar;

    const keyStroke: KeyStroke = {
      key,
      timestamp: now,
      correct: isCorrect,
      expected: expectedChar,
      timeSinceLast: now - this.lastKeyTime
    };

    this.keyStrokes.push(keyStroke);
    this.lastKeyTime = now;

    if (isCorrect) {
      this.currentIndex++;
    }

    // Emitir evento de tecla pressionada
    this.keyPressSubject.next(keyStroke);

    // Atualizar métricas
    this.updateMetrics();

    return isCorrect;
  }

  /**
   * Calcula e atualiza as métricas em tempo real
   */
  private updateMetrics(): void {
    const metrics = this.calculateMetrics();
    this.metricsSubject.next(metrics);
  }

  /**
   * Calcula todas as métricas baseadas nos keystrokes
   */
  private calculateMetrics(): TypingMetrics {
    if (this.keyStrokes.length === 0) {
      return this.getInitialMetrics();
    }

    const elapsedTime = Date.now() - this.startTime;
    const elapsedMinutes = elapsedTime / 60000;

    const correctKeystrokes = this.keyStrokes.filter(k => k.correct).length;
    const totalKeystrokes = this.keyStrokes.length;
    const errors = totalKeystrokes - correctKeystrokes;

    // PPM: considera pressionamentos de tecla por minuto
    const ppm = elapsedMinutes > 0 ? Math.round((correctKeystrokes / 5) / elapsedMinutes) : 0;
    
    // CPM: caracteres por minuto
    const cpm = elapsedMinutes > 0 ? Math.round(correctKeystrokes / elapsedMinutes) : 0;
    
    // Precisão
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

    // Consistência: baseada na variação dos intervalos entre teclas
    const consistency = this.calculateConsistency();

    return {
      ppm,
      cpm,
      accuracy,
      errors,
      totalKeystrokes,
      correctKeystrokes,
      elapsedTime,
      consistency
    };
  }

  /**
   * Calcula a consistência do ritmo de digitação
   * Retorna um valor de 0-100, onde 100 é perfeitamente consistente
   */
  private calculateConsistency(): number {
    if (this.keyStrokes.length < 2) {
      return 100;
    }

    const intervals = this.keyStrokes
      .filter(k => k.correct) // Apenas teclas corretas
      .map(k => k.timeSinceLast)
      .filter(t => t > 0 && t < 2000); // Filtrar valores extremos

    if (intervals.length < 2) {
      return 100;
    }

    // Calcular desvio padrão
    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);

    // Normalizar: quanto menor o desvio, maior a consistência
    const consistency = Math.max(0, 100 - (stdDev / mean * 100));
    return Math.round(consistency);
  }

  /**
   * Retorna as métricas iniciais
   */
  private getInitialMetrics(): TypingMetrics {
    return {
      ppm: 0,
      cpm: 0,
      accuracy: 100,
      errors: 0,
      totalKeystrokes: 0,
      correctKeystrokes: 0,
      elapsedTime: 0,
      consistency: 100
    };
  }

  /**
   * Retorna o índice atual no texto
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Verifica se a sessão foi completada
   */
  isComplete(): boolean {
    return this.currentIndex >= this.targetText.length;
  }

  /**
   * Retorna o texto alvo atual
   */
  getTargetText(): string {
    return this.targetText;
  }

  /**
   * Retorna todos os keystrokes da sessão
   */
  getKeyStrokes(): KeyStroke[] {
    return [...this.keyStrokes];
  }

  /**
   * Retorna métricas finais da sessão
   */
  getFinalMetrics(): TypingMetrics {
    return this.calculateMetrics();
  }

  /**
   * Análise de erros por tecla específica
   */
  getErrorsByKey(): Map<string, number> {
    const errorMap = new Map<string, number>();
    
    this.keyStrokes
      .filter(k => !k.correct)
      .forEach(k => {
        const count = errorMap.get(k.expected) || 0;
        errorMap.set(k.expected, count + 1);
      });

    return errorMap;
  }

  /**
   * Reseta o serviço
   */
  reset(): void {
    this.keyStrokes = [];
    this.startTime = 0;
    this.lastKeyTime = 0;
    this.currentIndex = 0;
    this.targetText = '';
    this.metricsSubject.next(this.getInitialMetrics());
  }
}
