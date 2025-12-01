import naverpay from "@naverpay/eslint-config";

export default [
  {
    ignores: ["**/dist/**"],
  },
  ...naverpay.configs.node,
  ...naverpay.configs.typescript,
  ...naverpay.configs.react,
  ...naverpay.configs.packageJson,
];
