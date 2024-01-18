function generateCsvDownloadShellScript() {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets      = spreadSheet.getSheets();
  const url         = spreadSheet.getUrl().replace("edit", "export?gid=");

  const gids       = sheets.map(sheet => sheet.getSheetId());
  const sheetNames = sheets.map(sheet => sheet.getSheetName());

  const gidCommand       = `gids=(${gids.join(" ")});`;
  const sheetNameCommand = `sheetNames=("${sheetNames.join('" "')}");`;
  const downloadCommand  = `for i in {1..${gids.length}}; do wget -O "\${sheetNames[\$i]}.csv" "${url}\${gids[\$i]}&format=csv"; done;`;

  const command = `${gidCommand} ${sheetNameCommand} ${downloadCommand}`;
  
  console.log(command);
  return;
}