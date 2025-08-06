import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const url = `/api/auth/${isRegister ? 'register' : 'login'}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location = '/dashboard';
    } else if (data.success) {
      setIsRegister(false);
    } else {
      setError(data.error || 'Error');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="bg-white shadow p-8 rounded" onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
          {isRegister ? 'Register' : 'Login'}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="mt-4">
          <button type="button" className="text-sm text-blue-500" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Login' : 'No account? Register'}
          </button>
        </div>
      </form>
    </div>
  );
}
