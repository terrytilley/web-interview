import React, { Component } from 'react'
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope, faClock } from '@fortawesome/free-solid-svg-icons'

import Header from './components/Header'
import Button from './components/Button'
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
      selectedAppointment: {},
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
          <h1 className="heading">New Appointment</h1>
          <UserSelect userId={this.state.userId} />

          <section className="options consultant-type">
            <div className="icon">
              <FontAwesomeIcon icon={faStethoscope} />
            </div>

            <div className="content">
              <h3>Consultant Type</h3>
              <div className="button-group">
                {appointmentTypes.map(({ key, label }) => (
                  <Button
                    key={key}
                    round="true"
                    active={(
                      this.state.selectedAppointmentType === key
                    ).toString()}
                    onClick={() =>
                      this.setState({ selectedAppointmentType: key })
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          <section className="options date-time">
            <div className="icon">
              <FontAwesomeIcon icon={faClock} />
            </div>

            <div className="content">
              <h3>Date &amp; Time</h3>
              <div className="button-group">
                {slots.map(slot => (
                  <Button
                    key={slot.id}
                    round="true"
                    active={(
                      this.state.selectedAppointment &&
                      this.state.selectedAppointment.id === slot.id
                    ).toString()}
                    onClick={() => {
                      this.setState({ selectedAppointment: slot })
                    }}
                  >
                    <Moment format="D MMM - HH:mm">{slot.time}</Moment>
                  </Button>
                ))}
              </div>
            </div>
          </section>

          <div>
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
