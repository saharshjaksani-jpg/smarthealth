import React, { useState } from 'react'
import axios from 'axios'

const api = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function AddPrescription() {
  const [patientName, setPatientName] = useState('')
  const [doctor, setDoctor] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [medications, setMedications] = useState([{ name: '', dose: '', times: '' }])

  function setMed(index, key, value) {
    const next = medications.slice()
    next[index] = { ...next[index], [key]: value }
    setMedications(next)
  }
  function addMed() {
    setMedications([...medications, { name: '', dose: '', times: '' }])
  }
  function submit(e) {
    e.preventDefault()
    const payload = {
      patientId: patientName.toLowerCase().replace(/\s+/g, '-'),
      patientName,
      doctor,
      startDate,
      endDate,
      medications: medications.filter(m => m.name).map(m => ({
        name: m.name,
        dose: m.dose,
        times: m.times.split(',').map(s => s.trim())
      }))
    }
    axios.post(`${api}/api/prescriptions`, payload).then(() => {
      setPatientName('')
      setDoctor('')
      setStartDate('')
      setEndDate('')
      setMedications([{ name: '', dose: '', times: '' }])
    })
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 640 }}>
      <h2>Add Prescription</h2>
      <input placeholder="Patient name" value={patientName} onChange={e => setPatientName(e.target.value)} />
      <input placeholder="Doctor" value={doctor} onChange={e => setDoctor(e.target.value)} />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <div>
        <h3>Medications</h3>
        {medications.map((m, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
            <input placeholder="Name" value={m.name} onChange={e => setMed(i, 'name', e.target.value)} />
            <input placeholder="Dose" value={m.dose} onChange={e => setMed(i, 'dose', e.target.value)} />
            <input placeholder="Times (comma separated)" value={m.times} onChange={e => setMed(i, 'times', e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addMed}>Add medicine</button>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}
