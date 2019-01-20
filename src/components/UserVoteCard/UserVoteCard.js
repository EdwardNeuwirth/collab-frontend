import React, { Component } from 'react';
import './UserVoteCard.css';
import PropTypes from 'prop-types';

class UserVoteCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      voted: false
    };
  }

  handleClick = (vote) => {
    this.props.handleVoteOperation(this.props.operation.operation_id, this.props.operation.publicKey, vote);
    console.log('Accept handleClick public key ', this.props.operation.publicKey);
    console.log('Vote, ', vote);
    this.setState({voted:true});
  }

  render() {
    return this.props.operation
      ? <div className="voteCard" key={this.props.operation.operation_id}>
        {(this.props.operation.amount) ? <h3>WITHDRAWAL</h3>:<h3>ADD COLLABORATOR</h3>}
        {(this.props.operation.amount) ? <p className ="amount">Amount: {this.props.operation.amount}</p>:<p>New User: {this.props.operation.user_to_act}</p>}
        <p className ="message">{this.props.operation.message}</p>
        {this.state.voted
          ? <h3>Vote registered!</h3>
          : <div>
            <button onClick={() => this.handleClick(1)} className="vote1">Accept</button>
            <button onClick={() => this.handleClick(2)} className="vote2">Decline</button>
          </div>
        }
      </div>
      : null;
  }
}

UserVoteCard.propTypes = {
  operation: PropTypes.object.isRequired,
  handleVoteOperation: PropTypes.func.isRequired
};


export default UserVoteCard;
