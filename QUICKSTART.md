# 🚀 GUIA RÁPIDO DE INÍCIO

## ⚡ Setup em 5 Minutos

### 1. Instalar Dependências
```bash
npm install
```

### 2. Criar Ícones
Crie 3 arquivos PNG na pasta `src/assets/icons/`:
- icon-16.png (16x16px)
- icon-48.png (48x48px)  
- icon-128.png (128x128px)

**Dica rápida:** Use https://favicon.io/emoji-favicons/keyboard/

### 3. Build
```bash
npm run build
```

### 4. Carregar no Chrome
1. Abra `chrome://extensions/`
2. Ative "Modo de desenvolvedor"
3. Clique "Carregar sem compactação"
4. Selecione a pasta `dist/`

### 5. Testar
Abra uma nova aba e comece a digitar! 🎉

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento (com live reload)
npm start

# Build de produção
npm run build

# Build + watch (recria ao salvar)
npm run watch

# Testes
npm test
```

---

## 📝 Estrutura de Pastas Importante

```
src/
├── app/
│   ├── components/       ← Todos os componentes visuais
│   ├── services/         ← Lógica de negócio
│   └── app.module.ts     ← Configuração principal
├── assets/icons/         ← Ícones da extensão (CRIAR!)
├── manifest.json         ← Configuração do Chrome
└── background.js         ← Service Worker
```

---

## 🎯 Próximos Passos

1. ✅ Instale as dependências
2. ✅ Crie os ícones
3. ✅ Faça o build
4. ✅ Carregue no Chrome
5. 🎨 Personalize as lições em `lesson.service.ts`
6. 🎨 Ajuste cores/tema em arquivos `.scss`
7. 🚀 Adicione novas funcionalidades!

---

## 💡 Dicas

- **Ícones faltando?** A extensão ainda funciona, mas sem ícone bonito
- **Erros no build?** Rode `npm install` novamente
- **Mudanças não aparecem?** Clique no botão ↻ em chrome://extensions/
- **Quer debugar?** F12 na aba da extensão abre o DevTools

---

## 🆘 Ajuda Rápida

### Extensão não carrega
→ Verifique se a pasta `dist/` foi criada pelo build

### Dados não salvam
→ Verifique permissões no manifest.json

### TypeScript errors
→ Certifique-se que Node.js está atualizado (v18+)

---

**Pronto para começar? Execute `npm install` agora! 🚀**
