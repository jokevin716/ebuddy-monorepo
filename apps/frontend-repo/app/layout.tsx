'use client'

import { Inter } from "next/font/google"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import theme from "@/theme/theme"
import AuthProvider from "@/components/providers/AuthProvider"
import ErrorBoundary from "@/components/organisms/ErrorBoundary"
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
              <AuthProvider>
                {children}
              </AuthProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
