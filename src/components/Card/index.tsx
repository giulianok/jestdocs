import React from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

interface Props {
  title: string;
  children: () => any;
  defaultState?: boolean;
}

const Card = ({ title, children, defaultState }: Props) => {
  const [isOpen, setIsOpen] = React.useState(defaultState);

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

Card.defaultProps = {
  defaultState: true
};

export default Card;
