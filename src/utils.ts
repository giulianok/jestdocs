import deepmerge from "deepmerge";

export default {
  withMetaData: function(fileName, metaData: any) {
    (this as any).metaData = deepmerge((this as any).metaData, metaData);
    console.log((this as any).metaData)
  }
};
