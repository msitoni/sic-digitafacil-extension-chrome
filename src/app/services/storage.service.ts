import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { TypingMetrics } from './typing.service';
import { UserService } from './user.service';
import { StorageAdapter } from '../utils/storage-adapter';

export interface UserSettings {
  layout: 'ABNT2' | 'US' | 'ABNT' | 'UK';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  practiceReminders: boolean;
  showKeyboard: boolean;
  language: 'pt-BR' | 'en' | 'es' | 'de' | 'fr' | 'it' | 'ja' | 'zh' | 'ru' | 'ar';
}

export interface UserProgress {
  currentLesson: number;
  completedLessons: number[];
  totalPracticeTime: number; // em minutos
  streak: number; // dias consecutivos
  lastPracticeDate: string;
  level: number;
  xp: number;
}

export interface SessionHistory {
  id: string;
  date: string;
  lessonId: number;
  metrics: TypingMetrics;
  duration: number; // seconds
  completed: boolean;
}

export interface UserStats {
  bestPPM: number;
  averagePPM: number;
  bestAccuracy: number;
  averageAccuracy: number;
  totalKeystrokes: number;
  totalErrors: number;
  totalSessions: number;
  errorsByKey: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private settingsSubject = new BehaviorSubject<UserSettings | null>(null);
  public settings$ = this.settingsSubject.asObservable();

  private progressSubject = new BehaviorSubject<UserProgress | null>(null);
  public progress$ = this.progressSubject.asObservable();

