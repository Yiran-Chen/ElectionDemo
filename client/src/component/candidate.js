import React, {Component} from "react";

class CandidateComponent extends Component {
    state = {
        percentage: 0,
        votes: this.props.candidate.votes
    }

    async componentDidMount() {
        if (this.props.contract) {
            let votes = await this.props.contract.totalVotes.call(this.props.candidate.index);
            this.setState({votes:votes.valueOf()})
        }
    }
    render() {
        return <div className="candidate">
            <img src={this.props.candidate.picture} alt={this.props.imageAlt}/>
            <p>{this.props.candidate.name}</p>
            <p>{this.state.percentage} %</p>
            <p>{this.state.votes} wei</p>
        </div>;
    }
}

export default CandidateComponent;