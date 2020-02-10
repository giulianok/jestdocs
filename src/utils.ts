import deepmerge from 'deepmerge';

export default {
  withMetaData: function(cb: Function) {
    return function(_fileName: string, metaData: any) {
      (this as any).metaData = deepmerge((this as any).metaData, metaData);
      cb && cb();
    };
  }
};
