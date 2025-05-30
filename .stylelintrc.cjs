module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'selector-class-pattern': null, // Disable class pattern check for BEM or custom naming
    'scss/dollar-variable-pattern': null, // Disable variable pattern check
    'no-descending-specificity': null, // Often relaxed for SCSS structure
    'block-no-empty': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [true, {
      ignoreAtRules: ['include', 'mixin', 'each', 'if', 'else', 'for', 'function', 'return', 'content']
    }]
  }
};
