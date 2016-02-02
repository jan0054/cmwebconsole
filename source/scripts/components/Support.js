import React from 'react';

export default class Support extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  render () {
    const {
      actions: {logout}
    } = this.props;

    return (
      <div>
        <p>Your account does not have admin privilege. Please contact someone for support.</p>
        <button onClick = {logout}>Logout</button>
      </div>
    );
  }
}
