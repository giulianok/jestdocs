import '@testing-library/jest-dom/extend-expect';
import utils from '../src/utils';

const glob = require('glob');
const jestTest = (global as any).test;
let collection = [];

const getFilePath = (fileName: string) => {
  return glob.sync(`**/${fileName}*.spec.ts`)[0];
};

if (jestTest != null) {
  const newTest = (description: string, cb: Function) => {
    jestTest(description, cb);

    let test = {
      // fileName: fileName,
      // filePath: getFilePath(fileName),
      description,
      type: 'test',
      code: cb.toString(),
      metaData: {
        tags: []
      },
      withMetaData: utils.withMetaData(() => {
        // console.log(JSON.stringify(collection, null, 2));
      })
    };

    collection.push(test);

    return test;
  };
  (global as any).test = newTest;
} else {
  console.error('Jest "test" not found');
}
