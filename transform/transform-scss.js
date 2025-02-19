/** json파일을 css variable로 변경하여 css type으로 저장 **/

const StyleDictionary = require("style-dictionary");

function formatDate(date) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
}

// preset
const preset = `
@charset "utf-8";

/* Do not edit directly */
/* Generated on ${formatDate(new Date())} */


`;

// transformName
function transformName(prop, suffix) {
	const path = prop.name.split("-").slice(1).join("-");
  return suffix ? `${suffix}-${path}` : path;
}

// transformVariable
function transformVariable(reference) {
  const cleanedReference = reference.replace(/\{|\}/g, "").replace(/\./g, "-").replace(/\s+/g, "-").replace(/\//g, "-");
  const trimReference = cleanedReference.split("-").slice(1).join("-");
  return trimReference;
}

// SCSS 포맷 정의
/*StyleDictionary.registerFormat({
  name: "custom/scss-format",
  formatter: function (dictionary) {
    const scssContent = dictionary.allProperties
      .map((prop) => {
        let name = transformName(prop, "krds");
        let value = prop.original && prop.original.value ? prop.original.value : prop.value;
        if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
          value = `$krds-${transformVariable(value)}`;
        }
        return `$${name}: ${value};`;
      })
      .join("\n");
    return preset + scssContent;
  },
});*/

// CSS 포맷 정의
StyleDictionary.registerFormat({
  name: "custom/css-format",
  formatter: function (dictionary) {
    let cssContent = preset + ":root {\n";

    let currentCategory = "";

    dictionary.allProperties.forEach((prop) => {
      let name = transformName(prop, "krds");
      let value = prop.original && prop.original.value ? prop.original.value : prop.value;
      if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
        value = `var(--krds-${transformVariable(value)})`;
      }

      if (prop.attributes.category !== currentCategory) {
        currentCategory = prop.attributes.category;
        cssContent += `\n  /* ${currentCategory.toUpperCase()} */\n`;
      }

      cssContent += `  --${name}: ${value};\n`;
    });

    cssContent += "\n}\n";
    return cssContent;
  },
});

// export
module.exports = {
  source: ["./tokens/transformed_tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "./resources/css/token/",
      files: [
        {
          destination: "krds_tokens.css",
          format: "custom/css-format",
        },
      ],
    },
  },
};
