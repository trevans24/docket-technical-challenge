import { useState } from "react"
import "./App.css"

const suggestions = {
  happy: ["joyful", "cheerful", "content"],
  sad: ["unhappy", "miserable", "downcast"],
  fast: ["quick", "speedy", "rapid"],
  slow: ["lethargic", "sluggish", "unhurried"],
}

function App() {
  const [text, setText] = useState("")

  return <div className="App">working</div>
}

export default App
