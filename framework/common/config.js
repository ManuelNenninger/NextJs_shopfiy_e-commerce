const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

const ALLOWED_FW = ["shopify", "bigcommerce", "shopify_local"];
const FALLBACK_FW = "shopify";

function withFrameworkConfig(defaultConfig = {}) {
  let framework = defaultConfig?.framework?.name;

  if (!framework) {
    throw new Error(
      "The API Framework (e.g Shopify, ...) is missing. Please add one in next.config File."
    );
  }

  if (!ALLOWED_FW.includes(framework)) {
    throw new Error(
      `The api framework: ${framework} cannot be found, please use one of ${ALLOWED_FW.join(
        ", "
      )} in common/config`
    );
  }
  if (framework === "shopify_local") {
    framework = FALLBACK_FW;
  }
  const frameworkNextConfig = require(path.join(
    "../",
    framework,
    "next.config"
  ));
  const config = merge(defaultConfig, frameworkNextConfig);

  //Aendere je nach Framework den ausgewählte Path in tsconfig
  const tsPath = path.join(process.cwd(), "tsconfig.json");
  const tsConfig = require(tsPath);
  //Damit musst du nicht immer den Path händisch ändern in tsconfig.
  tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`];
  tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`];

  fs.writeFileSync(
    tsPath,
    prettier.format(JSON.stringify(tsConfig), { parser: "json" })
  );

  return config;
}

module.exports = { withFrameworkConfig };
