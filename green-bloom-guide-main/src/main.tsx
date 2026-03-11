/**
 * PlantWise - Pollution-Aware Plant Recommendation System
 * Main application entry point
 * 
 * @author PlantWise Team
 * @since 1.0.0
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize React app and mount to DOM
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
