import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListView from "./pages/ListView";
import DetailView from "./pages/DetailView";

export default function App() {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === "production" ? "/mp2" : "/"}>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/pokemon/:id" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}
