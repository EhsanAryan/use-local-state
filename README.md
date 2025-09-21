# use-local-state-hook
A React custom hook to sync state with localStorage safely.


## Features:
- Automatically syncs with localStorage
- Converts undefined to null
- Warns if a File or Blob is passed
- Optional callback for invalid values


## Installation:
```bash
npm install use-local-state-hook
```


## Usage:
```js
import { useLocalState } from "use-local-state-hook";

function App() {
  const [value, setValue] = useLocalState("myKey", (invalidValue) => {
    alert("Cannot store File/Blob! Saving null instead.");
  });

  return (
    <input
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```
