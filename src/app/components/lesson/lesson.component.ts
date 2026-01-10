import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TypingService, TypingMetrics } from '../../services/typing.service';
import { LessonService, Lesson } from '../../services/lesson.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, OnDestroy {
  lesson: Lesson | null = null;
  targetText: string = '';
  currentIndex: number = 0;
  userInput: string = '';
  
  // Controle de repetições para lições beginner
  currentRepetition: number = 1;
  totalRepetitions: number = 1;
  
  metrics: TypingMetrics = {
    ppm: 0,
    cpm: 0,
    accuracy: 100,
    errors: 0,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    elapsedTime: 0,
    consistency: 100
  };
  
  isStarted: boolean = false;
  isComplete: boolean = false;
  isPaused: boolean = false;
  showResults: boolean = false;
  passed: boolean = false;
  
  private destroy$ = new Subject<void>();
  private soundEnabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private typingService: TypingService,
    private lessonService: LessonService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Carregar lição
    const lessonId = Number(this.route.snapshot.paramMap.get('id')) || 1;
    this.lesson = this.lessonService.getLessonById(lessonId) || null;
    
    if (!this.lesson) {
      this.router.navigate(['/']);
      return;
    }
    
    this.targetText = this.lesson.text;
    
    // Configurar repetições para lições beginner
    if (this.lesson.level === 'beginner' && this.lesson.repetitionCount) {
      this.totalRepetitions = this.lesson.repetitionCount;
      this.currentRepetition = 1;
    }
    
    // Carregar configurações
    this.storageService.settings$.pipe(takeUntil(this.destroy$)).subscribe(settings => {
      if (settings) {
        this.soundEnabled = settings.soundEnabled;
      }
    });
    
    // Inscrever-se nas métricas
    this.typingService.metrics$.pipe(takeUntil(this.destroy$)).subscribe(metrics => {
      this.metrics = metrics;
    });
    
    // Inscrever-se em eventos de tecla
    this.typingService.keyPress$.pipe(takeUntil(this.destroy$)).subscribe(keyStroke => {
      this.currentIndex = this.typingService.getCurrentIndex();
      
      if (keyStroke.correct && this.soundEnabled) {
        this.playSound('correct');
      } else if (!keyStroke.correct && this.soundEnabled) {
        this.playSound('error');
      }
      
      // Verificar se completou
      if (this.typingService.isComplete()) {
        this.handleRepetitionComplete();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Captura eventos de teclado
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent): void {
    if (this.isComplete || this.isPaused || this.showResults) {
      return;
    }
    
    // Prevenir atalhos do navegador
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }
    
    // Ignorar teclas especiais (exceto backspace e enter)
    if (event.key.length > 1 && event.key !== 'Backspace' && event.key !== 'Enter') {
      return;
    }
    
    event.preventDefault();
    
    // Iniciar sessão no primeiro caractere
    if (!this.isStarted) {
      this.startLesson();
    }
    
    // Processar tecla
    if (event.key === 'Backspace') {
      // Não permitir backspace neste modo (opcional)
      return;
    }
    
    const key = event.key === 'Enter' ? '\n' : event.key;
    this.typingService.processKeyPress(key);
  }

  /**
   * Inicia a lição
   */
  startLesson(): void {
    this.isStarted = true;
    // Resetar acumuladores apenas na primeira repetição
    const resetAccumulated = this.currentRepetition === 1;
    this.typingService.startSession(this.targetText, resetAccumulated);
  }

  /**
   * Reinicia a lição
   */
  restartLesson(): void {
    this.isStarted = false;
    this.isComplete = false;
    this.showResults = false;
    this.currentIndex = 0;
    this.userInput = '';
    this.currentRepetition = 1;
    this.typingService.reset();
  }

  /**
   * Pausa/Resume a lição
   */
  togglePause(): void {
    this.isPaused = !this.isPaused;
  }

  /**
   * Manipula a conclusão de uma repetição
   */
  private handleRepetitionComplete(): void {
    // Se há repetições e ainda não completou todas
    if (this.totalRepetitions > 1 && this.currentRepetition < this.totalRepetitions) {
      // Acumular métricas da repetição atual antes de resetar
      this.typingService.accumulateCurrentRepetition();
      
      this.currentRepetition++;
      this.currentIndex = 0;
      
      // Iniciar nova repetição sem resetar acumuladores
      this.typingService.startSession(this.targetText, false);
    } else {
      // Completou todas as repetições
      this.completeLesson();
    }
  }

  /**
   * Completa a lição
   */
  private async completeLesson(): Promise<void> {
    this.isComplete = true;
    this.showResults = true;
    
    const finalMetrics = this.typingService.getFinalMetrics();
    const errorsByKey = this.typingService.getErrorsByKey();
    
    // Verificar se passou
    if (this.lesson) {
      this.passed = this.lessonService.checkLessonPassed(
        this.lesson,
        finalMetrics.ppm,
        finalMetrics.accuracy
      );
      
      // Salvar progresso se passou
      if (this.passed) {
        const practiceTime = Math.round(finalMetrics.elapsedTime / 60000); // minutos
        await this.storageService.completeLesson(this.lesson.id, practiceTime);
      }
      
      // Salvar estatísticas
      await this.storageService.updateStats(finalMetrics, errorsByKey);
      
      // Salvar sessão no histórico
      await this.storageService.saveSession(this.lesson.id, finalMetrics, this.passed);
    }
    
    if (this.passed && this.soundEnabled) {
      this.playSound('success');
    }
  }

  /**
   * Navega para próxima lição
   */
  nextLesson(): void {
    if (this.lesson) {
      const nextLesson = this.lessonService.getNextLesson(this.lesson.id);
      if (nextLesson) {
        this.router.navigate(['/lesson', nextLesson.id]);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  /**
   * Volta para a lista de lições
   */
  backToLessons(): void {
    this.router.navigate(['/']);
  }

  /**
   * Retorna o caractere esperado na posição atual
   */
  getExpectedChar(): string {
    return this.targetText[this.currentIndex] || '';
  }

  /**
   * Verifica se um caractere foi digitado
   */
  isCharTyped(index: number): boolean {
    return index < this.currentIndex;
  }

  /**
   * Verifica se é o caractere atual
   */
  isCurrentChar(index: number): boolean {
    return index === this.currentIndex;
  }

  /**
   * Toca um som de feedback
   */
  private playSound(type: 'correct' | 'error' | 'success'): void {
    // Implementar sons usando Web Audio API ou simplesmente beep
    // Por simplicidade, usando AudioContext para criar beeps
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'correct') {
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
      } else if (type === 'error') {
        oscillator.frequency.value = 200;
        gainNode.gain.value = 0.15;
      } else if (type === 'success') {
        oscillator.frequency.value = 1000;
        gainNode.gain.value = 0.2;
      }
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
      console.error('Erro ao tocar som:', e);
    }
  }

  /**
   * Formata tempo em MM:SS
   */
  formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  /**
   * Retorna cor baseada na precisão
   */
  getAccuracyColor(): string {
    if (this.metrics.accuracy >= 95) return '#10b981'; // verde
    if (this.metrics.accuracy >= 90) return '#3b82f6'; // azul
    if (this.metrics.accuracy >= 80) return '#f59e0b'; // laranja
    return '#ef4444'; // vermelho
  }

  /**
   * Retorna cor baseada no PPM
   */
  getPPMColor(): string {
    if (!this.lesson) return '#6b7280';
    
    if (this.metrics.ppm >= this.lesson.minPPM * 1.5) return '#10b981';
    if (this.metrics.ppm >= this.lesson.minPPM) return '#3b82f6';
    if (this.metrics.ppm >= this.lesson.minPPM * 0.8) return '#f59e0b';
    return '#ef4444';
  }
}
