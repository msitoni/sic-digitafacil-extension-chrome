import { Injectable } from '@angular/core';

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
  private lessons: Lesson[] = [
    // NÍVEL INICIANTE - Linha Central (ASDF JKL;)
    {
      id: 1,
      title: 'Lição 1: Linha Central - Mão Esquerda',
      description: 'Aprenda as teclas da posição inicial: A, S, D, F, G',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'g'],
      text: 'asdfg',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 2,
      title: 'Lição 2: Linha Central - Mão Direita',
      description: 'Aprenda as teclas: J, K, L, Ç',
      level: 'beginner',
      targetKeys: ['j', 'k', 'l', 'ç'],
      text: 'jjj kkk lll ççç jklç jklç çlkj çlkj jklçlkj çlkjklç jçlk kçjl lkçj klçj',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 3,
      title: 'Lição 3: Linha Central Completa',
      description: 'Combine todas as teclas da linha central',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ç'],
      text: 'asdf jklç asdf jklç asjd fklç sldk afjç dslk jfaç alsk djfç askl dfjç',
      minPPM: 20,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 4,
      title: 'Lição 4: Palavras Simples',
      description: 'Pratique palavras usando apenas a linha central',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l'],
      text: 'as salala fala falsa sla laja fadas alas salas jalaslasslass',
      minPPM: 25,
      minAccuracy: 88,
      repetitionCount: 50
    },

    // NÍVEL INICIANTE - Linha Superior (QWERT YUIOP)
    {
      id: 5,
      title: 'Lição 5: Linha Superior - Parte 1',
      description: 'Aprenda: Q, W, E, R, T',
      level: 'beginner',
      targetKeys: ['q', 'w', 'e', 'r', 't'],
      text: 'qqq www eee rrr ttt qwert qwert trewq trewq qwer wert ertq rtqw',
      minPPM: 20,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 6,
      title: 'Lição 6: Linha Superior - Parte 2',
      description: 'Aprenda: Y, U, I, O, P',
      level: 'beginner',
      targetKeys: ['y', 'u', 'i', 'o', 'p'],
      text: 'yyy uuu iii ooo ppp yuiop yuiop poiuy poiuy yuio uiop iopy opyu',
      minPPM: 20,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 7,
      title: 'Lição 7: Linha Superior Completa',
      description: 'Combine todas as teclas superiores',
      level: 'beginner',
      targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      text: 'qwerty uiop qwerty uiop quest write type your quite write poetry',
      minPPM: 25,
      minAccuracy: 88,
      repetitionCount: 50
    },

    // NÍVEL INTERMEDIÁRIO - Linha Inferior e Combinações
    {
      id: 8,
      title: 'Lição 8: Linha Inferior',
      description: 'Aprenda: Z, X, C, V, B, N, M',
      level: 'intermediate',
      targetKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      text: 'zzz xxx ccc vvv bbb nnn mmm zxcv bnm zxcvbnm vbnmzxc zxbn vcnm',
      minPPM: 20,
      minAccuracy: 85
    },
    {
      id: 9,
      title: 'Lição 9: Alfabeto Completo',
      description: 'Pratique com todas as letras',
      level: 'intermediate',
      targetKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      text: 'casa mesa amor vida tempo mundo forma parte fazer grande dizer estar',
      minPPM: 30,
      minAccuracy: 90
    },
    {
      id: 10,
      title: 'Lição 10: Palavras Comuns',
      description: 'Digite palavras frequentes do português',
      level: 'intermediate',
      targetKeys: [],
      text: 'o que ser de para este ele com por mas mesmo assim depois ainda sobre muito bem quando onde como porque desde entre todos',
      minPPM: 35,
      minAccuracy: 90
    },

    // NÍVEL INTERMEDIÁRIO - Números e Pontuação
    {
      id: 11,
      title: 'Lição 11: Números',
      description: 'Aprenda a linha de números: 1-0',
      level: 'intermediate',
      targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      text: '111 222 333 444 555 666 777 888 999 000 123 456 789 012 345 678 901',
      minPPM: 25,
      minAccuracy: 88
    },
    {
      id: 12,
      title: 'Lição 12: Pontuação Básica',
      description: 'Pratique vírgula, ponto e espaço',
      level: 'intermediate',
      targetKeys: [',', '.', ' '],
      text: 'Olá, mundo. Hoje é um bom dia. Vamos praticar, sempre. A prática é importante. Continue assim, você consegue.',
      minPPM: 30,
      minAccuracy: 90
    },

    // NÍVEL AVANÇADO - Frases Complexas
    {
      id: 13,
      title: 'Lição 13: Frases Simples',
      description: 'Digite frases completas com pontuação',
      level: 'advanced',
      targetKeys: [],
      text: 'A prática constante é o segredo do sucesso. Quanto mais você treina, melhor você fica. A digitação rápida ajuda muito no trabalho.',
      minPPM: 40,
      minAccuracy: 92
    },
    {
      id: 14,
      title: 'Lição 14: Texto Narrativo',
      description: 'Pratique com texto corrido',
      level: 'advanced',
      targetKeys: [],
      text: 'Era uma vez um jovem que queria aprender a digitar muito rápido. Ele praticava todos os dias, sem desistir nunca. Com o tempo, seus dedos começaram a voar sobre o teclado.',
      minPPM: 45,
      minAccuracy: 93
    },
    {
      id: 15,
      title: 'Lição 15: Caracteres Especiais',
      description: 'Aprenda símbolos especiais: @#$%&*',
      level: 'advanced',
      targetKeys: ['@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '='],
      text: 'email@exemplo.com #hashtag $100.00 50% de desconto & você também! (*importante) teste_arquivo nome-completo 2+2=4',
      minPPM: 35,
      minAccuracy: 90
    },

    // NÍVEL EXPERT - Textos Profissionais
    {
      id: 16,
      title: 'Lição 16: Código de Programação',
      description: 'Digite código com sintaxe real',
      level: 'expert',
      targetKeys: [],
      text: 'function calcular(a, b) { return a + b; } const resultado = calcular(10, 20); console.log(resultado);',
      minPPM: 40,
      minAccuracy: 92
    },
    {
      id: 17,
      title: 'Lição 17: Texto Técnico',
      description: 'Pratique terminologia técnica',
      level: 'expert',
      targetKeys: [],
      text: 'A arquitetura de microserviços permite escalabilidade horizontal. O protocolo HTTP utiliza requisições REST. A performance do algoritmo é O(n log n).',
      minPPM: 45,
      minAccuracy: 93
    },
    {
      id: 18,
      title: 'Lição 18: Velocidade Máxima',
      description: 'Desafio final de velocidade',
      level: 'expert',
      targetKeys: [],
      text: 'O rápido desenvolvimento da tecnologia moderna transforma constantemente nossa sociedade. Profissionais qualificados precisam adaptar-se rapidamente às mudanças para permanecer relevantes no mercado competitivo.',
      minPPM: 50,
      minAccuracy: 95
    },
    {
      id: 19,
      title: 'Lição 19: Precisão Máxima',
      description: 'Foque na precisão sem erros',
      level: 'expert',
      targetKeys: [],
      text: 'A excelência na digitação não vem apenas da velocidade, mas principalmente da consistência e precisão. Cada tecla pressionada corretamente é um passo em direção à maestria.',
      minPPM: 50,
      minAccuracy: 98
    },
    {
      id: 20,
      title: 'Lição 20: Desafio Master',
      description: 'Teste final completo',
      level: 'expert',
      targetKeys: [],
      text: 'Parabéns por chegar até aqui! Você dominou a arte da digitação. Agora é hora de aplicar suas habilidades no mundo real. Continue praticando e você será imbatível. Sucesso!',
      minPPM: 55,
      minAccuracy: 98
    }
  ];

  constructor() {}

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
