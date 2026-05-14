import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao carregar o app, verifica se existe token salvo
    const token = localStorage.getItem('authToken');
    if (token) {
      // Token existe, então o usuário estava logado
      setUser({ token }); // Salva o token no estado
    }
    setLoading(false);
  }, []);

  // A função de login agora chama o backend Node
  async function login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erro ao fazer login');
    // Salva o token retornado pelo backend
    localStorage.setItem('authToken', data.token);
    return data;
  }

  // A função de logout limpa o token do localStorage
  function logout() {
    localStorage.removeItem('authToken');
    setUser(null);
  }

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
