# use-local-state-hook
A React custom hook to sync state with localStorage safely.

---

## Features:
- Automatically syncs with localStorage
- Set initial value if a key has no value in localStorage
- Optional callback for invalid values (File or Blob or Function)

---

## Installation:
```bash
npm install use-local-state-hook
```

---

## Usage:
```js
import { useLocalState } from "use-local-state-hook";

// inside the component
const [state, setState] = useLocalState("key", "initial-value");
```

---

## Example:
```js
import { useLocalState } from "use-local-state-hook";

export default function App() {
  const [value, setValue] = useLocalState("myKey", "", (invalidValue) => {
    console.error("Cannot store File/Blob or Function in localStorage!");
  });

  return (
    <input
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```
