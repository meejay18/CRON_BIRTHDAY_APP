import React from 'react'
import { useState } from 'react'

const App = () => {
  const [form, setForm] = useState({ username: '', email: '', dateOfBirth: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    alert('User added!')
  }
  return (
    <div className='bg-gray-400 w-[100%] h-screen flex justify-center items-center'>
      <form
        className='w-[30%] h-[70%] flex flex-col gap-5  bg-gray-200 p-6 rounded shadow-md'
        onSubmit={handleSubmit}
      >
        <h2 className='text-xl font-bold mb-4'>Register Birthday</h2>

        <input
          type='text'
          placeholder='Username'
          className='border rounded p-2 w-full mb-2'
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type='email'
          placeholder='Email'
          className='border rounded p-2 w-full mb-2'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type='date'
          className='border rounded text-gray-700  p-2 w-full mb-4'
          onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
        />

        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded w-full'
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default App
