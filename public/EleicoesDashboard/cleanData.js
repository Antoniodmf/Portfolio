export function cleanElectionData(rawData) {
  var cleanData = {};

  const arrayDistritos = Object.entries(rawData[0]);

  rawData.forEach((row) => {
    if (row && row["Círculo"]) {
      const item = row["Círculo"];

      if (isItemValid(item)) {
        cleanData[item] = {};

        arrayDistritos.forEach(([code, name]) => {
          // name = name.toLowerCase();
          cleanData[item][name] = row[code];
          if (!row[code]) {
            delete cleanData[item];
          }
        });
      }
    }
    if (!row) return;
  });

  return cleanData;
}

function isItemValid(item) {
  return (
    !item.includes("md") &&
    !item.includes("*") &&
    !item.includes("Observações") &&
    !item.includes("somatórios") &&
    !item.includes("%") &&
    !item.includes("VVE")
  );
}

function exportJSON(obj) {
  const filename = "ficheiroCorrigido";
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

window.addEventListener("DOMContentLoaded", () => {
  let file;
  document.getElementById("file").addEventListener("change", async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const text = await file.text();
      const json = JSON.parse(text);

      exportJSON(cleanElectionData(json));
    }
    document.getElementById("btn").addEventListener("click", () => {
      console.log("teste");
      exportJSON(cleanElectionData(file));
    });
  });
});
