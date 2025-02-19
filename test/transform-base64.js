const fs = require("fs");
const path = require("path");

// 폴더 경로
const svgFolder = "./resources/img/component/icon";
const outputFile = "./test/_variables_for_base64_icons.scss";

// 제외할 파일명을 배열로 관리
const excludePrefixes = ["head_logo", "foot_ico_sns", "ico_blog", "main_ico"];

// 파일을 Base64로 변환하는 함수
function convertToBase64(filePath) {
  const svgData = fs.readFileSync(filePath, { encoding: "utf8" });
  return Buffer.from(svgData).toString("base64");
}

// SVG 파일 탐색 및 SCSS 생성
function generateBase64Scss(folderPath, outputFilePath) {
  const files = fs.readdirSync(folderPath).filter(file => {
    const fileName = path.basename(file);
    // 제외 조건 검사
    const isExcluded = excludePrefixes.some(prefix => fileName.startsWith(prefix));
    return path.extname(file) === ".svg" && !isExcluded;
  });

  const scssVariables = files.map(file => {
    const fileNameWithoutExt = path.basename(file, ".svg");
    const base64Data = convertToBase64(path.join(folderPath, file));
    return `$b64_${fileNameWithoutExt}: "data:image/svg+xml;base64,${base64Data}";`;
  });

  const scssContent = `// base64\n${scssVariables.join("\n")}\n`;

  // SCSS 파일로 저장
  fs.writeFileSync(outputFilePath, scssContent, { encoding: "utf8" });
  console.log(`SCSS file generated at: ${outputFilePath}`);
}

// 실행
generateBase64Scss(svgFolder, outputFile);


// node ./test/transform-base64.js