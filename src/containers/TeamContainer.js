import React, { Component } from 'react';
import { connect } from 'react-redux'

import { setTeamNote, addTeam, setTeam } from "../actions/teams.js"
import api from "../services/vexdb.js"

import DataTable from "../components/DataTable.js"

class TeamContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    api.getStats(this.state.number).then(
      (results) => {
        this.props.dispatch(setTeamNote(this.state.number, { key: "stats", value: results }))
      }
    )
    api.getMatches(this.state.number).then(
      (results) => {
        this.props.dispatch(setTeamNote(this.state.number, { key: "matches", value: results }))
      }
    )
    api.getTeam(this.state.number).then(
      (results) => {
        this.props.dispatch(setTeamNote(this.state.number, { key: "teamInfo", value: results }))
      }
    )
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      number: (nextProps.number || nextProps.match.params.number),
      stats: nextProps.stats || {},
      matches: nextProps.matches || {},
      teamInfo: nextProps.teamInfo || {},
      userInputData: {
        notes: "",
        autonWorks: true,
        autonPoints: 0,
        ...nextProps.userInputData
      }
    }
  }

  setNote(e) {
  }

  setData(e) {
    const state = { ...this.state }
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    console.log(value);
    state.userInputData[e.target.name] = value
    this.setState({ userInputData: state.userInputData })
    this.props.dispatch(setTeam(this.state))
  }

  render() {
    return (
      <div>
        <h1>{ this.state.number + " - " + (!this.state.teamInfo ? "" : this.state.teamInfo.team_name) }</h1>

        <textarea placeholder="notes on team"
                  value={ this.state.userInputData.note }
                  name="note"
                  onChange={ this.setData.bind(this) }>
        </textarea>
        <div>
          <p>Auton: </p>
          <input type="number"
                 name="autonPoints"
                 value={ this.state.userInputData.autonPoints }
                 onChange={ this.setData.bind(this) }/>
          <input type="checkbox"
                 name="autonWorks"
                 checked={ this.state.userInputData.autonWorks }
                 onChange={ this.setData.bind(this) }/>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const number = (ownProps.number || ownProps.match.params.number)
  if(state.teams.find((team) => team.number === number)) {
    return {
      number,
      ...state.teams.find((team) => team.number === number)
    }
  } else {
    return {
      number
    }
  }
}

export default connect(mapStateToProps)(TeamContainer)
