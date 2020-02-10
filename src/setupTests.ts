import "@testing-library/jest-dom/extend-expect";
import utils from "../src/utils";

const glob = require("glob");
const jestTest = (global as any).test;
let collection = [];
let graph = {};

const getFilePath = (fileName) => {
  return glob.sync(`**/${fileName}*.spec.ts`)[0];
}

if (jestTest != null) {
  const newTest = (description: string, cb: Function, fileName: any = "") => {
    jestTest(description, cb);
    let test = {
      metaData: {
        tags: [],
        fileName: fileName,
        filePath: getFilePath(fileName)
      },
      code: cb.toString(),
      type: "test",
      withMetaData: utils.withMetaData(() => { 
        console.log(collection)
      })
    };
    collection.push(test);
    return test;
  };
  (global as any).test = newTest;
} else {
  console.error('Jest "test" not found');
}
