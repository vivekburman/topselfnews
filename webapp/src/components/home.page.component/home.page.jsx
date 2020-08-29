import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header.component/header';
import Main from '../main.component/main';
import updateWindowSize from '../../reducers/window/resize.action';
import '../../mainSass/index.scss';
import './home.page.component.scss';
import { Switch, Route } from 'react-router';
import loadable from '@loadable/component';
import { setCurrentUser } from '../../reducers/user/user.action';
import axios from 'axios';

const OauthCallback = loadable(() => import('../loadable.component/loadableOauthCallback'));
const silentRefresh = (setCurrentUser) => {
    axios.post("/api/auth/refresh-token")
    .then(({status, data}) => {
        if(status == 200 && data.success) {
          setCurrentUser({
            name: data.username,
            profilePicUrl: data.profilePicUrl,
            token: data.access_token
          });
        }
    }).catch(err => {
      console.error(err);
    });
}
class HomePage extends Component {
    constructor() {
        super();
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowSize);
        silentRefresh(this.props.setCurrentUser);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowSize);
    }
    updateWindowSize() {
        this.props.updateWindowSize(window.innerWidth);
    }
    render () {
        return (
            <Switch>
                <Route exact path="/oauth_callback">
                    <OauthCallback />
                </Route>
                <Route>
                    <div className="homepage">
                        <Header />
                        <Main />
                    </div>
                </Route>
            </Switch>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateWindowSize: (size) => dispatch(updateWindowSize(size)),
    setCurrentUser: (payload) => dispatch(setCurrentUser(payload))
});
export default connect(null, mapDispatchToProps)(HomePage);