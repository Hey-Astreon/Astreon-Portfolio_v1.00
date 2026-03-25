import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useState } from 'react';
import Home from "./pages/Home";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorTrail } from "./components/CursorTrail";
import { AstraAssistant } from "./components/AstraAssistant";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {loading ? (
            <LoadingScreen onComplete={() => setLoading(false)} />
          ) : (
            <>
              <ScrollProgress />
              <AstraAssistant />
              <div className="animate-astra-fade">
                <CursorTrail />
                <Toaster />
                <Router />
              </div>
            </>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
