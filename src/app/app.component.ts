import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'DigitaFacil';

  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
    private userService: UserService
  ) {
    // Idiomas disponíveis
    translate.addLangs(['pt-BR', 'en', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ru', 'ar']);
    translate.setDefaultLang('pt-BR');
  }

  async ngOnInit() {
    // Carregar idioma salvo nas configurações do usuário
    this.storageService.settings$.subscribe(settings => {
      if (settings && settings.language) {
        console.log('Carregando idioma do usuário:', settings.language);
        this.translate.use(settings.language);
      } else {
        // Se não houver configuração, usar idioma padrão
        const browserLang = this.translate.getBrowserLang();
        const defaultLang = browserLang === 'pt' ? 'pt-BR' : 
                           browserLang === 'es' ? 'es' : 
                           browserLang === 'en' ? 'en' : 'pt-BR';
        console.log('Usando idioma padrão:', defaultLang);
        this.translate.use(defaultLang);
      }
    });
  }
}
