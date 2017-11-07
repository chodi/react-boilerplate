/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import Content from 'containers/Content';
import Home from 'pages/Home';
import Settings from 'pages/Settings';
import TODO from 'pages/TODO';
import Sidebar from 'containers/Sidebar';

const ContentWrapper = styled.div`
  max-width: calc(100% - 100px);
  min-height: 100%;
  height: inherit;
  width: 100%;
  flex-grow: 1;
`;
const AppWrapper = styled.div`
  max-width: 100%;
  height: 100vh;
  min-height: 100%;
  display: flex !important;
  flex-direction: row;
`;

export default function App() {
  return (
    <AppWrapper>
      <Sidebar />
      <ContentWrapper>
        <Content>
          <Switch>
            <Route path="/mytodos" component={TODO} />
            <Route path="/settings" component={Settings} />
            <Route path="/dashboard" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </Content>
      </ContentWrapper>
    </AppWrapper>
  );
}
