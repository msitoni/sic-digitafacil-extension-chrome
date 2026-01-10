/**
 * Adaptador de storage que funciona tanto em desenvolvimento (localStorage)
 * quanto em produção (chrome.storage.local)
 */

export class StorageAdapter {
  private static isExtensionContext(): boolean {
    return typeof chrome !== 'undefined' && 
           typeof chrome.storage !== 'undefined' && 
           typeof chrome.storage.local !== 'undefined';
  }

  /**
   * Obtém dados do storage
   */
  static async get(keys: string | string[] | null): Promise<any> {
    if (this.isExtensionContext()) {
      // Usa chrome.storage.local em contexto de extensão
      return await chrome.storage.local.get(keys);
    } else {
      // Usa localStorage em desenvolvimento
      const result: any = {};
      
      if (keys === null) {
        // Retorna todos os dados
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            try {
              result[key] = JSON.parse(localStorage.getItem(key) || '{}');
            } catch {
              result[key] = localStorage.getItem(key);
            }
          }
        }
      } else if (typeof keys === 'string') {
        // Retorna um único valor
        const value = localStorage.getItem(keys);
        if (value !== null) {
          try {
            result[keys] = JSON.parse(value);
          } catch {
            result[keys] = value;
          }
        }
      } else if (Array.isArray(keys)) {
        // Retorna múltiplos valores
        keys.forEach(key => {
          const value = localStorage.getItem(key);
          if (value !== null) {
            try {
              result[key] = JSON.parse(value);
            } catch {
              result[key] = value;
            }
          }
        });
      }
      
      return result;
    }
  }

  /**
   * Salva dados no storage
   */
  static async set(items: { [key: string]: any }): Promise<void> {
    if (this.isExtensionContext()) {
      // Usa chrome.storage.local em contexto de extensão
      await chrome.storage.local.set(items);
    } else {
      // Usa localStorage em desenvolvimento
      Object.keys(items).forEach(key => {
        const value = typeof items[key] === 'string' 
          ? items[key] 
          : JSON.stringify(items[key]);
        localStorage.setItem(key, value);
      });
    }
  }

  /**
   * Remove dados do storage
   */
  static async remove(keys: string | string[]): Promise<void> {
    if (this.isExtensionContext()) {
      // Usa chrome.storage.local em contexto de extensão
      await chrome.storage.local.remove(keys);
    } else {
      // Usa localStorage em desenvolvimento
      const keysArray = Array.isArray(keys) ? keys : [keys];
      keysArray.forEach(key => localStorage.removeItem(key));
    }
  }

  /**
   * Limpa todo o storage
   */
  static async clear(): Promise<void> {
    if (this.isExtensionContext()) {
      // Usa chrome.storage.local em contexto de extensão
      await chrome.storage.local.clear();
    } else {
      // Usa localStorage em desenvolvimento
      localStorage.clear();
    }
  }
}
