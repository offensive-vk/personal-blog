import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const storedTheme = localStorage.getItem('theme');
const defaultTheme = 'dark'; // Default to dark theme if not specified in localStorage
const initialTheme = storedTheme || defaultTheme;
document.documentElement.classList.add(initialTheme);
createRoot(document.getElementById("root")!).render(<App />);