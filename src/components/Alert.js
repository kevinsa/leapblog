import React from 'react';

export class Alert extends React.Component {
   render() {
    return (
      <div className={this.props.alertStyle}>
        {this.props.message}
      </div>
    );
   }
}