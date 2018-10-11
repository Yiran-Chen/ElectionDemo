import React, {Component} from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import Candidate from "./model/candidate"
import CandidateComponent from "./component/candidate"
import PanelComponent from "./component/panel"

import "./App.css";

class App extends Component {
    state = {
        web3: null,
        accounts: null,
        contract: null,
        candidates:[
            new Candidate('Donald Trump',"./images/Trump.jpeg",0),
            new Candidate('Hillary Clinton',"./images/Hillary.jpg",0)
        ]
    };
    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const Contract = truffleContract(ElectionContract);
            Contract.setProvider(web3.currentProvider);
            const instance = await Contract.deployed();

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({web3, accounts, contract: instance});
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
        }
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App">
                <div className="container">
                    <CandidateComponent
                        name={this.state.candidates[0].name}
                        imageSrc={this.state.candidates[0].picture}
                        imageAlt={this.state.candidates[0].name}
                        percentage={0}
                        votes={this.state.candidates[0].votes}
                    ></CandidateComponent>
                    <PanelComponent candidates={this.state.candidates}></PanelComponent>
                    <CandidateComponent
                        name={this.state.candidates[1].name}
                        imageSrc={this.state.candidates[1].picture}
                        imageAlt={this.state.candidates[1].name}
                        percentage={0}
                        votes={this.state.candidates[1].votes}
                    ></CandidateComponent>
                </div>
            </div>
        );
    }
}

export default App;
