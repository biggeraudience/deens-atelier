module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'no-descending-specificity': null,
    'block-no-empty': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [true, {
      ignoreAtRules: ['include', 'mixin', 'each', 'if', 'else', 'for', 'function', 'return', 'content']
    }]
  }
};