  constructor(private userService: UserService) {
    // Aguarda o usuário estar logado para carregar dados
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.loadSettings();
        this.loadProgress();
      } else {
        // Limpa dados quando usuário desloga
        this.settingsSubject.next(null);
        this.progressSubject.next(null);
      }
    });
  }

  /**
   * Força o recarregamento dos dados (útil após login)
   */
  async reloadData(): Promise<void> {
    await this.loadSettings();
    await this.loadProgress();
  }

  /**
   * Obtém a chave de storage com prefixo do usuário
   */
  private getStorageKey(key: string): string {
    try {
      const prefix = this.userService.getUserStoragePrefix();
      return `${prefix}${key}`;
    } catch (error) {
      // Se não houver usuário logado, usa chave sem prefixo (compatibilidade)
      return key;
    }
  }

  // ==================== SETTINGS ====================

  /**
   * Carrega configurações do Chrome Storage
   */
  private async loadSettings(): Promise<void> {
    try {
      const storageKey = this.getStorageKey('settings');
      const result = await StorageAdapter.get(storageKey);
      const settings = result[storageKey] || this.getDefaultSettings();
      this.settingsSubject.next(settings);
    } catch (error) {
      console.error('Erro ao carregar settings:', error);
      this.settingsSubject.next(this.getDefaultSettings());
    }
  }

  /**
   * Salva configurações no Chrome Storage
   */
  async saveSettings(settings: UserSettings): Promise<void> {
    try {
      const storageKey = this.getStorageKey('settings');
      await StorageAdapter.set({ [storageKey]: settings });
      this.settingsSubject.next(settings);
    } catch (error) {
      console.error('Erro ao salvar settings:', error);
      throw error;
    }
  }

  /**
   * Retorna configurações padrão
   */
  private getDefaultSettings(): UserSettings {
    return {
      layout: 'ABNT2',
      difficulty: 'beginner',
      soundEnabled: true,
      theme: 'light',
      practiceReminders: false,
      showKeyboard: true,
      language: 'pt-BR'
    };
  }

  /**
   * Atualiza uma configuração específica
   */
  async updateSetting<K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ): Promise<void> {
    const currentSettings = this.settingsSubject.value || this.getDefaultSettings();
    const updatedSettings = { ...currentSettings, [key]: value };
    await this.saveSettings(updatedSettings);
  }

  // ==================== PROGRESS ====================

  /**
   * Carrega progresso do Chrome Storage
   */
  private async loadProgress(): Promise<void> {
    try {
      const storageKey = this.getStorageKey('progress');
      console.log('Loading progress with key:', storageKey);
      const result = await StorageAdapter.get(storageKey);
      const progress = result[storageKey] || this.getDefaultProgress();
      console.log('Progress loaded:', JSON.stringify(progress));
      this.progressSubject.next(progress);
    } catch (error) {
      console.error('Erro ao carregar progress:', error);
      this.progressSubject.next(this.getDefaultProgress());
    }
  }

  /**
   * Salva progresso no Chrome Storage
   */
  async saveProgress(progress: UserProgress): Promise<void> {
    try {
      const storageKey = this.getStorageKey('progress');
      console.log('Saving progress with key:', storageKey);
      console.log('Progress data to save:', JSON.stringify(progress));
      await StorageAdapter.set({ [storageKey]: progress });
      this.progressSubject.next(progress);
      console.log('Progress saved and subject updated');
    } catch (error) {
      console.error('Erro ao salvar progress:', error);
      throw error;
    }
  }

  /**
   * Retorna progresso padrão
   */
  private getDefaultProgress(): UserProgress {
    return {
      currentLesson: 1,
      completedLessons: [],
      totalPracticeTime: 0,
      streak: 0,
      lastPracticeDate: '',
      level: 1,
      xp: 0
    };
  }

  /**
   * Marca uma lição como completa
   */
  async completeLesson(lessonId: number, practiceTime: number): Promise<void> {
    console.log('completeLesson called:', { lessonId, practiceTime });
    const progress = this.progressSubject.value || this.getDefaultProgress();
    console.log('Current progress before update:', JSON.stringify(progress));
    
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      console.log('Added lesson to completedLessons:', lessonId);
    } else {
      console.log('Lesson already completed:', lessonId);
    }
    
    progress.totalPracticeTime += practiceTime;
    progress.currentLesson = Math.max(progress.currentLesson, lessonId + 1);
    
    // Atualizar XP e nível
    progress.xp += this.calculateXP(practiceTime);
    progress.level = this.calculateLevel(progress.xp);
    
    // Atualizar streak
    this.updateStreak(progress);
    
    console.log('Progress after update:', JSON.stringify(progress));
    await this.saveProgress(progress);
    console.log('Progress saved successfully');
  }

  /**
   * Calcula XP ganho baseado no tempo de prática
   */
  private calculateXP(practiceTimeMinutes: number): number {
    return Math.round(practiceTimeMinutes * 10);
  }

  /**
   * Calcula nível baseado no XP
   */
  private calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }

  /**
   * Atualiza o streak de dias consecutivos
   */
  private updateStreak(progress: UserProgress): void {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = progress.lastPracticeDate;
    
    if (lastDate === today) {
      return; // Já praticou hoje
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastDate === yesterdayStr) {
      progress.streak += 1; // Mantém streak
    } else if (lastDate !== today) {
      progress.streak = 1; // Reseta streak
    }
    
    progress.lastPracticeDate = today;
  }

  // ==================== STATS ====================

  /**
   * Carrega estatísticas do Chrome Storage
   */
  async getStats(): Promise<UserStats> {
    try {
      const storageKey = this.getStorageKey('stats');
      const result = await StorageAdapter.get(storageKey);
      return result[storageKey] || this.getDefaultStats();
    } catch (error) {
      console.error('Erro ao carregar stats:', error);
      return this.getDefaultStats();
    }
  }

  /**
   * Retorna estatísticas padrão
   */
  private getDefaultStats(): UserStats {
    return {
      bestPPM: 0,
      averagePPM: 0,
      bestAccuracy: 0,
      averageAccuracy: 0,
      totalKeystrokes: 0,
      totalErrors: 0,
      totalSessions: 0,
      errorsByKey: {}
    };
  }

  /**
   * Atualiza estatísticas após uma sessão
   */
  async updateStats(metrics: TypingMetrics, errorsByKey: Map<string, number>): Promise<void> {
    const stats = await this.getStats();
    
    stats.bestPPM = Math.max(stats.bestPPM, metrics.ppm);
    stats.bestAccuracy = Math.max(stats.bestAccuracy, metrics.accuracy);
    
    // Calcular nova média de WPM
    stats.averagePPM = Math.round(
      (stats.averagePPM * stats.totalSessions + metrics.ppm) / (stats.totalSessions + 1)
    );
    
    // Calcular nova média de precisão
    stats.averageAccuracy = Math.round(
      (stats.averageAccuracy * stats.totalSessions + metrics.accuracy) / (stats.totalSessions + 1)
    );
    
    stats.totalKeystrokes += metrics.totalKeystrokes;
    stats.totalErrors += metrics.errors;
    stats.totalSessions += 1;
    
    // Atualizar erros por tecla
    errorsByKey.forEach((count, key) => {
      stats.errorsByKey[key] = (stats.errorsByKey[key] || 0) + count;
    });
    
    const storageKey = this.getStorageKey('stats');
    await StorageAdapter.set({ [storageKey]: stats });
  }

  // ==================== SESSION HISTORY ====================

  /**
   * Salva histórico de uma sessão
   */
  async saveSession(lessonId: number, metrics: TypingMetrics, completed: boolean): Promise<void> {
    const session: SessionHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      lessonId,
      metrics,
      duration: Math.round(metrics.elapsedTime / 1000),
      completed
    };
    
    try {
      const storageKey = this.getStorageKey('sessionHistory');
      const result = await StorageAdapter.get(storageKey);
      const history: SessionHistory[] = result[storageKey] || [];
      
      // Manter apenas últimas 50 sessões
      history.unshift(session);
      if (history.length > 50) {
        history.pop();
      }
      
      await StorageAdapter.set({ [storageKey]: history });
    } catch (error) {
      console.error('Erro ao salvar sessão:', error);
    }
  }

  /**
   * Retorna histórico de sessões
   */
  async getSessionHistory(limit?: number): Promise<SessionHistory[]> {
    try {
      const storageKey = this.getStorageKey('sessionHistory');
      const result = await StorageAdapter.get(storageKey);
      const history: SessionHistory[] = result[storageKey] || [];
      return limit ? history.slice(0, limit) : history;
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      return [];
    }
  }

  // ==================== SYNC ====================

  /**
   * Sincroniza dados com chrome.storage.sync (limitado a 100KB)
   * Nota: Não funciona em desenvolvimento, apenas em produção como extensão
   */
  async syncData(): Promise<void> {
    try {
      // Verifica se está em contexto de extensão
      if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.sync) {
        console.warn('Sincronização não disponível em desenvolvimento');
        return;
      }

      const settings = this.settingsSubject.value;
      const progress = this.progressSubject.value;
      
      if (settings && progress) {
        await chrome.storage.sync.set({
          settings,
          progress: {
            currentLesson: progress.currentLesson,
            completedLessons: progress.completedLessons,
            level: progress.level,
            xp: progress.xp
          }
        });
      }
    } catch (error) {
      console.error('Erro ao sincronizar dados:', error);
    }
  }

  /**
   * Limpa todos os dados
   */
  async clearAllData(): Promise<void> {
    try {
      await StorageAdapter.clear();
      
      // Limpa sync storage se disponível
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        await chrome.storage.sync.clear();
      }
      
      this.settingsSubject.next(this.getDefaultSettings());
      this.progressSubject.next(this.getDefaultProgress());
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      throw error;
    }
  }
}
