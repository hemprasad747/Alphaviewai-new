import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Hide React root div and let static content show
    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      rootDiv.style.display = 'none';
    }
  }, []);

  return null;
}

export default App;
