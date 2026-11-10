export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**', 'design-export/**'],
  rules: {
    'custom-property-pattern': null,
    'declaration-block-single-line-max-declarations': 3,
    'media-feature-range-notation': 'prefix',
    'selector-class-pattern': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['layer', 'property', 'container'] }],
    'declaration-no-important': true,
    'color-named': 'never'
  },
  overrides: [{
    files: ['src/wwwroot/css/00-tokens/*.css'],
    rules: {
      'color-hex-length': null,
      'color-function-alias-notation': null,
      'color-function-notation': null,
      'alpha-value-notation': null
    }
  }]
};
