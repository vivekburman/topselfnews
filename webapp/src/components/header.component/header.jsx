import React from 'react';
import AccordianIconComponent from './functional.component/accordianIcon';
import SearchNLogoComponent from '../search.logo.component/search.logo';
import ProfileComponent from '../profile.component/profile';
import './header.component.scss'; 
import { Switch, Route, withRouter } from 'react-router-dom';
import PublishPreview  from '../publish.preview.component/publish.preview';
import Back from '../back.component/back';

const Header = () => {
  return (
    <header className="header-component">
      <Switch>
        <Route exact path={["/full-story", "/user-profile", "/new-story", "/payment-history-&-insights"]}>
          <Back />
        </Route>
        <Route exact path="/">
          <AccordianIconComponent />
        </Route>
      </Switch>
      <SearchNLogoComponent />
      <nav className="top-nav">
        <Switch>
          <Route exact path="/new-story">
            <PublishPreview />
          </Route>
        </Switch>
        <ProfileComponent />
      </nav>
    </header>
  );
}
export default withRouter(Header);