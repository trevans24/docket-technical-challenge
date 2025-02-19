import { useState } from "react"
import "./App.css"
import {
  List,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import {
  compose,
  gt,
  isEmpty,
  isNil,
  length,
  path,
  prop,
  tap,
  trim,
} from "ramda"

const wordSuggestions = {
  happy: ["joyful", "cheerful", "content"],
  sad: ["unhappy", "miserable", "downcast"],
  fast: ["quick", "speedy", "rapid"],
  slow: ["lethargic", "sluggish", "unhurried"],
}

function App() {
  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])

  // Quick shortcut functions
  // trimWord > val -> trimFn
  const trimWord = trim
  const resetSuggestions = () => setSuggestions([])

  // Handle Suggestions
  // val: string
  // trim val for spaces
  // if empty reset suggestions
  // map through object keys to find matched
  // if matched is null/undefined reset suggestions
  // set suggestions to value of word suggestions matching key
  const handleSuggestions = (val) => {
    const trimmed = trimWord(val)
    if (isEmpty(trimmed)) return resetSuggestions()
    const matchedKey = Object.keys(wordSuggestions).find((key) =>
      key.includes(trimmed)
    )
    if (isNil(matchedKey)) return resetSuggestions()
    return setSuggestions(prop(matchedKey, wordSuggestions))
  }

  // Reads RTL > in this case bottom to top
  // Get target value
  // set text state (tap returns the given value still)
  // handle suggestions
  const handleChange = compose(
    handleSuggestions,
    tap(setText),
    path(["target", "value"])
  )

  const handleClick = (word) => {
    const trimmed = trimWord(word)
    setText(trimmed)
    resetSuggestions()
  }

  return (
    <Stack
      spacing={2}
      sx={{
        mx: "auto",
        my: 5,
        maxWidth: 500,
      }}
    >
      <Typography>Character Count: {length(text)}</Typography>
      <TextField
        fullWidth
        onChange={handleChange}
        placeholder="Type Here"
        value={text}
      />
      {gt(length(suggestions), 0) && (
        <Stack>
          <Typography>Suggestions:</Typography>
          <List>
            {suggestions.map((word, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => handleClick(word)}
                sx={{ textTransform: "capitalize" }}
              >
                {word}
              </ListItemButton>
            ))}
          </List>
        </Stack>
      )}
    </Stack>
  )
}

export default App
