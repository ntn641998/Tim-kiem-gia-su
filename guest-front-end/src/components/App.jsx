import React, { useState, useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import history from '../history';
import Footer from './shared/Footer';
import NavBar from './shared/NavBar';
import Home from './Home/Home';
import Setting from './Setting/Setting';
import Alert from '../components/shared/Alert/Alert'
import '../css/App.scss';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/imports-first
import 'babel-polyfill';
import Authentication from '../modals/Authentication/Authentication';
import SetRoleModal from '../modals/SetRole/SetRole';
import { fetchUser } from '../actions/user';
import {User} from '../apis';
import { openSetRoleModal } from '../modals/SetRole/SetRoleAction';
import NoMatch from './NoMatch/NoMatch';
import Teachers from './Teachers/Teachers';
import TeacherInfo from './TeacherInfo/TeacherInfo';
import ProtectedRoute from './ProtectedRoute';
import {openAuthenticationModal} from '../modals/Authentication/AuthenticationAction';

const Root = (props) => {
  const { isSignedIn, fetchUser, openSetRoleModal, openAuthenticationModal } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(User, User.module)
    const fetchDataUser = async () => {
      try {
        setLoading(true);

        const user = await User.getInfo();
        fetchUser(user);

        setLoading(false);

        if (user.role === -1) {
          setTimeout(() => {
            openSetRoleModal();
          }, 2000)
        }
      } catch (err) {
        console.log('err', err);
        setLoading(false);
      }
    };
    fetchDataUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover

      />

      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cat" render={() => <Redirect to="/cat/all" />}></Route>
          <Route exact path="/cat/:category/:id">
            <Teachers />
          </Route>
          <Route exact path="/teacher/:id">
            <TeacherInfo />
          </Route>
          <Route exact path="/seach/">
            <Setting />
          </Route>

          <ProtectedRoute
            path="/setting"
            isAuthenticated={isSignedIn}
            triggerLogin={openAuthenticationModal}
            isLoading={loading}
            exact
            component={Setting}
          ></ProtectedRoute>

          <Route component={NoMatch} />
        </Switch>
        <Footer />

        <Authentication />
        <SetRoleModal />
        <Alert />
      </Router>
    </>

  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(
  mapStateToProps,
  {
    fetchUser,
    openSetRoleModal,
    openAuthenticationModal
  }
)(Root);