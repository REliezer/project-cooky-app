// Store de autenticación con Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id?: string
  email?: string
  name?: string
  [key: string]: any
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (user: User, token: string) => void
  loginAsync: (email: string, password: string) => Promise<void>
  logout: () => void
  verifyToken: () => void
  clearError: () => void
}

function decodeJWT(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch {
    return null
  }
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true, error: null })
        get().verifyToken()
      },

      loginAsync: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const { fakeLogin } = await import('../services/auth/login')
          const response = await fakeLogin(email, password)
          set({ 
            user: { email, name: response.user }, 
            token: response.token, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
          get().verifyToken()
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Error en el login'
          })
          throw error
        }
      },

      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        error: null 
      }),

      clearError: () => set({ error: null }),

      verifyToken: () => {
        const { token, logout } = get()
        if (!token) return logout()

        const payload = decodeJWT(token)
        if (!payload?.exp) return logout()

        const isExpired = Date.now() >= payload.exp * 1000
        if (isExpired) logout()
        else set({ isAuthenticated: true })
      }
    }),
    {
      name: 'auth-storage', // clave en localStorage
    }
  )
)
