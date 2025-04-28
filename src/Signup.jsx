import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('http://localhost:3002/users?email=' + encodeURIComponent(email))
      const existingUsers = await response.json()
      if (existingUsers.length > 0) {
        setError('Email already exists')
        return
      }

      const newUser = { name, email, password }
      const postResponse = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      if (postResponse.ok) {
        localStorage.setItem('account', JSON.stringify(newUser))
        navigate('/login')
      } else {
        setError('Failed to sign up. Please try again later.')
      }
    } catch (err) {
      setError('Failed to sign up. Please try again later.')
      console.error(err)
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
