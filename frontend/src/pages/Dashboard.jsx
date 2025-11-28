import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const api = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([])
  useEffect(() => {
    axios.get(`${api}/api/prescriptions`).then(r => setPrescriptions(r.data))
  }, [])
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 16 }}>
        <div style={{ border: '1px solid #e5e5e5', borderRadius: 10, padding: 12 }}>
          <div style={{ fontWeight: 600, color: '#0d6efd', marginBottom: 6 }}>Add Prescription</div>
          <div style={{ color: '#555', marginBottom: 10 }}>Create a prescription with meds and schedules.</div>
          <Link to="/prescriptions/new" style={{ display: 'inline-block', background: '#0d6efd', color: '#fff', padding: '8px 10px', borderRadius: 8, textDecoration: 'none' }}>Open</Link>
        </div>
        <div style={{ border: '1px solid #e5e5e5', borderRadius: 10, padding: 12 }}>
          <div style={{ fontWeight: 600, color: '#0d6efd', marginBottom: 6 }}>Reminders</div>
          <div style={{ color: '#555', marginBottom: 10 }}>Set times, pause/resume, and manage alerts.</div>
          <Link to="/reminders" style={{ display: 'inline-block', background: '#0d6efd', color: '#fff', padding: '8px 10px', borderRadius: 8, textDecoration: 'none' }}>Open</Link>
        </div>
        <div style={{ border: '1px solid #e5e5e5', borderRadius: 10, padding: 12 }}>
          <div style={{ fontWeight: 600, color: '#0d6efd', marginBottom: 6 }}>Caregivers</div>
          <div style={{ color: '#555', marginBottom: 10 }}>Register family caregivers for notifications.</div>
          <Link to="/caregivers" style={{ display: 'inline-block', background: '#0d6efd', color: '#fff', padding: '8px 10px', borderRadius: 8, textDecoration: 'none' }}>Open</Link>
        </div>
      </div>
      <h2>Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <div style={{ color: '#666' }}>No prescriptions yet. Use "Add Prescription" above to create one.</div>
      ) : (
        <ul>
          {prescriptions.map(p => (
            <li key={p.id}>
              <b>{p.patientName}</b> {p.doctor} {p.startDate} {p.endDate} {p.medications.length}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
