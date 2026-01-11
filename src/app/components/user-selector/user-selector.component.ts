import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService, UserProfile } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
  users: UserProfile[] = [];
  showCreateForm = false;
  newUserName = '';
  errorMessage = '';
  loading = false;
  selectedLanguage: string = 'pt-BR';
  showLanguageSelector = false;
  
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
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private translate: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    // Detecta idioma do navegador ou usa pt-BR como padrão
    const browserLang = this.translate.getBrowserLang() || 'pt-BR';
    this.selectedLanguage = ['pt', 'en', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ru', 'ar'].includes(browserLang) 
      ? (browserLang === 'pt' ? 'pt-BR' : browserLang as any)
      : 'pt-BR';
    this.translate.use(this.selectedLanguage);
    
    await this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.users = await this.userService.getAllUsers();
    // Ordena por último acesso (mais recente primeiro)
    this.users.sort((a, b) => 
      new Date(b.lastAccess).getTime() - new Date(a.lastAccess).getTime()
    );
  }

  async selectUser(user: UserProfile): Promise<void> {
    try {
      this.loading = true;
      await this.userService.selectUser(user.id);
      // Force reload of all user data
      await this.storageService.reloadData();
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = 'Erro ao selecionar usuário';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    this.newUserName = '';
    this.errorMessage = '';
  }

  async createUser(): Promise<void> {
    if (!this.newUserName.trim()) {
      this.errorMessage = 'Por favor, digite um nome';
      return;
    }

    if (this.newUserName.trim().length < 2) {
      this.errorMessage = 'O nome deve ter pelo menos 2 caracteres';
      return;
    }

    if (this.newUserName.trim().length > 30) {
      this.errorMessage = 'O nome deve ter no máximo 30 caracteres';
      return;
    }

    try {
      this.loading = true;
      this.errorMessage = '';
      const newUser = await this.userService.createUser(this.newUserName);
      await this.userService.selectUser(newUser.id);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao criar usuário';
      console.error(error);
      this.loading = false;
    }
  }

  async deleteUser(event: Event, user: UserProfile): Promise<void> {
    event.stopPropagation();

    if (!confirm(`Tem certeza que deseja excluir o perfil "${user.name}"?\n\nTodos os dados e progresso serão perdidos permanentemente.`)) {
      return;
    }

    try {
      this.loading = true;
      await this.userService.deleteUser(user.id);
      await this.loadUsers();
    } catch (error) {
      this.errorMessage = 'Erro ao excluir usuário';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  getLastAccessText(lastAccess: string): string {
    const now = new Date();
    const accessDate = new Date(lastAccess);
    const diffMs = now.getTime() - accessDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `Há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    
    return accessDate.toLocaleDateString('pt-BR');
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.createUser();
    }
  }

  toggleLanguageSelector(): void {
    this.showLanguageSelector = !this.showLanguageSelector;
  }

  changeLanguage(languageCode: string): void {
    this.selectedLanguage = languageCode;
    this.translate.use(languageCode);
    this.showLanguageSelector = false;
  }

  getCurrentLanguageFlag(): string {
    const lang = this.availableLanguages.find(l => l.code === this.selectedLanguage);
    return lang ? lang.flag : '🌐';
  }

  getCurrentLanguageName(): string {
    const lang = this.availableLanguages.find(l => l.code === this.selectedLanguage);
    return lang ? lang.name : 'Language';
  }
}
