import React from 'react';

import { Router } from '@reach/router';

import Layout from 'components/Layout';
import Home from 'pages/Home';
import TestDetails from 'pages/TestDetails';

import { StoreProvider } from 'store';

const App = () => {
  return (
    <Layout>
      <StoreProvider>
        <Router>
          <Home path="/" />
          <TestDetails path="/test/:slug" />
        </Router>
      </StoreProvider>
    </Layout>
  );
};

export default App;
