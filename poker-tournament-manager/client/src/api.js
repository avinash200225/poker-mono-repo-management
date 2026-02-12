const TOKEN_KEY = 'tournament_token';

export function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };
  const res = await fetch(path, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('tournament_admin');
    window.location.href = '/login';
    throw new Error('Session expired');
  }
  return res;
}
