import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import syntaxStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/agate';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babylon';
import { Alert, Badge } from 'reactstrap';

import { useTestDetails } from 'store';
import Card from 'components/Card';

import styles from './index.module.scss';

interface TestsProps {
  tests: {
    description: string;
    code: string;
    metadata?: {
      tags?: string[];
    };
  }[];
}

const Tests = ({ tests }: TestsProps) => {
  return (
    <ul className={styles.testsList}>
      {tests.map(({ description, code, metadata }) => (
        <li className={styles.testsItem}>
          <Card title={description}>
            {() => {
              // const formatted = prettier.format(code, { plugins: [parser] });
              const formatted = code;
              const tags = (metadata && metadata.tags) || [];

              return (
                <div>
                  <SyntaxHighlighter
                    language="javascript"
                    style={syntaxStyle}
                    showLineNumbers
                  >
                    {formatted}
                  </SyntaxHighlighter>

                  <ul className={styles.tagsList}>
                    {tags.map(tag => (
                      <li key={tag} className={styles.tagsItem}>
                        <Badge color="info">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }}
          </Card>
        </li>
      ))}
    </ul>
  );
};

interface Props {
  path: string;
  slug?: string;
}

const TestDetails = ({ slug }: Props) => {
  const data = useTestDetails(slug || '');

  if (!data) {
    return <Alert color="danger">Test "{slug}" not found!</Alert>;
  }

  const { tests } = data;

  return (
    <div>
      <h5>
        <strong>{slug}</strong>
      </h5>

      <hr />

      {Array.isArray(tests) && tests.length ? (
        <Tests tests={tests} />
      ) : (
        <Alert color="warning">No tests found!</Alert>
      )}
    </div>
  );
};

export default TestDetails;
