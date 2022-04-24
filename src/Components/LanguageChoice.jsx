import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const languageOptions = [
  { key: 'English', text: 'English', value: 'English' },
  { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
]
const LanguageChoice = () => (
  <Dropdown
    button
    className="icon"
    floating
    labeled
    icon="world"
    options={languageOptions}
    search
    text="Select Language"
  />
)

export default LanguageChoice
