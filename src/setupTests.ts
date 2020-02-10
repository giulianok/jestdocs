import '@testing-library/jest-dom/extend-expect';
import union from "lodash.union"
import deepmerge from "deepmerge";

const glob = require("glob");
const jestTest = (global as any).test;
let collection = {};
let graph = {};

const getFilePath = (fileName) => {
  let files = glob.sync(`**/${fileName}*.spec.ts`);
}

if (jestTest != null) {
  const newTest = (description: string, cb: Function, data: any = {
    metadata: {}
  }) => {
    jestTest(description, cb);
    const fileName = data?.metaData?.fileName || "global";
    if(!collection[fileName]) {
      collection[fileName] = data;
      collection[fileName].tests = [];
      collection[fileName].metadata = {
        ...(collection[fileName].metadata || {}),
        filePath: getFilePath(fileName)
      };
    } else {
      collection[fileName].metaData = deepmerge(collection[fileName].metaData, data.metaData);
    }
    collection[fileName].tests.push({
      type: "test",
      code: cb.toString(),
      metadata: data.metaData
    });
  };
  (global as any).test = newTest;
} else {
  console.error('Jest "test" not found');
}