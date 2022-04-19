import {useState, useEffect, useCallback} from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [admin, setAdmin] = useState(false);


  const login = useCallback((jwtToken, id, admin) => {
    setToken(jwtToken);
    setUserId(id);
    setAdmin(admin)

    localStorage.setItem('userData', JSON.stringify({
      userId: id,
      isAdmin: admin,
      token: jwtToken
    }));
  }, [])
  

  const logout = () => {
    setToken(null);
    setUserId(null);
    setAdmin(false);
    localStorage.removeItem('userData');
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));

    if (data && data.token) {
      login(data.token, data.userId, data.isAdmin)
    }

    setIsReady(true)
  }, [login])

  return {login, logout, token, userId, isReady, admin}
}