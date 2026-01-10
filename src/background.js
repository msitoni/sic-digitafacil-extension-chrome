// Background Service Worker para Manifest V3
console.log('Digitação Pro - Background Service Worker iniciado');

// Abrir página quando clicar no ícone da extensão
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html')
  });
});

// Gerenciar instalação
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extensão instalada pela primeira vez');
    // Inicializar dados padrão
    initializeDefaultData();
  } else if (details.reason === 'update') {
    console.log('Extensão atualizada');
  }
});

// Inicializar dados padrão no storage
async function initializeDefaultData() {
  const defaultData = {
    settings: {
      layout: 'ABNT2',
      difficulty: 'beginner',
      soundEnabled: true,
      theme: 'light'
    },
    progress: {
      currentLesson: 1,
      completedLessons: [],
      totalPracticeTime: 0
    },
    stats: {
      bestPPM: 0,
      averageAccuracy: 0,
      totalKeystrokes: 0
    }
  };

  await chrome.storage.local.set(defaultData);
  console.log('Dados padrão inicializados');
}

// Alarmes para lembretes de prática (opcional)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'practice-reminder') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'assets/icons/icon-128.png',
      title: 'Hora de praticar!',
      message: 'Que tal uma sessão de digitação?',
      priority: 2
    });
  }
});

// Sincronização de dados (se necessário)
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('Storage changed:', changes, namespace);
});
