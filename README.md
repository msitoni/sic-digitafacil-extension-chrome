# ⌨️ Digitação Pro - Extensão Chrome de Datilografia

Uma extensão moderna do Chrome para aprender e aprimorar suas habilidades de digitação (datilografia), construída com **Angular** e **Manifest V3**.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Angular](https://img.shields.io/badge/angular-17-red)
![Manifest](https://img.shields.io/badge/manifest-v3-green)

## 🚀 Funcionalidades

### 📚 Sistema de Lições
- **20 lições progressivas** do iniciante ao expert
- Lições focadas em linha central, superior, inferior
- Prática de números, pontuação e caracteres especiais
- Sistema de desbloqueio progressivo

### 📊 Métricas em Tempo Real
- **WPM** (Words Per Minute) - Palavras por minuto
- **CPM** (Characters Per Minute) - Caracteres por minuto
- **Precisão** - Percentual de acertos
- **Consistência** - Estabilidade do ritmo de digitação
- **Tempo decorrido** e contador de erros

### 🎯 Sistema de Progresso
- **Níveis e XP** - Ganhe experiência ao praticar
- **Streak de dias** - Mantenha sua sequência de prática
- **Lições completadas** - Acompanhe seu avanço
- **Armazenamento local** com Chrome Storage

### 📈 Estatísticas Detalhadas
- Melhor WPM e precisão
- Médias históricas
- Análise de erros por tecla
- Histórico de sessões
- Identificação de teclas problemáticas

### ⚙️ Personalizável
- Layouts de teclado (ABNT2, US, UK)
- Níveis de dificuldade
- Temas (claro, escuro, automático)
- Sons de feedback
- Lembretes de prática

## 🛠️ Tecnologias Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **Chrome Storage API** - Armazenamento local e sincronização
- **Chrome Manifest V3** - Estrutura da extensão
- **SCSS** - Estilização

## 📦 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)
- Google Chrome

### Passos de Instalação

1. **Clone ou navegue até o projeto:**
```bash
cd "c:\Users\msito\OneDrive\Área de Trabalho\Projetos\Extensões chrome\Digitação"
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Crie os ícones:**
   - Acesse a pasta `src/assets/icons/`
   - Leia o README.md para instruções
   - Crie os ícones: icon-16.png, icon-48.png, icon-128.png

4. **Build da extensão:**
```bash
npm run build
```

Isso gerará os arquivos na pasta `dist/`.

### 🔧 Desenvolvimento Local

Para desenvolver com live reload:

```bash
npm start
```

Abra http://localhost:4200 no navegador.

## 📱 Carregar a Extensão no Chrome

1. Abra o Chrome e digite `chrome://extensions/`
2. Ative o **Modo de desenvolvedor** (canto superior direito)
3. Clique em **Carregar sem compactação**
4. Selecione a pasta `dist/`
5. A extensão será instalada e substituirá sua aba nova!

## 🎮 Como Usar

### Primeira Vez
1. Abra uma nova aba no Chrome
2. Você verá a tela inicial da extensão
3. Escolha a **Lição 1** para começar
4. Comece a digitar quando estiver pronto!

### Durante uma Lição
- **Comece a digitar** para iniciar automaticamente
- Acompanhe suas métricas em tempo real no topo
- O caractere atual é destacado em amarelo
- Sons tocam ao acertar ou errar (se habilitado)
- Complete o texto para ver seus resultados

### Após Completar
- Veja suas estatísticas da sessão
- Passe nos requisitos para desbloquear a próxima lição
- Tente novamente para melhorar seu desempenho

## 📁 Estrutura do Projeto

```
Digitação/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/              # Página inicial com lista de lições
│   │   │   ├── lesson/            # Componente de treino/prática
│   │   │   ├── stats/             # Página de estatísticas
│   │   │   └── settings/          # Página de configurações
│   │   ├── services/
│   │   │   ├── typing.service.ts  # Lógica de captura e métricas
│   │   │   ├── lesson.service.ts  # Gerenciamento de lições
│   │   │   └── storage.service.ts # Chrome Storage (local/sync)
│   │   ├── app.module.ts          # Módulo principal
│   │   └── app.component.ts       # Componente raiz
│   ├── assets/
│   │   └── icons/                 # Ícones da extensão
│   ├── background.js              # Service Worker (Manifest V3)
│   ├── manifest.json              # Configuração da extensão
│   ├── index.html                 # HTML principal
│   ├── main.ts                    # Bootstrap do Angular
│   └── styles.scss                # Estilos globais
├── angular.json                   # Configuração Angular
├── package.json                   # Dependências
└── tsconfig.json                  # Configuração TypeScript
```

## 🎯 Níveis de Lições

### 🌱 Iniciante (Lições 1-7)
- Linha central do teclado
- Linha superior
- Palavras simples

### 💪 Intermediário (Lições 8-12)
- Linha inferior
- Alfabeto completo
- Números e pontuação básica

### 🌟 Avançado (Lições 13-15)
- Frases complexas
- Caracteres especiais
- Texto narrativo

### 🏆 Expert (Lições 16-20)
- Código de programação
- Textos técnicos
- Desafios de velocidade e precisão máxima

## 📊 Sistema de Métricas

### WPM (Words Per Minute)
- Considera palavras de 5 caracteres
- Calcula apenas caracteres corretos
- Atualiza em tempo real

### Precisão
- Percentual de teclas corretas
- (Corretas ÷ Total) × 100

### Consistência
- Mede a estabilidade do ritmo
- Baseada na variação entre intervalos de teclas
- 100% = perfeitamente consistente

### Análise de Erros
- Identifica teclas mais problemáticas
- Gera heatmap de erros
- Sugere áreas de melhoria

## 💾 Armazenamento de Dados

### Local Storage
- Progresso completo
- Histórico de sessões (últimas 50)
- Estatísticas detalhadas
- Configurações

### Sync Storage (Opcional)
- Configurações básicas
- Progresso resumido (lições, nível, XP)
- Sincroniza entre dispositivos com mesma conta Google
- Limite de 100KB

## 🔮 Futuras Melhorias

- [ ] Teclado virtual animado
- [ ] Gráficos de progresso (Chart.js)
- [ ] Modo competitivo/desafios
- [ ] Textos personalizados
- [ ] Tema dark mode completo
- [ ] Exportar estatísticas
- [ ] Leaderboard (requer backend)
- [ ] Contas de usuário (requer backend)

## 🐛 Troubleshooting

### Extensão não aparece
- Certifique-se que fez o build (`npm run build`)
- Verifique se a pasta `dist/` existe
- Recarregue a extensão em chrome://extensions/

### Erros de TypeScript
- Execute `npm install` novamente
- Verifique a versão do Node.js (v18+)

### Dados não salvam
- Verifique as permissões no manifest.json
- Abra o console (F12) para ver erros
- A extensão precisa da permissão "storage"

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 👨‍💻 Autor

Desenvolvido com ❤️ para ajudar pessoas a melhorar suas habilidades de digitação.

## 🙏 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar novas lições

---

**Bons estudos e boa digitação! ⌨️✨**
