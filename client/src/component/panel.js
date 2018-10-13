import React, {Component} from "react";

class PanelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateIndex:null,
            value:''
        };
        this.handleCandidateChange = this.handleCandidateChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

    }
    handleCandidateChange(event){
        this.setState({candidateIndex: event.target.value});
    }
    handleValueChange(event){
        this.setState({value: event.target.value});
    }
    async handleSubmit(event){
        event.preventDefault();
        if(this.props.contract){
            try{
                if(!this.state.candidateIndex || !this.state.value){
                    throw new Error("please select candidate and input value");
                }
                await this.props.contract.voteTo.sendTransaction(this.state.candidateIndex,{value:this.state.value,from:this.props.selectedAddress});
            } catch (error) {
                alert(error.message)
            }
        }else{
            alert('Loading Web3, accounts, and contract...')
        }
    }
    render() {
        return <div className="panel">
            <form onSubmit={this.handleSubmit}>
                <p><label>Vote</label></p>
                {
                    this.props.candidates.map(
                        (candidate) => {
                            return <p key={candidate.name}>
                                <label>{candidate.name}</label>
                                <input name="candidate" type="radio" value={candidate.index} onChange={this.handleCandidateChange}/>
                            </p>
                        }
                    )
                }
                <p>
                    <input name="value" type="text" placeholder="wei" value={this.state.value} onChange={this.handleValueChange}/>
                </p>
                <p>
                    <input type="submit"/>
                </p>
            </form>
        </div>;
    }
}

export default PanelComponent;