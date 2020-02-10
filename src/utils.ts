import deepmerge from 'deepmerge';

export default {
  withMetaData: function(cb: Function) {
    return function(metaData: any) {
      (this as any).metaData = deepmerge((this as any).metaData, metaData);
      cb && cb();
    };
  }
};
