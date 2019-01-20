import React, { Component } from 'react';
import { connect } from 'react-redux';
import {API} from '../../store/middlewares/apiService';
import PropTypes from 'prop-types';
import './createWallet.css';


class CreateWallet extends Component {
  constructor (props) {
    super (props);
    this.state = {
      alias: '',
      user: null,
      users: [],
      created: false
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    const data = {
      alias: this.state.alias,
      users: this.state.users
    };
    console.log('THIS IS THE DATA IN createWallet.js', data);
    this.props.fetchCreateWallet(data);
    this.setState({created:true});
    setTimeout(()=> window.location.reload(), 1200);
  }

  captureUser = e => {
    this.setState({
      user: e.target.value
    });
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  pushUser = () => {
    this.setState({
      users: [...this.state.users, this.state.user]
    });
  }

  deleteUser = (userToDelete) => {
    this.setState({
      users: this.state.users.filter(user => user !== userToDelete)
    });
  }

  render () {
    return (
      <div className="createWallet">
        {this.state.created
          ? <h1>Wallet Created</h1>
          : <form  autoComplete= 'off' className="createWallet_form" onSubmit={this.handleOnSubmit}>
            <input
              name="alias"
              type="text"
              value={this.state.alias}
              className="createWallet_form_input-name"
              placeholder="Name of the wallet to create"
              size="30"
              onChange={this.captureInput}
              required
            />
            <div className="createWallet_form_wallet-addUser">
              <input
                name="users"
                type="text"
                placeholder="Add username to the wallet"
                className="createWallet_form_input-user"
                onChange={this.captureUser}
              />
              <button
                className="createWallet_form_input-button-addUser"
                type="button"
                onClick={this.pushUser}>
              Add User
              </button>
            </div>
            <input
              type='submit'
              value='Create Wallet'
              className="createWallet_form_wallet-createwalletbutton"
            />
            {this.state.alias
              ? <div className="createWallet_form_wallet-walletname">
                <p className='cw_form_walletname'>{`WALLET NAME  | ${this.state.alias}`}</p>
              </div>
              : null
            }
            <div>
              <ul
                className='createwallet-users-ul'
              >
                {this.state.users.length > 0
                  ? this.state.users.map(user => {
                    return <div className='createwallet-users'key={user}>
                      <li
                        className='createwallet-users-name'>
                        {user}
                      </li>
                      <button
                        onClick={() => this.deleteUser(user)}
                        className='createwallet-users-delete'>
                      ❌
                      </button>
                    </div>;})
                  : null
                }
              </ul>
            </div>
          </form>
        }
      </div>
    );
  }
}

CreateWallet.propTypes = {
  fetchCreateWallet: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  fetchCreateWallet: (data) => {
    console.log('initMapDispatchToProps: fetchCreateWallet DATA', data);
    dispatch({
      type: 'FETCH_CREATE_WALLET',
      [API]: {
        path: '/wallet',
        method: 'POST',
        body: data
      }
    });

  }
});

export default connect(null, mapDispatchToProps)(CreateWallet);
