import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';

interface KeyboardLayout {
  numberRow: string[];
  topRow: string[];
  homeRow: string[];
  bottomRow: string[];
  homeRowHighlight: string[];
}

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
  currentStep = 0;
  currentLanguage = 'pt-BR';
  
  // Layouts de teclado por idioma
  keyboardLayouts: { [key: string]: KeyboardLayout } = {
    'pt-BR': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
      homeRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'],
      bottomRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ';', '/'],
      homeRowHighlight: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç']
    },
    'en': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
      homeRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      bottomRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '\''],
      homeRowHighlight: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';']
    },
    'es': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
      homeRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
      bottomRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ';', '/'],
      homeRowHighlight: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ']
    },
    'de': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ß', '´'],
      topRow: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü', '+'],
      homeRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö'],
      bottomRow: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-', 'Ä'],
      homeRowHighlight: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö']
    },
    'fr': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '^', '$'],
      homeRow: ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
      bottomRow: ['W', 'X', 'C', 'V', 'B', 'N', ',', ';', ':', '!', '/'],
      homeRowHighlight: ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M']
    },
    'it': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\'', 'ì'],
      topRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'è', '+'],
      homeRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ò'],
      bottomRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-', 'à'],
      homeRowHighlight: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ò']
    },
    'ja': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
      homeRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      bottomRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '\\'],
      homeRowHighlight: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';']
    },
    'zh': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
      homeRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      bottomRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '\\'],
      homeRowHighlight: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';']
    },
    'ru': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
      homeRow: ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж'],
      bottomRow: ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '/'],
      homeRowHighlight: ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж']
    },
    'ar': {
      numberRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      topRow: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
      homeRow: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك'],
      bottomRow: ['ئ', 'ء', 'ؤ', 'ر', 'ى', 'ة', 'و', 'ز', 'ظ', 'ط', '/'],
      homeRowHighlight: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك']
    }
  };
  
  steps = [
    {
      title: 'INSTRUCTIONS.STEP1_TITLE',
      description: 'INSTRUCTIONS.STEP1_DESC',
      highlightKeys: ['F', 'J']
    },
    {
      title: 'INSTRUCTIONS.STEP2_TITLE',
      description: 'INSTRUCTIONS.STEP2_DESC',
      highlightKeys: [] // Será preenchido dinamicamente
    },
    {
      title: 'INSTRUCTIONS.STEP3_TITLE',
      description: 'INSTRUCTIONS.STEP3_DESC',
      highlightKeys: [] // Será preenchido dinamicamente
    }
  ];

  leftHandKeys: { [key: string]: { [finger: string]: string[] } } = {
    'pt-BR': {
      pinky: ['A', 'Q', 'Z', '1'],
      ring: ['S', 'W', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'en': {
      pinky: ['A', 'Q', 'Z', '1'],
      ring: ['S', 'W', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'es': {
      pinky: ['A', 'Q', 'Z', '1'],
      ring: ['S', 'W', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'de': {
      pinky: ['A', 'Q', 'Y', '1'],
      ring: ['S', 'W', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'fr': {
      pinky: ['Q', 'A', 'W', '1'],
      ring: ['S', 'Z', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'it': {
      pinky: ['A', 'Q', 'Z', '1'],
      ring: ['S', 'W', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'ja': {
      pinky: ['A', 'Q', 'Z', '1'],
      ring: ['S', 'W', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'zh': {
      pinky: ['A', 'Q', 'Z', '1'],
      ring: ['S', 'W', 'X', '2'],
      middle: ['D', 'E', 'C', '3'],
      index: ['F', 'G', 'R', 'T', 'V', 'B', '4', '5']
    },
    'ru': {
      pinky: ['Ф', 'Й', 'Я', '1'],
      ring: ['Ы', 'Ц', 'Ч', '2'],
      middle: ['В', 'У', 'С', '3'],
      index: ['А', 'П', 'К', 'Е', 'М', 'И', '4', '5']
    },
    'ar': {
      pinky: ['ش', 'ض', 'ئ', '1'],
      ring: ['س', 'ص', 'ء', '2'],
      middle: ['ي', 'ث', 'ؤ', '3'],
      index: ['ب', 'ل', 'ق', 'ف', 'ر', 'ى', '4', '5']
    }
  };

  rightHandKeys: { [key: string]: { [finger: string]: string[] } } = {
    'pt-BR': {
      index: ['J', 'H', 'Y', 'U', 'N', 'M', '6', '7'],
      middle: ['K', 'I', ',', '8'],
      ring: ['L', 'O', '.', '9'],
      pinky: ['Ç', 'P', ';', '/', '0', '-', '=', '[', ']']
    },
    'en': {
      index: ['J', 'H', 'Y', 'U', 'N', 'M', '6', '7'],
      middle: ['K', 'I', ',', '8'],
      ring: ['L', 'O', '.', '9'],
      pinky: [';', 'P', '/', '\'', '0', '-', '=', '[', ']']
    },
    'es': {
      index: ['J', 'H', 'Y', 'U', 'N', 'M', '6', '7'],
      middle: ['K', 'I', ',', '8'],
      ring: ['L', 'O', '.', '9'],
      pinky: ['Ñ', 'P', ';', '/', '0', '-', '=', '[', ']']
    },
    'de': {
      index: ['J', 'H', 'Z', 'U', 'N', 'M', '6', '7'],
      middle: ['K', 'I', ',', '8'],
      ring: ['L', 'O', '.', '9'],
      pinky: ['Ö', 'Ä', 'P', 'Ü', '-', '0', 'ß', '´', '+']
    },
    'fr': {
      index: ['J', 'H', 'Y', 'U', 'N', ',', '6', '7'],
      middle: ['K', 'I', ';', '8'],
      ring: ['L', 'O', ':', '9'],
      pinky: ['M', 'P', '!', '/', '0', '-', '=', '^', '$']
    },
    'it': {
      index: ['J', 'H', 'Y', 'U', 'N', 'M', '6', '7'],
      middle: ['K', 'I', ',', '8'],
      ring: ['L', 'O', '.', '9'],
      pinky: ['ò', 'à', 'P', 'è', '-', '0', '\'', 'ì', '+']
    },
    'ja': {
      index: ['J', 'H', 'Y', 'U', 'N', 'M', '6', '7'],
      middle: ['K', 'I', ',', '8'],
      ring: ['L', 'O', '.', '9'],
      pinky: [';', 'P', '/', '\\', '0', '-', '=', '[', ']']
    },
    'zh': {
      index: ['J', 'H', 'Y', 'U', 'N', 'M', '6', '7'],
      middle: ['K', 'I', ',', '8'],
      ring: ['L', 'O', '.', '9'],
      pinky: [';', 'P', '/', '\\', '0', '-', '=', '[', ']']
    },
    'ru': {
      index: ['О', 'Р', 'Н', 'Г', 'Т', 'Ь', '6', '7'],
      middle: ['Л', 'Ш', 'Б', '8'],
      ring: ['Д', 'Щ', 'Ю', '9'],
      pinky: ['Ж', 'З', 'Х', 'Ъ', '.', '/', '0', '-', '=']
    },
    'ar': {
      index: ['ت', 'ا', 'غ', 'ع', 'ة', 'و', '6', '7'],
      middle: ['ن', 'ه', 'ز', '8'],
      ring: ['م', 'خ', 'ظ', '9'],
      pinky: ['ك', 'ح', 'ج', 'د', 'ط', '/', '0', '-', '=']
    }
  };

  constructor(
    private router: Router,
    private translate: TranslateService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Detectar idioma atual e reagir a mudanças
    this.storageService.settings$.subscribe(settings => {
      if (settings && settings.language) {
        this.currentLanguage = settings.language;
        this.translate.use(settings.language);
        this.updateStepHighlights();
      }
    });
    
    // Fallback: usar idioma do translate service
    if (!this.currentLanguage || this.currentLanguage === 'pt-BR') {
      this.currentLanguage = this.translate.currentLang || 'pt-BR';
      this.updateStepHighlights();
    }
  }

  updateStepHighlights(): void {
    const layout = this.getCurrentLayout();
    // Atualizar highlights dos passos 2 e 3 com as teclas da home row
    this.steps[1].highlightKeys = layout.homeRow;
    this.steps[2].highlightKeys = layout.homeRow;
  }

  getCurrentLayout(): KeyboardLayout {
    return this.keyboardLayouts[this.currentLanguage] || this.keyboardLayouts['pt-BR'];
  }

  isKeyHighlighted(key: string): boolean {
    return this.steps[this.currentStep].highlightKeys.includes(key.toUpperCase());
  }

  isHomeRowKey(key: string): boolean {
    const homeRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'];
    return homeRow.includes(key.toUpperCase());
  }

  getKeyFingerColor(key: string): string {
    const keyUpper = key.toUpperCase();
    const leftHand = this.leftHandKeys[this.currentLanguage] || this.leftHandKeys['pt-BR'];
    const rightHand = this.rightHandKeys[this.currentLanguage] || this.rightHandKeys['pt-BR'];
    
    // Mão esquerda
    if (leftHand['pinky'].includes(keyUpper) || leftHand['pinky'].includes(key)) return '#FF6B6B';
    if (leftHand['ring'].includes(keyUpper) || leftHand['ring'].includes(key)) return '#4ECDC4';
    if (leftHand['middle'].includes(keyUpper) || leftHand['middle'].includes(key)) return '#95E1D3';
    if (leftHand['index'].includes(keyUpper) || leftHand['index'].includes(key)) return '#F3A683';
    
    // Mão direita
    if (rightHand['index'].includes(keyUpper) || rightHand['index'].includes(key)) return '#F3A683';
    if (rightHand['middle'].includes(keyUpper) || rightHand['middle'].includes(key)) return '#95E1D3';
    if (rightHand['ring'].includes(keyUpper) || rightHand['ring'].includes(key)) return '#4ECDC4';
    if (rightHand['pinky'].includes(keyUpper) || rightHand['pinky'].includes(key)) return '#FF6B6B';
    
    return '#E0E0E0';
  }

  getHomeRowText(): string {
    const layout = this.getCurrentLayout();
    const leftHalf = layout.homeRow.slice(0, 5).join(' ');
    const rightHalf = layout.homeRow.slice(5).join(' ');
    return `${leftHalf} - ${rightHalf}`;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.startLesson();
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  startLesson(): void {
    this.router.navigate(['/lesson', 1]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
