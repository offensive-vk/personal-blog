import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set initial theme class
const storedTheme = localStorage.getItem('theme');
const defaultTheme = 'dark'; // Default to dark theme if not specified in localStorage
const initialTheme = storedTheme || defaultTheme;

// Apply theme class to document element
document.documentElement.classList.add(initialTheme);

createRoot(document.getElementById("root")!).render(<App />);
