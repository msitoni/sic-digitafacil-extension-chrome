# 📝 CHECKLIST DE INSTALAÇÃO

Siga esta lista para garantir que tudo está funcionando:

## ✅ Pré-Requisitos

- [ ] Node.js instalado (v18 ou superior)
  - Verifique: `node --version`
  - Se não tiver: https://nodejs.org/

- [ ] npm instalado (v9 ou superior)
  - Verifique: `npm --version`

- [ ] Google Chrome instalado
  - Qualquer versão recente

---

## ✅ Instalação

- [ ] **Passo 1:** Abrir terminal nesta pasta
  - Windows: Shift + Botão direito → "Abrir janela do PowerShell aqui"
  - Mac/Linux: Abrir terminal e navegar até a pasta

- [ ] **Passo 2:** Instalar dependências
  ```bash
  npm install
  ```
  - Aguarde até finalizar (pode demorar 2-5 minutos)
  - ✅ Sucesso: Vê a mensagem "added XXX packages"

- [ ] **Passo 3:** Criar ícones
  - Acesse: https://favicon.io/emoji-favicons/keyboard/
  - Baixe o ZIP e extraia
  - Copie 3 arquivos para `src/assets/icons/`:
    - [ ] `icon-16.png` (16x16px)
    - [ ] `icon-48.png` (48x48px)
    - [ ] `icon-128.png` (128x128px)

- [ ] **Passo 4:** Build do projeto
  ```bash
  npm run build
  ```
  - ✅ Sucesso: Pasta `dist/` foi criada
  - ❌ Erro: Leia a mensagem e corrija

- [ ] **Passo 5:** Carregar no Chrome
  1. [ ] Abrir `chrome://extensions/`
  2. [ ] Ativar "Modo de desenvolvedor"
  3. [ ] Clicar "Carregar sem compactação"
  4. [ ] Selecionar a pasta `dist/`
  5. [ ] ✅ Extensão aparece na lista

---

## ✅ Teste

- [ ] Abrir nova aba no Chrome
  - ✅ Vê a tela da extensão "Digitação Pro"
  - ❌ Não vê: Recarregue a extensão e tente de novo

- [ ] Clicar em "Lição 1"
  - ✅ Abre tela de treino

- [ ] Começar a digitar
  - ✅ Métricas aparecem no topo
  - ✅ Texto destaca caractere atual
  - ✅ Sons tocam (se habilitado)

- [ ] Completar a lição
  - ✅ Mostra resultados
  - ✅ Pode ir para próxima lição

- [ ] Testar Estatísticas
  - [ ] Clicar no botão "📊 Estatísticas"
  - ✅ Mostra dados da sessão

- [ ] Testar Configurações
  - [ ] Clicar no botão "⚙️ Configurações"
  - ✅ Pode mudar settings
  - ✅ Mudanças salvam

---

## ✅ Troubleshooting

### Se npm install falhar:
- [ ] Deletar pasta `node_modules/`
- [ ] Rodar `npm cache clean --force`
- [ ] Rodar `npm install` novamente

### Se build falhar:
- [ ] Verificar se tem espaço em disco
- [ ] Verificar permissões da pasta
- [ ] Ler mensagem de erro completa

### Se extensão não carregar:
- [ ] Verificar se pasta `dist/` existe
- [ ] Verificar se tem arquivo `manifest.json` dentro de `dist/`
- [ ] Tentar remover e adicionar de novo

### Se dados não salvam:
- [ ] Abrir F12 na aba da extensão
- [ ] Ver erros no console
- [ ] Verificar se Chrome tem permissão de armazenamento

---

## 🎯 Resultado Final

Quando tudo estiver funcionando:
- ✅ Nova aba mostra a extensão
- ✅ Pode fazer lições
- ✅ Métricas aparecem em tempo real
- ✅ Progresso salva automaticamente
- ✅ Estatísticas funcionam
- ✅ Configurações funcionam

---

## 📞 Próximos Passos

Agora que está tudo funcionando:
1. Leia o `README.md` para detalhes técnicos
2. Leia o `TUTORIAL.md` para customização
3. Comece a praticar digitação!
4. Adicione suas próprias features

---

**Pronto! Agora é só começar a digitar! ⌨️✨**
