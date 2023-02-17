import { Suspense } from "react";
import "./App.css";
import { LazyPage } from "./pages";
import { PageRoutes } from "./PageRoutes";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LazyPage />}>
        <PageRoutes />
      </Suspense>
    </div>
  );
}

export default App;
