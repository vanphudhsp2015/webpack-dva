import React, { Component } from 'react';
import { MasterLayout } from 'layouts';
import { CommentComponent } from 'components';

class AboutPage extends Component {
  render() {
    return (
      <MasterLayout>
        <CommentComponent />
      </MasterLayout>
    );
  }
}

export default AboutPage;
