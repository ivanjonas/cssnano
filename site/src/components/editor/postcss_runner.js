/* eslint-disable no-warning-comments */
/* eslint-disable no-unused-vars */
import postcss from 'postcss';
import { pkgnameToVarName } from '../../helper/naming';
import cssnanoPresetLite from 'cssnano-preset-lite';

/**
 * using moduleMaps and not with imports to lazy load them because of this error
 * editor lazy namespace object?f49d:5 Uncaught (in promise) Error: Cannot find module 'cssnano-preset-default'
    at eval (eval at ./src/components/editor lazy recursive
 * need to fix this
 */
const moduleMap = {
  cssnanoPresetLite,
/*  cssnanoPresetAdvanced: require('cssnano-preset-advanced'), */
//  cssnanoPresetDefault,
};

export default (input, config) => {
  console.log(config);
  const configName = pkgnameToVarName(config[0]);
  console.log(configName);
  const { plugins: nanoPlugins } = moduleMap[configName](config[1]);
  const postcssPlugins = [];
  for (const plugin of nanoPlugins) {
    const [processor, opts] = plugin;
    if (
        typeof opts === 'undefined' ||
        (typeof opts === 'object' && !opts.exclude) ||
        (typeof opts === 'boolean' && opts === true)
      ) {
        postcssPlugins.push(processor(opts));
    }
  }
  return new Promise((resolve, reject) => {
    postcss(postcssPlugins)
      .process(input)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
