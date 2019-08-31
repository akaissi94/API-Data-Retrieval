import * as React from "react";
import axios from "axios";
import "./styles.css";
import Results from "../Results";

interface IState {
  results: any[] | null;
  error: string | null;
  loading: boolean;
}

class Search extends React.Component<{}, IState> {
  private searchInput = React.createRef<HTMLInputElement>();
  private resultsComponent = React.createRef<Results>();

  public state: IState = {
    results: null,
    error: null,
    loading: false
  };

  public search = () => {
    if (this.searchInput.current) {
      const inputValue: string = this.searchInput.current.value;
      if (inputValue.trim() !== "") {
        this.setState({ loading: true });
        axios
          .get("https://www.googleapis.com/books/v1/volumes", {
            params: {
              q: inputValue
            }
          })
          .then(response => {
            const data = response.data;
            this.setState(
              {
                results: data.items || [],
                error: null,
                loading: false
              },
              () => {
                if (this.resultsComponent.current) {
                  this.resultsComponent.current.clearExpanded();
                }
              }
            );
          })
          .catch(err => {
            this.setState(
              {
                error:
                  err.response && err.response.data && err.response.data.error
                    ? err.response.data.error.message
                    : "Unexpected Error.",
                results: null,
                loading: false
              },
              () => {
                if (this.resultsComponent.current) {
                  this.resultsComponent.current.clearExpanded();
                }
              }
            );
          });
      } else {
        this.setState({
          error: "Please enter a term before searching.",
          results: null
        });
      }
    }
  };

  public render() {
    return (
      <div>
        <input
          placeholder="Please Enter Your Query Term(s) Here"
          className="Search-searchbar"
          ref={this.searchInput}
          onKeyDown={e => {
            if (e.key === "Enter") {
              this.search();
            }
          }}
          onChange={() => {
            this.setState({ error: null, results: null });
          }}
        ></input>
        {this.state.loading ? (
          <button className="Search-searchbutton Search-no_events">
            Loading...
          </button>
        ) : (
          <button className="Search-searchbutton" onClick={this.search}>
            Search
          </button>
        )}
        {this.state.error && (
          <div className="Search-error">Error: {this.state.error}</div>
        )}
        <Results
          entries={this.state.results}
          ref={this.resultsComponent}
        ></Results>
      </div>
    );
  }
}

export default Search;
