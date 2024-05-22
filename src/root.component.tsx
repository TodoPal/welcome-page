import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Welcome } from "./components/welcome/welcome";
import './output.css'

export default function Root() {
  return <>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Welcome />} />
          <Route path="signup" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </>;
}
