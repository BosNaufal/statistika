
import React from 'react';

import '../../sass/main.sass'

class App extends React.Component {

  render() {

    let { children } = this.props

    return (
      <div>
        { children }
      </div>
    );
  }

}

export default App;
