import React from 'react';
import { Link } from '@reach/router';

import { useMenu } from 'store';

import styles from './index.module.scss';

const Menu = () => {
  const data = useMenu();

  console.log(data);

  return (
    <div className={styles.root}>
      <Link to="/" className={styles.logo}>
        JESTDocs
      </Link>
      <ul>
        {data.map(test => (
          <li key={test.fileName}>
            <Link to={`/test/${test.fileName}`}>{test.fileName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
