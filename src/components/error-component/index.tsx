import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ErrorComponentProps {
  children: ReactNode;
}

interface ErrorComponentState {
  hasError: boolean;
}

class ErrorComponent extends Component<
  ErrorComponentProps,
  ErrorComponentState
> {
  state: ErrorComponentState = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): Partial<ErrorComponentState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorComponent caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen flex items-center justify-center">
          <h2>
            Bu Sayfada birşeyler ters gitti ana sayfaya dönmek için{" "}
            <Link to="/" className="text-blue-700">
              Buraya Tıkla
            </Link>{" "}
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorComponent;
