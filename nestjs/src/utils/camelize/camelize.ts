import _ from 'lodash';

const isDate = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Date]';
};

const isRegex = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

const camelCase = (str: string) => {
  let l = '';

  if (str[0] === '_') {
    l = str[0];
    str = str.slice(1);
  }

  return (
    l +
    str.replace(/[_.-](\w|$)/g, (u, x) => {
      return x.toUpperCase();
    })
  );
};

const walk = (obj: any): any => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (isDate(obj) || isRegex(obj)) {
    return obj;
  }

  if (_.isArray(obj)) {
    return _.map(obj, walk);
  }

  return _.reduce(
    _.keys(obj),
    (acc: any, key: any) => {
      const camel = camelCase(key);

      acc[camel] = walk(obj[key]);

      return acc;
    },
    {} as any,
  );
};

const camelize = (obj: any) => {
  if (typeof obj === 'string') {
    return camelCase(obj);
  }

  return walk(obj);
};

export default camelize;
