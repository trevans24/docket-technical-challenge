import { useState } from "react"
import "./App.css"
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
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
  toLower,
  trim,
} from "ramda"
import shadows from "@mui/material/styles/shadows"
import CancelIcon from "@mui/icons-material/Cancel"

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
  // trimWord > val -> trimFn -> toLowercase
  const trimWord = compose(toLower, trim)
  const resetSuggestions = () => setSuggestions([])
  const hasSuggestionLength = gt(length(suggestions), 0)

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

  const handleClear = () => {
    setText("")
    resetSuggestions()
  }

  return (
    <Stack
      sx={{
        mx: "auto",
        my: 5,
        maxWidth: 500,
      }}
    >
      <Stack spacing={2}>
        <Typography>Character Count: {length(text)}</Typography>
        <TextField
          fullWidth
          helperText={
            hasSuggestionLength ? "" : "Try: Happy, Sad, Fast, or Slow"
          }
          onChange={handleChange}
          placeholder="Type Here"
          InputProps={{
            sx: {
              borderRadius: 4,
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear the input"
                    onClick={handleClear}
                    edge="end"
                  >
                    <CancelIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          value={text}
        />
      </Stack>
      {hasSuggestionLength && (
        <Stack
          sx={{
            backgroundColor: "#FAFAFA",
            borderRadius: 4,
            boxShadow: shadows[5],
            padding: 2,
          }}
        >
          <Typography>Synonyms:</Typography>
          <Box>
            <List>
              {suggestions.map((word, idx) => (
                <ListItem disablePadding key={idx}>
                  <ListItemButton
                    onClick={() => handleClick(word)}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {word}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      )}
    </Stack>
  )
}

export default App
