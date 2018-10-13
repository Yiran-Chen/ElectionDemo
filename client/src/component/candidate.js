import React, {Component} from "react";

class CandidateComponent extends Component {
    state = {
        percentage: 0,
        votes: this.props.candidate.votes
    }

     componentDidMount() {
        if (this.props.contract) {
            this.updateVotes();
            this.props.contract.NewVote().watch((err,response)=>{
                this.updateVotes();
            })
        }
    }

    async updateVotes(){
        try {
            const votes = await this.props.contract.totalVotes.call(this.props.candidate.index);
            const votesAmount = await this.props.contract.votesAmount.call();
            let percentage = 0;
            if(!votesAmount.isZero()){
                percentage = votes.dividedBy(votesAmount).times(100).toFixed(5)
            }
            this.setState({votes:votes.valueOf(),percentage:percentage})
        }catch (e) {
            alert(e)
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