import React from "react";
import TimelineWithToolbar from "./TimelineWithToolbar";
import { ViewModelContextProvider } from "./ViewModelContext";

function App() {
  return (
    <div>
      <ViewModelContextProvider>
        <TimelineWithToolbar />
      </ViewModelContextProvider>
    </div>
  );
}

export default App;
