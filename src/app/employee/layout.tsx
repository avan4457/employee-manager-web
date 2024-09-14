"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "@/components/header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7933ff",
    },
    secondary: {
      main: "#1976d2",
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <div className="flex flex-col gap-8 p-5">{children}</div>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
