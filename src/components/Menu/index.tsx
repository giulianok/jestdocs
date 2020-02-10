import React from 'react';
import { Link } from '@reach/router';
import { Input } from 'reactstrap';

import { useMenu } from 'store';

import styles from './index.module.scss';

const Search = ({ onSearch }: any) => {
  return (
    <div>
      <Input
        placeholder="Filter by file name"
        onChange={event => {
          onSearch(event.target.value);
        }}
      />
    </div>
  );
};

const Menu = () => {
  const originalData = useMenu();
  const [data, setData] = React.useState(originalData);

  const onSearch = (value: string) => {
    setData(originalData.filter(x => x.fileName.includes(value)));
  };

  return (
    <div className={styles.root}>
      <Link to="/" className={styles.logo}>
        JESTDocs
      </Link>

      <Search onSearch={onSearch} />

      <ul className={styles.results}>
        {Array.isArray(data) && data.length > 0 ? (
          data.map(({ fileName }) => {
            const key = `result-${fileName.replace(/\W/g, '')}`;
            return (
              <li key={key}>
                <Link to={`/test/${fileName}`}>{fileName}</Link>
              </li>
            );
          })
        ) : (
          <div>No tests found.</div>
        )}
      </ul>
    </div>
  );
};

export default Menu;
