import React, { Component } from 'react'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedAppointment: null,
      selectedAppointmentType: 'gp',
      availableSlots: [],
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({ availableSlots: json })
      })
      .catch(() => {
        this.setState({ availableSlots: [] })
      })
  }

  render() {
    // calculate matching slots
    const slots = this.state.availableSlots.filter(slot => {
      return slot.consultantType.some(
        type => type === this.state.selectedAppointmentType
      )
    })

    return (
      <div className="app">
        <h2 className="h6">New appointment</h2>
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          <button
            className="button"
            id="GP-button"
            onClick={e => {
              this.setState({ selectedAppointmentType: 'gp' })
            }}
          >
            GP
          </button>
          <button
            className="button"
            onClick={e => {
              this.setState({ selectedAppointmentType: 'therapist' })
            }}
          >
            Therapist
          </button>
          <button
            className="button"
            onClick={e => {
              this.setState({ selectedAppointmentType: 'physio' })
            }}
          >
            Physio
          </button>
          <button
            className="button"
            onClick={e => {
              this.setState({ selectedAppointmentType: 'specialist' })
            }}
          >
            Specialist
          </button>
          <div>
            <strong>Appointments</strong>
            {slots.map(slot => (
              <li
                key={slot.id}
                className="appointment-button"
                onClick={() => {
                  this.setState({ selectedAppointment: slot })
                }}
              >
                {slot.time}
              </li>
            ))}
          </div>
          <div>
            <strong>Notes</strong>
            <textarea />
          </div>
          <div>
            <button
              className="button"
              onClick={() => {
                /* TODO: submit the data */
                console.log('Submit the data')
              }}
            >
              Book appointment
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
