import React, { useState, useEffect } from 'react'
import { Dropdown, Form, ButtonGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const SelectMultipleOptions = ({ availableNights, selectedNights, onNightsChange }) => {
  // console.log('availableNights', availableNights)
  const combinedNights = [...new Set([...availableNights, ...selectedNights])].sort((a, b) => a - b)
  // const combinedNights = availableNights.concat(selectedNights).sort((a, b) => a - b)

  return (
    <div className="mt-3">
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="" className="bg-transparent input-border" id="dropdown-nights">
          Select Nights
        </Dropdown.Toggle>
        <Dropdown.Menu className="ps-3">
          <Form>
            {combinedNights.map((night) => (
              <Form.Check
                key={night}
                type="checkbox"
                id={`nights-checkbox-${night}`}
                label={`Night ${night}`}
                name={`night${night}`}
                checked={selectedNights.includes(night)}
                onChange={() => onNightsChange(night)}
              />
            ))}
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
export default SelectMultipleOptions
