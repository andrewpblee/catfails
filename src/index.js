import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { ScaleLoader } from "react-spinners";

const apiKey = "QYgzjYAhVqhzr08lQkKtnjYGXadZx7I4";

class App extends React.Component {
  state = {
    gif: "",
    loading: true
  };

  getGif = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=catfail`
      );
      const blob = await response.json();
      const gif = await blob.data.images.fixed_height;
      this.setState({
        gif: gif.url,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
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
                sizeUnit={"px"}
                size={150}
                color={"#3d518c"}
                loading={loading}
              />
            </div>
          ) : (
            <img src={gif} alt="cute cat" />
          )}
          <button onClick={this.onButtonclick}>Another Fail</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
