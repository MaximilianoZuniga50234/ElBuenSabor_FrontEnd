import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./app/components/auth0/Auth0ProviderWithNavigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/*<Auth0ProviderWithNavigate>*/}
      <App />
    {/*</Auth0ProviderWithNavigate>*/}
  </BrowserRouter>
);
