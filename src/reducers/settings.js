import { SET_SETTING, SET_SETTINGS } from "../actions/settings.js"

const defaultSettings = {
  sku: "RE-VRC-17-3805", // TODO: make this user controllable
  season: "In The Zone",
  program: "VRC",
  divisions: "Technology",
  userTeam: "1859X"
}

export default function settings(state = defaultSettings, action) {
  if(action.type === SET_SETTING) {
    return { ...state, ...action.payload }
  } else if(action.type === SET_SETTINGS) {
    return { ...action.payload.settings }
  } else {
    return state
  }
}
