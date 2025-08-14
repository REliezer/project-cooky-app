// Simulación de login
export interface LoginResponse {
  email: string
  user: string
  token: string
  premium: boolean
  message?: string
}

export interface LoginError extends Error {
  status?: number
  code?: string
}

export async function fakeLogin(email: string, password: string): Promise<LoginResponse> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800))

  // Simular validaciones básicas
  if (!email || !password) {
    const error = new Error('Email y contraseña son requeridos') as LoginError
    error.status = 400
    error.code = 'MISSING_CREDENTIALS'
    throw error
  }

  if (password.length < 12) {
    const error = new Error('La contraseña debe tener al menos 12 caracteres') as LoginError
    error.status = 400
    error.code = 'WEAK_PASSWORD'
    throw error
  }

  // Simular credenciales incorrectas (para testing)
  if (email === 'test@error.com') {
    const error = new Error('Credenciales incorrectas') as LoginError
    error.status = 401
    error.code = 'INVALID_CREDENTIALS'
    throw error
  }

  // Usuarios "válidos" para testing
  const VALID_USERS = [
    { name: 'Premium User', email: 'admin@test.com', password: '123456-p789012', premium: true },
    { name: 'Free User', email: 'user@test.com', password: 'password*123', premium: false },
    { name: 'Premium User', email: 'premium@test.com', password: 'premium123456', premium: true },
    { name: 'Free User', email: 'free@test.com', password: 'freeuser12345', premium: false }
  ];

  // Verificar credenciales
  const validUser = VALID_USERS.find(u =>
    u.email === email && u.password === password
  );

  const nameUser = VALID_USERS.find(u => 
    u.email === email
  )?.name || 'Usuario';

  if (!validUser) {
    const error = new Error('Credenciales incorrectas') as LoginError;
    error.status = 401;
    throw error;
  }

  // Aquí iría tu fetch real a la API
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // })
  // if (!response.ok) throw new Error('Login failed')
  // return await response.json()

  // El token que devuelvo aquí es solo de ejemplo (expira en 1 minuto)
  const token = [
    btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })),
    btoa(JSON.stringify({
      sub: email,
      exp: Math.floor(Date.now() / 1000) + 600000,
      iat: Math.floor(Date.now() / 1000)
    })),
    "signature"
  ].join('.')

  return {
    email: email,
    user: nameUser,
    token,
    premium: validUser.premium,
    message: 'Login exitoso'
  }
}

