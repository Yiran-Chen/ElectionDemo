pragma solidity ^0.4.24;

contract Election {
    enum Candidates {DonaldJohnTrump,HillaryDianeRodhamClinton}
    mapping(uint8 => uint) public vote;
    event NewVote(
        uint8 indexed _to,
        uint indexed _vote
    );

    constructor() public {
        vote[uint8(Candidates.DonaldJohnTrump)] = 0;
        vote[uint8(Candidates.HillaryDianeRodhamClinton)] = 0;
    }

    modifier toCandidate(uint8 _to) {
        require(
            _to == uint8(Candidates.DonaldJohnTrump) || _to == uint8(Candidates.HillaryDianeRodhamClinton),
            "this is a invalid candidate"
        );
        _;
    }

    function voteTo(uint8 _to) public payable toCandidate(_to){
        require(msg.value >0,'must send ether for voting');
        vote[_to] += msg.value;
        emit NewVote(_to,msg.value);
    }
}