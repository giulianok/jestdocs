import React from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

interface Props {
  title: string;
  children: () => any;
}

const Card = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className={styles.root}>
      <button
        className={classnames(styles.button, {
          [styles.buttonActive]: isOpen
        })}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <strong className={styles.title}>{title}</strong>
      </button>
      {isOpen && <div className={styles.content}>{children()}</div>}
    </div>
  );
};

export default Card;
