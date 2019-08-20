import React, { Component } from 'react';
import HeaderLayout from '../header/HeaderLayout';
import FooterLayout from '../footer/FooterLayout';
import SideBarLayout from '../sidebar/SideBarLayout';
import styles from './master.scss';

class MasterLayout extends Component {
  render() {
    return (
      <div className="wrapper">
        <HeaderLayout />
        <div className={styles.main}>
          <SideBarLayout />
          <div className={styles.appContent}>
            {this.props.children}
          </div>
        </div>
        <FooterLayout />
      </div>
    );
  }
}

export default MasterLayout;
