import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Splash page. Displays navigation links
 */
export const SplashPage: React.FunctionComponent = () => {
  return (<>
      <h1>Welcome to click counter</h1>
      <Link to='/count'>Take me to the click counter</Link>
    </>);
};
