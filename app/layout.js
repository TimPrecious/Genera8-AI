import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = { title: "Genera8", description: "Chat, images and speech-to-text" };

// layout.js wraps every page.
// ThemeProvider shares the light/dark theme with all components.
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
