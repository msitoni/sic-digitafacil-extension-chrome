import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageAdapter } from '../utils/storage-adapter';

export interface UserProfile {
  id: string;
  name: string;
  createdAt: string;
  lastAccess: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly STORAGE_KEY = 'digitafacil_users';
  private readonly CURRENT_USER_KEY = 'digitafacil_current_user';

  constructor() {
    this.loadCurrentUser();
  }

  /**
   * Carrega o usuário atual do storage
   */
  private async loadCurrentUser(): Promise<void> {
    try {
      const result = await StorageAdapter.get(this.CURRENT_USER_KEY);
      const userId = result[this.CURRENT_USER_KEY];
      
      if (userId) {
        const users = await this.getAllUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
          this.currentUserSubject.next(user);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário atual:', error);
    }
  }

  /**
   * Retorna o usuário atual
   */
  getCurrentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  /**
   * Retorna todos os usuários cadastrados
   */
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const result = await StorageAdapter.get(this.STORAGE_KEY);
      return result[this.STORAGE_KEY] || [];
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      return [];
    }
  }

  /**
   * Cria um novo perfil de usuário
   */
  async createUser(name: string): Promise<UserProfile> {
    const users = await this.getAllUsers();
    
    // Verifica se já existe usuário com esse nome
    if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('Já existe um usuário com este nome');
    }

    const newUser: UserProfile = {
      id: this.generateUserId(name),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      lastAccess: new Date().toISOString()
    };

    users.push(newUser);
    await StorageAdapter.set({ [this.STORAGE_KEY]: users });

    return newUser;
  }

  /**
   * Seleciona um usuário como ativo
   */
  async selectUser(userId: string): Promise<void> {
    const users = await this.getAllUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Atualiza último acesso
    user.lastAccess = new Date().toISOString();
    await StorageAdapter.set({ [this.STORAGE_KEY]: users });

    // Define como usuário atual
    await StorageAdapter.set({ [this.CURRENT_USER_KEY]: userId });
    this.currentUserSubject.next(user);
  }

  /**
   * Remove um usuário (e todos os seus dados)
   */
  async deleteUser(userId: string): Promise<void> {
    const users = await this.getAllUsers();
    const filteredUsers = users.filter(u => u.id !== userId);

    // Remove usuário da lista
    await StorageAdapter.set({ [this.STORAGE_KEY]: filteredUsers });

    // Remove todos os dados do usuário
    await this.clearUserData(userId);

    // Se era o usuário atual, desloga
    if (this.currentUserSubject.value?.id === userId) {
      await StorageAdapter.remove(this.CURRENT_USER_KEY);
      this.currentUserSubject.next(null);
    }
  }

  /**
   * Faz logout do usuário atual
   */
  async logout(): Promise<void> {
    await StorageAdapter.remove(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  /**
   * Limpa todos os dados de um usuário específico
   */
  private async clearUserData(userId: string): Promise<void> {
    const allData = await StorageAdapter.get(null);
    const keysToRemove: string[] = [];

    // Encontra todas as chaves que pertencem a este usuário
    Object.keys(allData).forEach(key => {
      if (key.startsWith(`${userId}_`)) {
        keysToRemove.push(key);
      }
    });

    if (keysToRemove.length > 0) {
      await StorageAdapter.remove(keysToRemove);
    }
  }

  /**
   * Gera um ID único para o usuário baseado no nome e timestamp
   */
  private generateUserId(name: string): string {
    const timestamp = Date.now();
    const cleanName = name.toLowerCase().replace(/\s+/g, '_');
    return `${cleanName}_${timestamp}`;
  }

  /**
   * Verifica se há um usuário logado
   */
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Retorna o prefixo para storage baseado no usuário atual
   */
  getUserStoragePrefix(): string {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('Nenhum usuário logado');
    }
    return `${user.id}_`;
  }
}
