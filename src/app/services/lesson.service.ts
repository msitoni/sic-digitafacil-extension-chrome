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
    // NÍVEL INICIANTE - Sequências de Teclas
    {
      id: 1,
      title: 'Lição 1',
      description: 'Pratique a sequência asdfg',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'g'],
      text: 'asdfg',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 2,
      title: 'Lição 2',
      description: 'Pratique a sequência gfdsa',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'g'],
      text: 'gfdsa',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 3,
      title: 'Lição 3',
      description: 'Pratique a sequência asdgf',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'g'],
      text: 'asdgf',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 4,
      title: 'Lição 4',
      description: 'Pratique a sequência afsdg',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'g'],
      text: 'afsdg',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 5,
      title: 'Lição 5',
      description: 'Pratique a sequência safdg',
      level: 'beginner',
      targetKeys: ['a', 's', 'd', 'f', 'g'],
      text: 'safdg',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 6,
      title: 'Lição 6',
      description: 'Pratique a sequência çlkjh',
      level: 'beginner',
      targetKeys: ['ç', 'l', 'k', 'j', 'h'],
      text: 'çlkjh',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 7,
      title: 'Lição 7',
      description: 'Pratique a sequência hjklç',
      level: 'beginner',
      targetKeys: ['ç', 'l', 'k', 'j', 'h'],
      text: 'hjklç',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 8,
      title: 'Lição 8',
      description: 'Pratique a sequência çljkh',
      level: 'beginner',
      targetKeys: ['ç', 'l', 'k', 'j', 'h'],
      text: 'çljkh',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 9,
      title: 'Lição 9',
      description: 'Pratique a sequência lçkjh',
      level: 'beginner',
      targetKeys: ['ç', 'l', 'k', 'j', 'h'],
      text: 'lçkjh',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 10,
      title: 'Lição 10',
      description: 'Pratique a sequência kçljh',
      level: 'beginner',
      targetKeys: ['ç', 'l', 'k', 'j', 'h'],
      text: 'kçljh',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 11,
      title: 'Lição 11',
      description: 'Pratique a sequência zxcvb',
      level: 'beginner',
      targetKeys: ['z', 'x', 'c', 'v', 'b'],
      text: 'zxcvb',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 12,
      title: 'Lição 12',
      description: 'Pratique a sequência bvcxz',
      level: 'beginner',
      targetKeys: ['z', 'x', 'c', 'v', 'b'],
      text: 'bvcxz',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 13,
      title: 'Lição 13',
      description: 'Pratique a sequência zxvcb',
      level: 'beginner',
      targetKeys: ['z', 'x', 'c', 'v', 'b'],
      text: 'zxvcb',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 14,
      title: 'Lição 14',
      description: 'Pratique a sequência xzcvb',
      level: 'beginner',
      targetKeys: ['z', 'x', 'c', 'v', 'b'],
      text: 'xzcvb',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 15,
      title: 'Lição 15',
      description: 'Pratique a sequência czxvb',
      level: 'beginner',
      targetKeys: ['z', 'x', 'c', 'v', 'b'],
      text: 'czxvb',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 16,
      title: 'Lição 16',
      description: 'Pratique a sequência ;.,mn',
      level: 'beginner',
      targetKeys: [';', '.', ',', 'm', 'n'],
      text: ';.,mn',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 17,
      title: 'Lição 17',
      description: 'Pratique a sequência nm,.;',
      level: 'beginner',
      targetKeys: [';', '.', ',', 'm', 'n'],
      text: 'nm,.;',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 18,
      title: 'Lição 18',
      description: 'Pratique a sequência ;,.nm',
      level: 'beginner',
      targetKeys: [';', '.', ',', 'm', 'n'],
      text: ';,.nm',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 19,
      title: 'Lição 19',
      description: 'Pratique a sequência .,;mn',
      level: 'beginner',
      targetKeys: [';', '.', ',', 'm', 'n'],
      text: '.,;mn',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 20,
      title: 'Lição 20',
      description: 'Pratique a sequência m;,.n',
      level: 'beginner',
      targetKeys: [';', '.', ',', 'm', 'n'],
      text: 'm;,.n',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 21,
      title: 'Lição 21',
      description: 'Pratique a sequência qwert',
      level: 'beginner',
      targetKeys: ['q', 'w', 'e', 'r', 't'],
      text: 'qwert',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 22,
      title: 'Lição 22',
      description: 'Pratique a sequência trewq',
      level: 'beginner',
      targetKeys: ['q', 'w', 'e', 'r', 't'],
      text: 'trewq',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 23,
      title: 'Lição 23',
      description: 'Pratique a sequência qwrte',
      level: 'beginner',
      targetKeys: ['q', 'w', 'e', 'r', 't'],
      text: 'qwrte',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 24,
      title: 'Lição 24',
      description: 'Pratique a sequência wqert',
      level: 'beginner',
      targetKeys: ['q', 'w', 'e', 'r', 't'],
      text: 'wqert',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 25,
      title: 'Lição 25',
      description: 'Pratique a sequência eqwrt',
      level: 'beginner',
      targetKeys: ['q', 'w', 'e', 'r', 't'],
      text: 'eqwrt',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 26,
      title: 'Lição 26',
      description: 'Pratique a sequência poiuy',
      level: 'beginner',
      targetKeys: ['p', 'o', 'i', 'u', 'y'],
      text: 'poiuy',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 27,
      title: 'Lição 27',
      description: 'Pratique a sequência yuiop',
      level: 'beginner',
      targetKeys: ['p', 'o', 'i', 'u', 'y'],
      text: 'yuiop',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 28,
      title: 'Lição 28',
      description: 'Pratique a sequência pouiy',
      level: 'beginner',
      targetKeys: ['p', 'o', 'i', 'u', 'y'],
      text: 'pouiy',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 29,
      title: 'Lição 29',
      description: 'Pratique a sequência opuiy',
      level: 'beginner',
      targetKeys: ['p', 'o', 'i', 'u', 'y'],
      text: 'opuiy',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },
    {
      id: 30,
      title: 'Lição 30',
      description: 'Pratique a sequência ipouy',
      level: 'beginner',
      targetKeys: ['p', 'o', 'i', 'u', 'y'],
      text: 'ipouy',
      minPPM: 15,
      minAccuracy: 85,
      repetitionCount: 50
    },

    // NÍVEL INTERMEDIÁRIO - Linha Inferior e Combinações
    {
      id: 34,
      title: 'Lição 34: Linha Inferior',
      description: 'Aprenda: Z, X, C, V, B, N, M',
      level: 'intermediate',
      targetKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      text: 'zzz xxx ccc vvv bbb nnn mmm zxcv bnm zxcvbnm vbnmzxc zxbn vcnm',
      minPPM: 20,
      minAccuracy: 85
    },
    {
      id: 35,
      title: 'Lição 35: Alfabeto Completo',
      description: 'Pratique com todas as letras',
      level: 'intermediate',
      targetKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      text: 'casa mesa amor vida tempo mundo forma parte fazer grande dizer estar',
      minPPM: 30,
      minAccuracy: 90
    },
    {
      id: 36,
      title: 'Lição 36: Palavras Comuns',
      description: 'Digite palavras frequentes do português',
      level: 'intermediate',
      targetKeys: [],
      text: 'o que ser de para este ele com por mas mesmo assim depois ainda sobre muito bem quando onde como porque desde entre todos',
      minPPM: 35,
      minAccuracy: 90
    },

    // NÍVEL INTERMEDIÁRIO - Números e Pontuação
    {
      id: 37,
      title: 'Lição 37: Números',
      description: 'Aprenda a linha de números: 1-0',
      level: 'intermediate',
      targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      text: '111 222 333 444 555 666 777 888 999 000 123 456 789 012 345 678 901',
      minPPM: 25,
      minAccuracy: 88
    },
    {
      id: 38,
      title: 'Lição 38: Pontuação Básica',
      description: 'Pratique vírgula, ponto e espaço',
      level: 'intermediate',
      targetKeys: [',', '.', ' '],
      text: 'Olá, mundo. Hoje é um bom dia. Vamos praticar, sempre. A prática é importante. Continue assim, você consegue.',
      minPPM: 30,
      minAccuracy: 90
    },

    // NÍVEL AVANÇADO - Frases Complexas
    {
      id: 39,
      title: 'Lição 39: Frases Simples',
      description: 'Digite frases completas com pontuação',
      level: 'advanced',
      targetKeys: [],
      text: 'A prática constante é o segredo do sucesso. Quanto mais você treina, melhor você fica. A digitação rápida ajuda muito no trabalho.',
      minPPM: 40,
      minAccuracy: 92
    },
    {
      id: 40,
      title: 'Lição 40: Texto Narrativo',
      description: 'Pratique com texto corrido',
      level: 'advanced',
      targetKeys: [],
      text: 'Era uma vez um jovem que queria aprender a digitar muito rápido. Ele praticava todos os dias, sem desistir nunca. Com o tempo, seus dedos começaram a voar sobre o teclado.',
      minPPM: 45,
      minAccuracy: 93
    },
    {
      id: 41,
      title: 'Lição 41: Caracteres Especiais',
      description: 'Aprenda símbolos especiais: @#$%&*',
      level: 'advanced',
      targetKeys: ['@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '='],
      text: 'email@exemplo.com #hashtag $100.00 50% de desconto & você também! (*importante) teste_arquivo nome-completo 2+2=4',
      minPPM: 35,
      minAccuracy: 90
    },

    // NÍVEL EXPERT - Textos Profissionais
    {
      id: 42,
      title: 'Lição 42: Código de Programação',
      description: 'Digite código com sintaxe real',
      level: 'expert',
      targetKeys: [],
      text: 'function calcular(a, b) { return a + b; } const resultado = calcular(10, 20); console.log(resultado);',
      minPPM: 40,
      minAccuracy: 92
    },
    {
      id: 43,
      title: 'Lição 43: Texto Técnico',
      description: 'Pratique terminologia técnica',
      level: 'expert',
      targetKeys: [],
      text: 'A arquitetura de microserviços permite escalabilidade horizontal. O protocolo HTTP utiliza requisições REST. A performance do algoritmo é O(n log n).',
      minPPM: 45,
      minAccuracy: 93
    },
    {
      id: 44,
      title: 'Lição 44: Velocidade Máxima',
      description: 'Desafio final de velocidade',
      level: 'expert',
      targetKeys: [],
      text: 'O rápido desenvolvimento da tecnologia moderna transforma constantemente nossa sociedade. Profissionais qualificados precisam adaptar-se rapidamente às mudanças para permanecer relevantes no mercado competitivo.',
      minPPM: 50,
      minAccuracy: 95
    },
    {
      id: 45,
      title: 'Lição 45: Precisão Máxima',
      description: 'Foque na precisão sem erros',
      level: 'expert',
      targetKeys: [],
      text: 'A excelência na digitação não vem apenas da velocidade, mas principalmente da consistência e precisão. Cada tecla pressionada corretamente é um passo em direção à maestria.',
      minPPM: 50,
      minAccuracy: 98
    },
    {
      id: 46,
      title: 'Lição 46: Desafio Master',
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
