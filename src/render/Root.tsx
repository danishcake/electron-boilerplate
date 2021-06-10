import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { CountPage } from './pages/CountPage';
import { SplashPage } from './pages/SplashPage';

interface Props {
  history: History
}

const Root: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route exact path='/count' component={CountPage}/>
          <Route component={SplashPage}/>
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export default hot(Root);
