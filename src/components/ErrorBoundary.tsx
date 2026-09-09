import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

// Global guard: a thrown error in any route should degrade to a message,
// not a blank screen (React unmounts the whole tree when an error escapes).
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught render error:", error, info.componentStack)
  }

  handleReload = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback) return this.props.fallback

    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-lg font-semibold text-black">
          Terjadi kesalahan
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Halaman gagal dimuat. Coba muat ulang; jika masih bermasalah hubungi
          administrator.
        </p>
        <button
          onClick={this.handleReload}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Muat ulang
        </button>
      </div>
    )
  }
}
