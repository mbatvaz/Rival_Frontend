export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**', 'design-export/**'],
  rules: {
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['layer', 'property', 'container'] }],
    'declaration-no-important': true,
    'color-named': 'never'
  }
};
