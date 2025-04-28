import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length === 0) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/users')
      const users = await response.json()
      const user = users.find(
        (u) => u.email === email && u.password === password
      )
      if (user) {
        localStorage.setItem('account', JSON.stringify(user))
        navigate('/homepage')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Failed to login. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
