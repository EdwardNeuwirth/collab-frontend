//imports
import React, { Component } from 'react';
import './userProfile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectedWallet from '../../containers/selectedWallet';
import { Layout, Menu, Spin } from 'antd';
import {API} from '../../store/middlewares/apiService';
import CreateWallet from '../createWallet';
import CreateWalletView from '../CreateWalletView';
import { Redirect } from 'react-router';

const { Sider } = Layout;


//users profile component, create a link to a creation of new wallet and its redirect, append all existing wallets of user
class UserProfile extends Component {
  constructor (props) {
    super(props);
    this.props.fetchPendingOperations();
    this.getWallets();
    this.state = {
      view: 'addWalletView',
      form: false,
    };
  }

  getWallets = () => {
    this.props.fetchGetWallets();
  }

  handleOnClick = (e) => {
    this.setState({
      view:e
    });
  }

  handleAddWallet = () => {
    this.setState({
      form: true,
      view: 'addWalletView'
    });
  }

  renderSideWalletAlias = (alias) => {
    return alias.length > 15
      ? alias.slice(0,15) + '...'
      : alias;
  }

  renderSideWallets = () => {
    if(this.props.renderWallets.wallets && this.props.renderWallets.wallets.length) {
      return this.props.renderWallets.wallets.map(e => {
        return (
          <Menu.Item key={e.publickey} >
            <a onClick={() => this.handleOnClick(e)}>
              <div className='userprofile-menuitem'>
                <p >{this.renderSideWalletAlias(e.alias)}</p>
                <p>{(e.balance/100000000).toFixed(4)}</p>
              </div>
            </a>
          </Menu.Item>
        );
      });
    } else {
      return <Spin  className='userprofile-spinner'/>;
    }
  }

  renderMainWallet = () => {
    if(this.state.view==='addWalletView') return (
      <CreateWalletView handleOnClick={this.handleAddWallet}
        form={this.state.form} />);
    return <SelectedWallet wallet={this.state.view}></SelectedWallet>;
  }

  renderCreateWallet = () => {
    if(this.state.form===false) return;
    return <CreateWallet/>;
  }



  render() {
    if (!this.props.userLogged.username) return <Redirect to='/' />;
    return (
      <div className ='userprofile-father'>
        <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              {this.renderSideWallets()}
              <button onClick={() => this.handleAddWallet()} primary="true"
                className='addwallet' theme="dark">Add Wallet</button>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            {this.renderMainWallet()}
          </Layout>
        </Layout>
      </div>
    );
  }
}


UserProfile.propTypes = {
  userLogged: PropTypes.object.isRequired,
  renderWallets: PropTypes.object.isRequired,
  getWallets: PropTypes.object.isRequired,
  fetchGetWallets: PropTypes.func.isRequired,
  fetchPendingOperations:PropTypes.func.isRequired
};



const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets,
  operations:state.operations
});

const mapDispatchToProps = (dispatch) => ({
  fetchGetWallets: () => dispatch({
    type: 'FETCH_GET_WALLETS',
    [API]: {
      path: '/wallet'
    }
  }),
  fetchPendingOperations: () => dispatch({
    type: 'FETCH_ALL_PENDING_OPERATIONS',
    [API]: {
      path: '/operations/pending'
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
