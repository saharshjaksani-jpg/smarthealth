import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setUser }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]')
    } catch {
      return []
    }
  }
  function setUsers(list) {
    localStorage.setItem('users', JSON.stringify(list))
  }

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    const u = username.trim().toLowerCase()
    if (!u || !password) {
      setError('Please enter username and password')
      return
    }
    const users = getUsers()
    if (mode === 'signup') {
      if (password !== confirm) {
        setError('Passwords do not match')
        return
      }
      if (users.some(x => x.username === u)) {
        setError('Username already exists')
        return
      }
      const next = [...users, { username: u, password }]
      setUsers(next)
      localStorage.setItem('user', JSON.stringify({ username: u }))
      setUser({ username: u })
      navigate('/')
      return
    }
    const found = users.find(x => x.username === u && x.password === password)
    if (!found) {
      setError('Invalid credentials')
      return
    }
    localStorage.setItem('user', JSON.stringify({ username: u }))
    setUser({ username: u })
    navigate('/')
  }

  const gradientBg = 'linear-gradient(135deg, #8a5cf6 0%, #0d6efd 50%, #00d4ff 100%)'
  const cardStyle = {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 20px 40px rgba(13,110,253,0.25)',
    padding: 24,
    width: '100%',
    maxWidth: 420,
    display: 'grid',
    gap: 12
  }
  const inputStyle = {
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #e5e5e5',
    fontSize: 16
  }
  const btnStyle = {
    padding: '12px 14px',
    borderRadius: 12,
    border: 'none',
    background: '#0d6efd',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer'
  }

  return (
    <div style={{ minHeight: '100vh', background: gradientBg, display: 'grid', placeItems: 'center', padding: 16 }}>
      <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 1000 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{mode === 'signup' ? 'Create Account' : 'Welcome back'}</h2>
              <button type="button" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')} style={{ background: 'none', border: '1px solid #e5e5e5', borderRadius: 12, padding: '8px 12px', cursor: 'pointer' }}>
                {mode === 'signup' ? 'Have an account? Sign in' : 'New here? Sign up'}
              </button>
            </div>
            {error && <div style={{ color: '#dc3545', fontWeight: 600 }}>{error}</div>}
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
              <input style={inputStyle} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              {mode === 'signup' && (
                <input style={inputStyle} type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} />
              )}
              <button style={btnStyle} type="submit">{mode === 'signup' ? 'Create account' : 'Sign in'}</button>
            </form>
            <div style={{ color: '#555' }}>
              By signing in you agree to our terms and privacy policy.
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
