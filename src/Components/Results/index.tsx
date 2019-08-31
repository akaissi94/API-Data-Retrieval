import * as React from "react";
import "./styles.css";

interface IProps {
  entries: any[] | null;
}

interface IState {
  isExpanded: string[];
}

class Results extends React.Component<IProps, IState> {
  public state: IState = { isExpanded: [] };

  public clearExpanded = () => {
    this.setState({
      isExpanded: []
    });
  };

  public render() {
    return (
      <div className="Results-main">
        {this.props.entries && this.props.entries.length > 0 && (
          <div>
            {this.props.entries.map(entry => {
              const volumeInfo = entry.volumeInfo;
              return (
                <div key={entry.id}>
                  <div
                    className="Results-results"
                    onClick={() => {
                      const indexOfID = this.state.isExpanded.indexOf(entry.id);
                      if (indexOfID < 0) {
                        this.setState({
                          isExpanded: [...this.state.isExpanded, entry.id]
                        });
                      } else {
                        this.setState({
                          isExpanded: this.state.isExpanded.filter(id => {
                            return id !== entry.id;
                          })
                        });
                      }
                    }}
                  >
                    {volumeInfo.title}
                  </div>
                  {this.state.isExpanded.indexOf(entry.id) > -1 && (
                    <div className="Results-result_details">
                      <div className="Results-result_details_cell">
                        <h3>Subtitle</h3>
                      </div>
                      <div className="Results-result_details_cell">
                        {volumeInfo.subtitle
                          ? volumeInfo.subtitle
                          : "No Subtitle."}
                      </div>
                      <div className="Results-result_details_cell">
                        <h3>Average Rating</h3>
                      </div>
                      <div className="Results-result_details_cell">
                        {volumeInfo.averageRating
                          ? volumeInfo.averageRating
                          : "No Average Rating."}
                      </div>
                      <div className="Results-result_details_cell">
                        <h3>Author(s)</h3>
                      </div>
                      <div className="Results-result_details_cell">
                        {volumeInfo.authors
                          ? volumeInfo.authors.join(", ")
                          : "No Listed Authors."}
                      </div>
                      <div className="Results-result_details_cell">
                        <h3>Description</h3>
                      </div>
                      <div className="Results-result_details_cell">
                        {volumeInfo.description
                          ? volumeInfo.description
                          : "No Description."}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {this.props.entries && this.props.entries.length === 0 && (
          <div className="Results-no_results">No Results Found.</div>
        )}
      </div>
    );
  }
}

export default Results;
