const fs = require("fs");
const path = require("path");

// 설정
const svgFolder = "./resources/img/component/icon";
// const projectFolder = "./resources/scss"; // 프로젝트 루트 폴더
const projectFolder = "./html"; // 프로젝트 루트 폴더
const outputFile = "./test/icon_references.json"; // 결과 파일

// 아이콘 파일 읽기
function getSvgFileNames(folderPath) {
  return fs.readdirSync(folderPath)
      .filter(file => path.extname(file) === ".svg")
      .map(file => path.basename(file, ".svg")); // 확장자 제거
}

// 프로젝트에서 아이콘 참조 검색
function searchReferences(svgFiles, folderPath) {
  const results = {};

  // 폴더 내 파일 재귀 탐색
  function recursiveSearch(directory) {
      const files = fs.readdirSync(directory);
      for (const file of files) {
          const fullPath = path.join(directory, file);

          if (fs.statSync(fullPath).isDirectory()) {
              recursiveSearch(fullPath); // 디렉터리인 경우 재귀 호출
          } else if (path.extname(file).match(/\.(js|jsx|ts|tsx|html|css|scss|json)$/)) {
              const fileContent = fs.readFileSync(fullPath, "utf8");

              // 아이콘 파일 참조 검사
              svgFiles.forEach(svgFile => {
                  const regex = new RegExp(`\\b${svgFile}\\b`, "g"); // 정확한 단어 매칭
                  if (regex.test(fileContent)) {
                      if (!results[svgFile]) results[svgFile] = [];
                      results[svgFile].push(fullPath);
                  }
              });
          }
      }
  }

  recursiveSearch(folderPath);
  return results;
}

// 결과 출력
function writeResultsToFile(results, outputFilePath) {
  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2), "utf8");
  console.log(`Results saved to ${outputFilePath}`);
}

// 실행
const svgFiles = getSvgFileNames(svgFolder);
const references = searchReferences(svgFiles, projectFolder);
writeResultsToFile(references, outputFile);

// node ./test/search.js