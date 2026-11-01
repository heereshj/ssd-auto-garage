import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import JobCards from "./pages/JobCards";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;