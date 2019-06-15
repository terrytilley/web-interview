import React, { Component } from 'react'
import Moment from 'react-moment'

import Header from './components/Header'
import UserSelect from './components/UserSelect'
import { API_ENDPOINT } from './config'

import 'normalize.css'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      user: null,
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

    const appointmentTypes = [
      { key: 'gp', label: 'GP' },
      { key: 'therapist', label: 'Therapist' },
      { key: 'physio', label: 'Physio' },
      { key: 'specialist', label: 'Specialist' },
    ]

    return (
      <div className="app">
        <Header />
        <div className="container">
          <h2 className="heading">New Appointment</h2>
          <UserSelect userId={this.state.userId} />
          {appointmentTypes.map(({ key, label }) => (
            <button
              className="button"
              key={key}
              onClick={() => {
                this.setState({ selectedAppointmentType: key })
              }}
            >
              {label}
            </button>
          ))}
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
                <Moment format="D MMM - HH:mm">{slot.time}</Moment>
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
