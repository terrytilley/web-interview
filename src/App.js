import Moment from 'react-moment'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVideo,
  faClock,
  faImages,
  faStickyNote,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons'

import Header from './components/Header'
import Button from './components/Button'
import Textarea from './components/Textarea'
import FileUpload from './components/FileUpload'
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
      availableSlots: [],
      appointment: {},
      selectedAppointment: {},
      selectedAppointmentType: 'gp',
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

  onSubmit = () => {
    fetch(`${API_ENDPOINT}/appointments`, {
      method: 'POST',
      body: JSON.stringify({
        userId: this.state.userId,
        dateTime: this.state.selectedAppointment.time,
        notes: this.state.appointment.notes,
        type: this.state.selectedAppointmentType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response))
        this.setState({
          ...this.state,
          user: null,
          appointment: {},
          selectedAppointment: {},
          selectedAppointmentType: 'gp',
        })
      })
      .catch(error => console.error('Error:', error))
  }

  render() {
    // calculate matching slots
    const slots = this.state.availableSlots
      .filter(slot => {
        return slot.consultantType.some(
          type => type === this.state.selectedAppointmentType
        )
      })
      // filter past slots
      .filter(slot => {
        return slot.time > new Date().toISOString()
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
              <div className="user-input">
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

          {slots.length > 0 ? (
            <section className="options date-time">
              <div className="icon">
                <FontAwesomeIcon icon={faClock} />
              </div>

              <div className="content">
                <h3>Date &amp; Time</h3>
                <div className="user-input">
                  {slots.map(slot => (
                    <Button
                      key={slot.id}
                      round="true"
                      active={(
                        this.state.selectedAppointment &&
                        this.state.selectedAppointment.id === slot.id
                      ).toString()}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          selectedAppointment: slot,
                        })
                      }}
                    >
                      <Moment format="D MMM - HH:mm">{slot.time}</Moment>
                    </Button>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {this.state.selectedAppointment.id ? (
            <section className="options appointment-type">
              <div className="icon">
                <FontAwesomeIcon icon={faVideo} />
              </div>

              <div className="content">
                <h3>Appointment Type</h3>
                <div className="user-input">
                  {this.state.selectedAppointment.appointmentType.map(
                    (type, index) => (
                      <Button
                        key={index}
                        round="true"
                        active={(
                          this.state.appointment.type === type
                        ).toString()}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            appointment: { ...this.state.appointment, type },
                          })
                        }}
                      >
                        {type}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </section>
          ) : null}

          {this.state.selectedAppointment.id ? (
            <section className="options notes">
              <div className="icon">
                <FontAwesomeIcon icon={faStickyNote} />
              </div>

              <div className="content">
                <h3>Notes</h3>
                <div className="user-input">
                  <Textarea
                    onChange={e =>
                      this.setState({
                        ...this.state,
                        appointment: { notes: e.target.value },
                      })
                    }
                    placeholder="Describe your symptoms"
                    cols="50"
                    rows="10"
                  />
                </div>
              </div>
            </section>
          ) : null}

          {this.state.selectedAppointment.id ? (
            <section className="options photo">
              <div className="icon">
                <FontAwesomeIcon icon={faImages} />
              </div>

              <div className="content">
                <h3>Attach A Photo</h3>
                <div className="user-input">
                  <FileUpload />
                </div>
              </div>
            </section>
          ) : null}

          <hr />

          <div>
            <Button
              disabled={!this.state.selectedAppointment.id}
              active="true"
              fullwidth="true"
              onClick={this.onSubmit}
            >
              Book appointment
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
