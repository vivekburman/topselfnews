import React from 'react';
import bell from '../../images/bell.svg';
import user from '../../images/user.svg';
import Notification from '../notification.component/notification.card';
import {showNotification, hideNotification} from '../../reducers/click/notification.action';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import './profile.component.scss';
import ProfileDropDown from '../profile.dropdown.component/profile.dropdown';
import {showProfileDropDown, hideProfileDropDown} from '../../reducers/click/profile.dropdown.action';
import {showLogin, hideLogin} from '../../reducers/click/login.action';
import Login from '../login.component/login';

const ProfileComponent = ({currentUser, isProfileDropDownOpen, showNotification, isNotificationDropDownOpen,
  hideNotification, hideProfileDropDown, showProfileDropDown, hideLogin, showLogin, isLoginPageOpen}) => {
  return (
    <>
      { currentUser ?
			<ul>
			  <Switch>
			    <Route exact path={['/full-story', '/user-profile', '/opinions', '/', '/payment-history-&-insights']}>
			      <li className="notification-icon-wrapper outline-none">
			        <img src={ bell } alt="notifications" className="icon-img outline-none"
			          onClick={() => isNotificationDropDownOpen ? hideNotification() : showNotification()} />
			        <Notification hideFunc={hideNotification} isOpen={isNotificationDropDownOpen}/>
			      </li>
			    </Route>
			  </Switch>
			  <li className="profile-wrapper">
			    <img src={ user } alt="user" className="icon-img outline-none"
			      tabIndex={0}
			      onClick={ () => {
						isProfileDropDownOpen ? hideProfileDropDown() : showProfileDropDown();
			      }} />
			    <ProfileDropDown hideFunc={hideProfileDropDown} isOpen={isProfileDropDownOpen} />
			  </li>
			</ul> :
			<div>
				 <span className="sign-in-btn" onClick={ () => isLoginPageOpen ? hideLogin() : showLogin() }>Sign in</span>
			  { isLoginPageOpen && <div className="login-container">
			    <Login hideFunc={hideLogin} isOpen={isLoginPageOpen}/>
			  </div>}
			</div>
      }
    </>
  );
};
const mapDispatchStateToProps = (dispatch) => ({
  showNotification: () => dispatch(showNotification()),
  hideNotification: () => dispatch(hideNotification()),
  showProfileDropDown: () => dispatch(showProfileDropDown()),
  hideProfileDropDown: () => dispatch(hideProfileDropDown()),
  showLogin: () => dispatch(showLogin()),
  hideLogin: () => dispatch(hideLogin()),
});
const mapStateToProps = ({notification, profileDropDown, loginModal}) => ({
  isNotificationDropDownOpen: notification.isOpen,
  isProfileDropDownOpen: profileDropDown.isOpen,
  isLoginPageOpen: loginModal.isOpen,
});
export default connect(mapStateToProps, mapDispatchStateToProps)(ProfileComponent);
