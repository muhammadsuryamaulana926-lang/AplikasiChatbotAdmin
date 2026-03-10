import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ContextMenu from "./components/ContextMenu";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ContextMenu />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
