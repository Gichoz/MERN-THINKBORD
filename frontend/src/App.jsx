import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="forest" className="min-h-screen bg-base-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

