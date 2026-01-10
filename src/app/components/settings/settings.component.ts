import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, UserSettings } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: UserSettings | null = null;
  showResetConfirm = false;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storageService.settings$.subscribe(settings => {
      this.settings = settings;
    });
  }

  async updateLayout(layout: UserSettings['layout']): Promise<void> {
    await this.storageService.updateSetting('layout', layout);
  }

  async updateDifficulty(difficulty: UserSettings['difficulty']): Promise<void> {
    await this.storageService.updateSetting('difficulty', difficulty);
  }

  async updateTheme(theme: UserSettings['theme']): Promise<void> {
    await this.storageService.updateSetting('theme', theme);
  }

  async toggleSound(): Promise<void> {
    if (this.settings) {
      await this.storageService.updateSetting('soundEnabled', !this.settings.soundEnabled);
    }
  }

  async toggleKeyboard(): Promise<void> {
    if (this.settings) {
      await this.storageService.updateSetting('showKeyboard', !this.settings.showKeyboard);
    }
  }

  async toggleReminders(): Promise<void> {
    if (this.settings) {
      await this.storageService.updateSetting('practiceReminders', !this.settings.practiceReminders);
    }
  }

  showResetDialog(): void {
    this.showResetConfirm = true;
  }

  cancelReset(): void {
    this.showResetConfirm = false;
  }

  async confirmReset(): Promise<void> {
    try {
      await this.storageService.clearAllData();
      this.showResetConfirm = false;
      alert('Todos os dados foram resetados com sucesso!');
      this.router.navigate(['/']);
    } catch (error) {
      alert('Erro ao resetar dados. Tente novamente.');
    }
  }

  async syncData(): Promise<void> {
    try {
      await this.storageService.syncData();
      alert('Dados sincronizados com sucesso!');
    } catch (error) {
      alert('Erro ao sincronizar dados.');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
