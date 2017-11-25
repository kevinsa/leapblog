import React from 'react';
import './Root.css';
import {TopNav} from '../../components/TopNav';

export class Root extends React.Component {
  render() {
    return(
      <div>
        <TopNav />
        <div className="root-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}