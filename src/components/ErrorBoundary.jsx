import { Component } from 'react';

export default class ExportBoundary extends Component {
  state = { error: null, info: null };
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>{this.state.error.toString()}</p>
          <p>{this.state.info.componentStack}</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
