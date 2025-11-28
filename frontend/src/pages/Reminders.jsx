import React, { useEffect, useState } from 'react'
import axios from 'axios'

const api = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Reminders() {
  const [reminders, setReminders] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [form, setForm] = useState({ prescriptionId: '', medicationName: '', dose: '', times: '', startDate: '', endDate: '', notifyTo: '' })
  useEffect(() => {
    axios.get(`${api}/api/reminders`).then(r => setReminders(r.data))
    axios.get(`${api}/api/prescriptions`).then(r => setPrescriptions(r.data))
  }, [])
  function submit(e) {
    e.preventDefault()
    const payload = {
      prescriptionId: form.prescriptionId,
      medicationName: form.medicationName,
      dose: form.dose,
      times: form.times.split(',').map(s => s.trim()),
      startDate: form.startDate,
      endDate: form.endDate,
      notifyTo: form.notifyTo.split(',').map(s => s.trim())
    }
    axios.post(`${api}/api/reminders`, payload).then(r => {
      setReminders(prev => [r.data, ...prev])
      setForm({ prescriptionId: '', medicationName: '', dose: '', times: '', startDate: '', endDate: '', notifyTo: '' })
    })
  }
  function pause(id) {
    axios.put(`${api}/api/reminders/${id}/pause`).then(r => {
      setReminders(rs => rs.map(x => x.id === id ? r.data : x))
    })
  }
  function resume(id) {
    axios.put(`${api}/api/reminders/${id}/resume`).then(r => {
      setReminders(rs => rs.map(x => x.id === id ? r.data : x))
    })
  }
  function remove(id) {
    axios.delete(`${api}/api/reminders/${id}`).then(() => {
      setReminders(rs => rs.filter(x => x.id !== id))
    })
  }
  return (
    <div>
      <h2>Reminders</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
        <select value={form.prescriptionId} onChange={e => setForm({ ...form, prescriptionId: e.target.value })}>
          <option value="">Select prescription</option>
          {prescriptions.map(p => <option key={p.id} value={p.id}>{p.patientName} {p.doctor}</option>)}
        </select>
        <input placeholder="Medication name" value={form.medicationName} onChange={e => setForm({ ...form, medicationName: e.target.value })} />
        <input placeholder="Dose" value={form.dose} onChange={e => setForm({ ...form, dose: e.target.value })} />
        <input placeholder="Times (comma separated)" value={form.times} onChange={e => setForm({ ...form, times: e.target.value })} />
        <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
        <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
        <input placeholder="Notify to (emails/phones)" value={form.notifyTo} onChange={e => setForm({ ...form, notifyTo: e.target.value })} />
        <button type="submit">Create reminder</button>
      </form>
      <ul>
        {reminders.map(r => (
          <li key={r.id} style={{ marginBottom: 8 }}>
            <span>{r.medicationName} {r.dose} {r.times.join(', ')} {r.status}</span>
            <button onClick={() => pause(r.id)} style={{ marginLeft: 8 }}>Pause</button>
            <button onClick={() => resume(r.id)} style={{ marginLeft: 8 }}>Resume</button>
            <button onClick={() => remove(r.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
