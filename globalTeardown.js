const fs = require('fs');
const path = require('path');
const glob = require('glob');

// const TEST_PATHS = glob.sync(`src/fakeTests/**/*.spec.ts`);
const TEMP_REPORT_PATH = path.resolve(__dirname, '.tmpReport');
const TEST_PATHS = [
  'src/fakeTests/something.spec.ts',
  'src/fakeTests/multiply.spec.ts',
  'src/fakeTests/add.spec.ts'
].filter(x => path.resolve(__dirname, x));

module.exports = () => {
  const output = TEST_PATHS.reduce((arr, p, index) => {
    if (!fs.existsSync(`${TEMP_REPORT_PATH}/${index}.json`)) {
      return arr;
    }

    const tests = require(`${TEMP_REPORT_PATH}/${index}.json`);
    const parts = p.split('/');
    const fileName = parts[parts.length - 1];

    return [
      ...arr,
      {
        fileName,
        filePath: p,
        tests
      }
    ];
  }, []);

  fs.writeFileSync(
    path.resolve(__dirname, 'src/data/output.json'),
    JSON.stringify(output)
  );
};
