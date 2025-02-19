/** 기본 figma json파일을 받아 실사용 가능한 json계층구조로 변환(1뎁스 참조 추가) **/
const fs = require("fs");
const path = require("path");

// JSON 파일 경로
const inputFilePath = path.join(__dirname, "../tokens/figma_token.json");
const outputFilePath = path.join(__dirname, "../tokens/transformed_tokens.json");

// JSON 파일 읽기
let jsonData = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));

// 전체 토큰 데이터 구조
let allTokens = {};

// value 변환 함수
function transformValue(value, allTokens) {
  if (typeof value === "string") {
    const pattern = /{([^}]+)}/g;
    return value.replace(pattern, (match, ref) => {
      const refPath = resolveReferencePath(ref, allTokens);
      if (refPath) {
        return `{${refPath}}`;
      }
      return match; // 참조 경로를 찾을 수 없으면 원래 값을 반환
    });
  }
  return value;
}

// 참조 경로를 해결하는 함수
function resolveReferencePath(ref, allTokens) {
  for (const tokenSet in allTokens) {
    if (findTokenInSet(ref, allTokens[tokenSet])) {
      return `${tokenSet}.${ref}`;
    }
  }
  return null;
}

// 특정 참조가 주어진 토큰 세트에 존재하는지 확인하는 함수
function findTokenInSet(reference, tokenData) {
  const keys = reference.split(".");
  let currentData = tokenData;
  for (const key of keys) {
    if (currentData[key]) {
      currentData = currentData[key];
    } else {
      return false;
    }
  }
  return true;
}

// "/valueSet" 제거 함수
function removeValueSet(key) {
  return key.replace("/value-set", "");
}

// 키 변환
function transformKey(key) {
  key = removeValueSet(key);
  return key.replace(/\s+/g, "-").replace(/\//g, "-").replace(/_/g, "-").replace(/%/g, "");
}

// JSON 데이터 변환
function transformJsonData(data, parentKey = "", allTokens = {}, visited = new Set()) {
  if (visited.has(data)) {
    return;
  }
  visited.add(data);

  for (const key in data) {
    // 첫 번째 키 변환
    const transformedKey = transformKey(key);
    const currentKey = parentKey ? `${parentKey}.${transformedKey}` : transformedKey;
    // const transformedKey = parentKey === '' ? transformKey(key) : key;
    // const currentKey = parentKey ? `${parentKey}.${key}` : key;

    if (data[key] && typeof data[key] === "object" && data[key] !== null && !Array.isArray(data[key])) {
      // 토큰 데이터 구조에 현재 키 추가
      if (!allTokens[parentKey]) {
        allTokens[parentKey] = {};
      }
      allTokens[parentKey][key] = data[key];

      // value 필드가 존재하고 문자열인 경우에만 변환
      if (data[key].value && typeof data[key].value === "string") {
        data[key].value = transformValue(data[key].value, allTokens);
      } else if (data[key].value && typeof data[key].value === "object") {
        data[key].value = null;
        data[key].type = null;
      }
      // 재귀적으로 하위 객체 처리
      transformJsonData(data[key], currentKey, allTokens, visited);
    }
    // 키 변환
    if (transformedKey !== key) {
      data[transformedKey] = data[key];
      delete data[key];
    }
  }
}

// JSON 데이터를 priorityKeys 순서로 정렬하는 함수(피그마 토큰 순서가 설정되지 않은 경우, 참조값을 상위에 오도록 설정)
function sortJsonData(data, priorityKeys) {
  const sortedData = {};

  // 우선순위에 따라 priorityKeys에 지정된 키들을 먼저 추가
  priorityKeys.forEach((key) => {
    if (data[key]) {
      sortedData[key] = data[key];
    }
  });

  // priorityKeys에 포함되지 않은 나머지 키들을 원래 순서대로 추가
  Object.keys(data).forEach((key) => {
    if (!priorityKeys.includes(key)) {
      sortedData[key] = data[key];
    }
  });

  // priorityKeys에 포함되지 않은 나머지 키들을 알파벳 순서대로 추가
  // Object.keys(data).sort().forEach((key) => {
  //   if (!priorityKeys.includes(key)) {
  //     sortedData[key] = data[key];
  //   }
  // });

  return sortedData;
}

// "$metadata"와 "$themes" 키 삭제 (토큰에서 키 이름이 변경되면 이 부분도 함께 수정 필요)
delete jsonData["$metadata"];
delete jsonData["$themes"];

// 우선순위 키 정의 (토큰에서 키 이름이 변경되면 이 부분도 함께 수정 필요)
// const priorityKeys = ["color/value-set", "typo/value-set", "number/value-set", "shape/value-set", "space/value-set"];
const priorityKeys = [];

// 정렬 실행 (변환 전)
jsonData = sortJsonData(jsonData, priorityKeys);

// 전체 토큰 데이터 구조 초기화
allTokens = {};

// 변환 실행 (정렬된 데이터 사용)
transformJsonData(jsonData, "", allTokens);

// 변환된 JSON 데이터 저장
fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2), "utf8");

console.log("변환 완료: transformed_tokens.json");