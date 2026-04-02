import storybook from "eslint-plugin-storybook";

import base from "../../eslint.config.mjs";

export default [
  ...base,
  {
    ignores: ["node_modules", "dist"],
  },
  ...storybook.configs["flat/recommended"],
];
