import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";

const apiKey = "QYgzjYAhVqhzr08lQkKtnjYGXadZx7I4";

const override = css`
  display: block;
  margin: 0 auto;
`;

class App extends React.Component {
  state = {
    gif: "",
    loading: true
  };

  getGif = async () => {
    const response = await fetch(
      `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=catfail`
    );
    const blob = await response.json();
    const gif = await blob.data.images.original;
    this.setState({
      gif: gif.url,
      loading: false
    });
  };

  onButtonclick = async () => {
    this.setState({
      loading: true
    });
    await this.getGif();
  };

  async componentDidMount() {
    await this.getGif();
  }

  render() {
    const { loading, gif } = this.state;
    return (
      <div className="container">
        <div className="title">
          <h2>cat fails</h2>
        </div>
        <div className="gif-section">
          {loading ? (
            <div className="sweet-loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#02182b"}
                loading={loading}
              />
            </div>
          ) : (
            <img src={gif} alt="cute cat" />
          )}
        </div>
        <button onClick={this.onButtonclick}>😻</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
