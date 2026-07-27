export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'alpha-value-notation': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['theme'],
      },
    ],
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'custom-property-pattern': null,
    'import-notation': null,
    'property-no-vendor-prefix': null,
    'rule-empty-line-before': null,
  },
};
