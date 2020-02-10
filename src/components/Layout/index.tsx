import React from 'react';

import Menu from 'components/Menu';

import styles from './index.module.scss';

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.root}>
      <Menu />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
