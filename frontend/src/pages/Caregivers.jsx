import React, { useEffect, useState } from 'react'
import axios from 'axios'

const api = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Caregivers() {
  const [caregivers, setCaregivers] = useState([])
  const [form, setForm] = useState({ patientId: '', name: '', phone: '', email: '' })
  useEffect(() => {
    axios.get(`${api}/api/caregivers`).then(r => setCaregivers(r.data))
  }, [])
  function submit(e) {
    e.preventDefault()
    axios.post(`${api}/api/caregivers/register`, form).then(r => {
      setCaregivers(prev => [...prev, r.data])
      setForm({ patientId: '', name: '', phone: '', email: '' })
    })
  }
  return (
    <div>
      <h2>Caregivers</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
        <input placeholder="Patient ID" value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} />
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      <ul>
        {caregivers.map(c => (
          <li key={c.id}>{c.name} {c.phone} {c.email} {c.patientId}</li>
        ))}
      </ul>
    </div>
  )
}
