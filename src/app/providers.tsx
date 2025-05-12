"use client";

import { getQueryClient } from "@/composables/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";


export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient =  getQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <main>
          <div id="dialog-root"></div>
          {children}
        </main>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
