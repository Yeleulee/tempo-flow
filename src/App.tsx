import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import routes from "tempo-routes";
import { Toaster } from "@/components/ui/toaster";

function App() {
  // Check for saved theme preference or system preference
  useEffect(() => {
    const isDarkMode = localStorage.getItem("appSettings")
      ? JSON.parse(localStorage.getItem("appSettings") || "{}").darkMode
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster />
      </div>
    </Suspense>
  );
}

export default App;
