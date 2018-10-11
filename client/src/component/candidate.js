import React, { Component } from "react";
class CandidateComponent extends Component {
    render() {
        return <div className="candidate">
            <img src={this.props.imageSrc} alt={this.props.imageAlt}/>
            <p>{this.props.name}</p>
            <p>{this.props.percentage} %</p>
            <p>{this.props.votes} wei</p>
        </div>;
    }
}
export default CandidateComponent;