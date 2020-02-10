import '@testing-library/jest-dom/extend-expect';
import fs from 'fs';
import path from 'path';
import utils from '../src/utils';

const jestTest = (global as any).test;
let collection = [];

const TEMP_REPORT_PATH = path.resolve(__dirname, '../.tmpReport');

if (!fs.existsSync(TEMP_REPORT_PATH)) {
  fs.mkdirSync(TEMP_REPORT_PATH);
}

let currentIndex = 0;
if (!fs.existsSync(`${TEMP_REPORT_PATH}/state.txt`)) {
  fs.writeFileSync(`${TEMP_REPORT_PATH}/state.txt`, currentIndex);
} else {
  currentIndex =
    parseInt(fs.readFileSync(`${TEMP_REPORT_PATH}/state.txt`, 'utf-8'), 10) + 1;
  fs.writeFileSync(`${TEMP_REPORT_PATH}/state.txt`, currentIndex);
}

const updateReport = (data: any) => {
  let oldData = [];
  if (!fs.existsSync(`${TEMP_REPORT_PATH}/${currentIndex}.json`)) {
    fs.writeFileSync(`${TEMP_REPORT_PATH}/${currentIndex}.json`, `[]`);
  } else {
    oldData = JSON.parse(
      fs.readFileSync(`${TEMP_REPORT_PATH}/${currentIndex}.json`, 'utf-8')
    );
  }

  fs.writeFileSync(
    `${TEMP_REPORT_PATH}/${currentIndex}.json`,
    JSON.stringify([...oldData, data])
  );
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

    updateReport(test);

    return test;
  };
  (global as any).test = newTest;
} else {
  console.error('Jest "test" not found');
}
