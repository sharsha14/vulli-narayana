import { Component, ReactNode } from "react";
import VulliInstitutePage from "./components/VulliInstitutePage";

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
          <div className="max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <h1 className="text-2xl font-black">Vulli Narayana Institute</h1>
            <p className="mt-4 text-base text-muted-foreground">
              The page could not load correctly. Please refresh once and try again.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <VulliInstitutePage />
    </AppErrorBoundary>
  );
}
