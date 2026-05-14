import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Importa o cliente Supabase

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Tenta pegar a sessão existente ao carregar o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session) {
        // Guarda o token para as funções da api.js usarem
        localStorage.setItem('authToken', session.access_token);
      }
      setLoading(false);
    });

    // 2. Ouve por mudanças no estado de autenticação (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session) {
          localStorage.setItem('authToken', session.access_token);
        } else {
          // Limpa o token ao fazer logout
          localStorage.removeItem('authToken');
        }
        setLoading(false);
      }
    );

    // 3. Limpa o listener quando o componente desmontar
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // A função de login agora usa o Supabase Auth
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  // A função de logout agora usa o Supabase Auth
  function logout() {
    supabase.auth.signOut();
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
