/*
 * この関数を，スプレッドシートに紐づいたgasdで実行する
 * 生成されたシェルコマンドがconsole.logで表示される
 * スプレッドシートの共有範囲を[リンクを知っている全員]に設定する
 * シェルコマンドを実行してcsvを得る
 * 必要に応じて，スプレッドシートの共有範囲を元に戻す
*/
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