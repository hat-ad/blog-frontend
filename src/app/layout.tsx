"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
import SocketProvider from "@/components/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketProvider>
              <GoogleOAuthProvider clientId="455066287392-6cev9t47iin08lv77iuva7cu3i25pc2u.apps.googleusercontent.com">
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
              </GoogleOAuthProvider>
            </SocketProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
