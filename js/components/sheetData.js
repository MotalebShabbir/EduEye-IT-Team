// ===============
// Feacth Data from Google Sheets
// ===============

// Data store library
let sheetDataPromise = null;

// Assign sheet Urls to variables
const usrUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSPfSga7eEoZL5zqAnteAkj_VOK3qBjpii-YGnabvHickUPJuqPLTlL-hU_gc61NDdNzkPzK6muMuj/pub?gid=0&single=true&output=csv";
const pointHistoryUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSPfSga7eEoZL5zqAnteAkj_VOK3qBjpii-YGnabvHickUPJuqPLTlL-hU_gc61NDdNzkPzK6muMuj/pub?gid=658567342&single=true&output=csv";
const taskUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSPfSga7eEoZL5zqAnteAkj_VOK3qBjpii-YGnabvHickUPJuqPLTlL-hU_gc61NDdNzkPzK6muMuj/pub?gid=1172065078&single=true&output=csv";

// Function to fetch and parse CSV data
function fetchData(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => resolve(result.data),
      error: (error) => reject(error),
    });
  });
}

// Load all data from sheets
export async function loadSheetData() {
  if (sheetDataPromise) {
    return sheetDataPromise;
  }
  sheetDataPromise = (async () => {
    try {
      const [userData, pointHistoryData, taskData] = await Promise.all([
        fetchData(usrUrl),
        fetchData(pointHistoryUrl),
        fetchData(taskUrl),
      ]);
      return {
        users: userData,
        pointHistory: pointHistoryData,
        tasks: taskData,
      };
    } catch (error) {
      console.error("Error loading sheet data:", error);
      return null;
    }
  })();
  return sheetDataPromise;
}
//loadSheetData();

// Example usage
// loadSheetData().then(data => console.log(data));.join("")
