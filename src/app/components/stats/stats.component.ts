import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, UserStats, SessionHistory } from '../../services/storage.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  stats: UserStats | null = null;
  sessionHistory: SessionHistory[] = [];
  errorsByKeyArray: { key: string; count: number }[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadStats();
    await this.loadHistory();
  }

  async loadStats(): Promise<void> {
    this.stats = await this.storageService.getStats();
    
    // Converter errorsByKey em array para exibição
    if (this.stats && this.stats.errorsByKey) {
      this.errorsByKeyArray = Object.entries(this.stats.errorsByKey)
        .map(([key, count]) => ({ key, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 erros
    }
  }

  async loadHistory(): Promise<void> {
    this.sessionHistory = await this.storageService.getSessionHistory(10);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getPerformanceRating(ppm: number): string {
    if (ppm >= 60) return 'Expert 🏆';
    if (ppm >= 45) return 'Avançado 🌟';
    if (ppm >= 30) return 'Intermediário 💪';
    if (ppm >= 20) return 'Iniciante 📚';
    return 'Praticando 🌱';
  }

  getAccuracyRating(accuracy: number): string {
    if (accuracy >= 98) return 'Perfeito! 🎯';
    if (accuracy >= 95) return 'Excelente ✨';
    if (accuracy >= 90) return 'Muito Bom 👍';
    if (accuracy >= 80) return 'Bom 👌';
    return 'Precisa Melhorar 📖';
  }
}
