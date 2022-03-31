import React, { useState } from 'react'
import Downshift from 'downshift'
import { TextField, Chip, useTheme } from '@mui/material'

const TagsInput = ({ ...props }) => {
  const { tags, setTags, ...other } = props
  const [inputValue, setInputValue] = useState('')
  const theme = useTheme()

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      const newTags = [...tags]
      const duplicatedValues = newTags.indexOf(e.target.value.trim())

      if (duplicatedValues !== -1) {
        setInputValue('')
        return
      }

      newTags.push(e.target.value.trim())
      setTags(newTags)
      setInputValue('')
    }
    if (tags.length && !inputValue.length && e.key === 'Backspace') {
      setTags(tags.slice(0, tags.length - 1))
    }
  }

  const handleChange = (item) => {
    let newTags = [...tags]
    if (newTags.indexOf(item) === -1) {
      newTags = [...newTags, item]
    }
    setInputValue('')
    setTags(newTags)
  }

  const handleDelete = (item) => () => {
    const newTags = [...tags]
    newTags.splice(newTags.indexOf(item), 1)
    setTags(newTags)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <Downshift
        id='downshift-multiple'
        inputValue={inputValue}
        onChange={handleChange}
        tags={tags}>
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
          })
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: tags.map((item) => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      sx={{ margin: theme.spacing(0.5, 0.25) }}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: (e) => {
                    handleInputChange(e)
                    onChange(e)
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          )
        }}
      </Downshift>
    </>
  )
}

export default TagsInput
