const vscode = require('vscode');
const moment = require('moment-timezone');

function activate(context) {
  console.log('Time Stamps extension is now active!');

  let disposable = vscode.commands.registerCommand('extension.insertTimeStamp', function () {
    vscode.window.showInputBox({
      prompt: 'Enter time zone (e.g. America/New_York)',
      placeHolder: 'Time zone'
    }).then(timezone => {
      if (!timezone) {
        return;
      }

      let now = moment().tz(timezone);
      let timestamp = now.format('MM/DD/YYYY hh:mm:ss A Z');
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.start, timestamp);
      });
    });
  });

  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
