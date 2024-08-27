import AuthProvider from "./auth";
import { ContextProvider } from "./context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ContextProvider>
      <AuthProvider />
      {children}
    </ContextProvider>
  );
}
