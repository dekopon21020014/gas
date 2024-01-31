/*
 * この関数を，スプレッドシートに紐づいたgasで実行する
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

/*
 * javascriptライクな書き方が理解しづらい人は以下のようなコードの方が理解できるかも？？
 * どちらも同じ動きをするはずです
*/

/*

function createDownloadCsvScript() { 
  let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheets      = spreadSheet.getSheets();
  let url         = spreadSheet.getUrl().replace("edit", "export?gid=");
  let gids = [];
  let sheetNames = [];
  for (let i = 0; i < sheets.length; i++) {
    gids.push(sheets[i].getSheetId());
    sheetNames.push(sheets[i].getSheetName());
  }

  let command = 'gids=(';
  for (let i = 0; i < gids.length; i++) {
    command += `${gids[i]} `;
  }
  command += ');'
  command += 'sheetNames=(';
  for (let i = 0; i < sheetNames.length; i++) {
    command += `${sheetNames[i]} `;
  }
  command += ');'
  command += `for i in {1..${gids.length}}; do wget -O \$sheetNames[\$i].csv \"${url}\${gids[\$i]}&format=csv\"; done;`;
  console.log(command);
  return;
}

*/