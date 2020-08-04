import React from 'react';
import logo from './logo.svg';
import {  withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import Aws_exports from './aws-exports';
import { XR } from 'aws-amplify';
import './App.css';
import '@aws-amplify/ui/dist/style.css';
Amplify.configure(Aws_exports);

function IndeterminateLoading() {
  return <img src={logo} className="App-logo" alt="logo"/>;
}

function LabelledInput({label, type, onChange}) {
  return (
      <label>
          {label}
          <input type={type} onChange={(event) => onChange(event.target.value)}/>
      </label>
  );
}
function ColorInput({label, onChange}) {
  return <LabelledInput label={label} type="color" onChange={onChange}/>;
}

function TextInput({label, onChange}) {
  return <LabelledInput label={label} type="text" onChange={onChange}/>
}

class SceneControls extends React.Component<any, any> {

  emit(channelName, value) {
      if (((this.props.sceneController || {}).sumerian || {}).SystemBus) {
          this.props.sceneController.sumerian.SystemBus.emit(channelName, value)
      }
  }
  updateSphereColor(value) {
    this.emit("updateSphereColor", value);
}
  updateSphereName(value) {
      this.emit("updateSphereName", value);
      
  }

  render() {
      return (
          <div>
              <TextInput label="Sphere name" onChange={(value) => this.updateSphereName(value)}/>
              <ColorInput label="Sphere color" onChange={(value) => this.updateSphereColor(value)}/>
          </div>
      );
  }
}

class SumerianScene extends React.Component<any,any> {

  async componentDidMount() {
      await this.loadAndStartScene();
  }

  render() {
      return <div
          id="sumerian-scene-dom-id"
          style={{width: "100%", height: "100%", position: "absolute"}}
      />;
  }

  async loadAndStartScene() {
      await XR.loadScene(this.props.scene, "sumerian-scene-dom-id");
      const controller = XR.getSceneController(this.props.scene);
      this.props.onLoaded(controller);
      XR.start(this.props.scene);
  }

}


class App extends React.Component<any, any> {

  constructor(props: any) {
      super(props);
      this.state = {
          loading: true,
          sceneController: null
      };
  }

  sceneLoaded(sceneController: any) {
      this.setState({
          loading: false,
          sceneController
      });
  }

  render() {
      return (
        <div className="App">
        {this.state.loading && <IndeterminateLoading/>}
        <div style={{visibility: this.state.loading ?'hidden' : 'visible'}}>
            <SceneControls sceneController={this.state.sceneController}/>
            <SumerianScene scene='test' onLoaded={(controller) => this.sceneLoaded(controller)}/>
        </div>
    </div>
      );
  }
}

export default withAuthenticator(App, true);
