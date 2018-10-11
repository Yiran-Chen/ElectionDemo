import React, {Component} from "react";

class PanelComponent extends Component {
    render() {
        return <div className="panel">
            <form>
                <p><label>Vote</label></p>
                {
                    this.props.candidates.map(
                        (candidate, index) => {
                            return <p>
                                <label>{candidate.name}</label>
                                <input name="candidate" type="radio" value={index}/>
                            </p>
                        }
                    )
                }
                <p>
                    <input name="value" type="text" placeholder="wei"/>
                </p>
                <p>
                    <input type="submit"/>
                </p>
            </form>
        </div>;
    }
}

export default PanelComponent;