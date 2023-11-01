module.exports = {
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  rules: {
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false
      }
    ],
    'plugin/declaration-block-no-ignored-properties': true
  }
}
