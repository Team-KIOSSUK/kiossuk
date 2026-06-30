import { useEffect } from "react";
import { Toaster } from "sonner";
import { MainPage } from "./pages/MainPage";
import "../styles/index.css";

export default function RestaurantApp() {
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    const previousStyle = root.getAttribute("style");
    root.style.display = "block";
    root.style.width = "100%";
    root.style.maxWidth = "none";
    root.style.minHeight = "100svh";
    root.style.margin = "0";
    root.style.borderInline = "0";
    root.style.textAlign = "left";
    root.style.alignItems = "stretch";

    return () => {
      if (previousStyle === null) {
        root.removeAttribute("style");
      } else {
        root.setAttribute("style", previousStyle);
      }
    };
  }, []);

  return (
    <>
      <MainPage />
      <Toaster position="top-center" richColors />
    </>
  );
}