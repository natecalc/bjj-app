import { StrictMode } from "react";
import "./App.css";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

function App() {
  return (
    <main>
      <div className="w-full bg-red-400 items-center text-center p-12">
        GM TEST
      </div>
    </main>
  );
}

export default App;
