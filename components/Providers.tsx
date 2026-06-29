"use client"
import React, { ReactNode, useState } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from '@/app/store/store';



const Providers = ({ children }: { children: ReactNode }) => {
    const [ client ] = useState(() => new QueryClient());
  return (
  <ReduxProvider store={store}>
  <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools  initialIsOpen={false} />
  </QueryClientProvider>
  </ReduxProvider>
  )
}

export default Providers;
