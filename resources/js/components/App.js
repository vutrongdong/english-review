import { Provider, useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';
import * as actionCommon from '@/actions/commons';
import Sidebar from '@/components/layout/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from "history";
import * as actionAuth from '@/actions/auth';
import React, { useEffect } from 'react';
import configureStore from '@/store';
import RouterView from '@/router/app';
import ReactDOM from 'react-dom';

const App = () => {
  const dispatch = useDispatch();
  const hist = createBrowserHistory();
  const loading = useSelector(state => state.commons.loading);

  useEffect(() => {
    const auth = window.$auth;
    if (auth) {
      dispatch(actionAuth.setAuthentication(auth))
      dispatch(actionCommon.getCities())
    }
  }, [])

  return (
    <BrowserRouter>
      <LoadingOverlay
        active={loading}
        spinner={<SyncLoader thickness={180} speed={180} color="rgba(86, 172, 57, 1)" />}
      >
        <div className="App">
          <Navbar />
          <Sidebar />
          <RouterView history={hist} />
          <ToastContainer autoClose={2000} />
          <Footer />
        </div>
      </LoadingOverlay>
    </BrowserRouter>
  )
}

if (document.getElementById('app')) {
  const store = configureStore();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}
