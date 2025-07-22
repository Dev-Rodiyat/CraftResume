import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import About from "./pages/About";
import MyCraft from "./pages/MyCraft";
import ResumeView from "./pages/ResumeView";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/my-craft" element={<MyCraft />} />
          <Route path="/resume/:id" element={<ResumeView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
