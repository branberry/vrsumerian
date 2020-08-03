import React from 'react';
import logo from './logo.svg';
import { SumerianScene, withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import Aws_exports from './aws-exports';
import './App.css';
import '@aws-amplify/ui/dist/style.css';
Amplify.configure(Aws_exports);

function App() {
  return (
  <div style={ { height: '100vh' } }>
    <SumerianScene sceneName='test'/>
  </div>
  );
}

export default withAuthenticator(App, true);
