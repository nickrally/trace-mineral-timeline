import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

//render(<App />, document.getElementById("app"));

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
