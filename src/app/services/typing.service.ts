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
  
  // Acumuladores para múltiplas repetições
  private accumulatedErrors: number = 0;
  private accumulatedKeystrokes: number = 0;
  private accumulatedCorrectKeystrokes: number = 0;
  private accumulatedTime: number = 0;
  private accumulatedIntervals: number[] = [];

  // Observables para componentes se inscreverem
  private metricsSubject = new BehaviorSubject<TypingMetrics>(this.getInitialMetrics());
  public metrics$: Observable<TypingMetrics> = this.metricsSubject.asObservable();

  private keyPressSubject = new Subject<KeyStroke>();
  public keyPress$: Observable<KeyStroke> = this.keyPressSubject.asObservable();

  constructor() {}

  /**
   * Inicializa uma nova sessão de treino
   */
  startSession(text: string, resetAccumulated: boolean = false): void {
    this.targetText = text;
    this.keyStrokes = [];
    this.startTime = Date.now();
    this.lastKeyTime = this.startTime;
    this.currentIndex = 0;
    
    // Resetar acumuladores apenas se for uma nova sessão completa
    if (resetAccumulated) {
      this.accumulatedErrors = 0;
      this.accumulatedKeystrokes = 0;
      this.accumulatedCorrectKeystrokes = 0;
      this.accumulatedTime = 0;
      this.accumulatedIntervals = [];
    }
    
    this.metricsSubject.next(this.calculateMetrics());
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
    const currentElapsedTime = this.startTime > 0 ? Date.now() - this.startTime : 0;
    const totalElapsedTime = currentElapsedTime + this.accumulatedTime;
    const totalElapsedMinutes = totalElapsedTime / 60000;

    const correctKeystrokes = this.keyStrokes.filter(k => k.correct).length;
    const totalKeystrokes = this.keyStrokes.length;
    const errors = totalKeystrokes - correctKeystrokes;
    
    // Incluir valores acumulados de repetições anteriores
    const totalErrors = errors + this.accumulatedErrors;
    const totalKeystrokesWithAccumulated = totalKeystrokes + this.accumulatedKeystrokes;
    const totalCorrectKeystrokesWithAccumulated = correctKeystrokes + this.accumulatedCorrectKeystrokes;

    // PPM: baseado no tempo total de todas as repetições
    const ppm = totalElapsedMinutes > 0 ? 
      Math.round((totalCorrectKeystrokesWithAccumulated / 5) / totalElapsedMinutes) : 0;
    
    // CPM: baseado no tempo total de todas as repetições
    const cpm = totalElapsedMinutes > 0 ? 
      Math.round(totalCorrectKeystrokesWithAccumulated / totalElapsedMinutes) : 0;
    
    // Precisão baseada em todas as repetições
    const accuracy = totalKeystrokesWithAccumulated > 0 ? 
      Math.round((totalCorrectKeystrokesWithAccumulated / totalKeystrokesWithAccumulated) * 100) : 100;

    // Consistência: baseada na variação dos intervalos entre teclas
    const consistency = this.calculateConsistency();

    return {
      ppm,
      cpm,
      accuracy,
      errors: totalErrors,
      totalKeystrokes: totalKeystrokesWithAccumulated,
      correctKeystrokes: totalCorrectKeystrokesWithAccumulated,
      elapsedTime: totalElapsedTime,
      consistency
    };
  }

  /**
   * Calcula a consistência do ritmo de digitação
   * Retorna um valor de 0-100, onde 100 é perfeitamente consistente
   */
  private calculateConsistency(): number {
    // Combinar intervalos da repetição atual com acumulados
    const currentIntervals = this.keyStrokes
      .filter(k => k.correct)
      .map(k => k.timeSinceLast)
      .filter(t => t > 0 && t < 2000);
    
    const allIntervals = [...this.accumulatedIntervals, ...currentIntervals];

    if (allIntervals.length < 3) {
      return 0; // Não há dados suficientes ainda
    }

    // Calcular desvio padrão de todos os intervalos
    const mean = allIntervals.reduce((a, b) => a + b, 0) / allIntervals.length;
    
    if (mean === 0) {
      return 0;
    }
    
    const variance = allIntervals.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / allIntervals.length;
    const stdDev = Math.sqrt(variance);

    // Coeficiente de variação (CV) - quanto menor, mais consistente
    const cv = (stdDev / mean) * 100;
    
    // Converter CV para pontuação de consistência (0-100)
    // CV baixo (< 20) = alta consistência (> 80)
    // CV alto (> 50) = baixa consistência (< 50)
    const consistency = Math.max(0, Math.min(100, 100 - cv));
    
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
      consistency: 0
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
   * Acumula as métricas da repetição atual antes de resetar
   */
  accumulateCurrentRepetition(): void {
    const correctKeystrokes = this.keyStrokes.filter(k => k.correct).length;
    const totalKeystrokes = this.keyStrokes.length;
    const errors = totalKeystrokes - correctKeystrokes;
    const currentElapsedTime = Date.now() - this.startTime;
    
    // Acumular intervalos para cálculo de consistência
    const intervals = this.keyStrokes
      .filter(k => k.correct)
      .map(k => k.timeSinceLast)
      .filter(t => t > 0 && t < 2000);
    
    this.accumulatedErrors += errors;
    this.accumulatedKeystrokes += totalKeystrokes;
    this.accumulatedCorrectKeystrokes += correctKeystrokes;
    this.accumulatedTime += currentElapsedTime;
    this.accumulatedIntervals.push(...intervals);
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
    this.accumulatedErrors = 0;
    this.accumulatedKeystrokes = 0;
    this.accumulatedCorrectKeystrokes = 0;
    this.accumulatedTime = 0;
    this.accumulatedIntervals = [];
    this.metricsSubject.next(this.getInitialMetrics());
  }
}
