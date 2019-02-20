const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const defaultjs = `module.exports = {
  context: {

  }
}`;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed




/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('NEW-FRACTAL-FOLDER');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.createFractalFolder', function (uri) {
		// The code you place here will be executed every time your command is executed

    const uriPath = uri.fsPath;
    const isDir = fs.lstatSync(uriPath).isDirectory();
    const fileExtensions = ['.twig', '.config.js', '.scss'];

    let targetPath;

    if ( !isDir ) {
      targetPath = path.dirname(uriPath);
    } else {
      targetPath = uriPath;
    }

    const options = {
      ignoreFocusOut: true,
      placeHolder: 'Folder_Name',
      validateInput: function(name) {
        if (!name) {
          return 'Name is required';
        }

        if (name.includes(' ')) {
          return 'Spaces are not allowed';
        }

        if (fs.existsSync(path.resolve(targetPath, name))) {
          return 'Name exists';
        }

        // // no errors
        return undefined;
      },
      prompt: `Input the fractal folder name`
    };

    // vscode.window.showInputBox(options).then(text => {
    //   console.log('result: ' + text);
    // });

    // Open Input Box
    vscode.window.showInputBox(options)
      .then((fractalName) => {

        if (fractalName !== null && fractalName !== undefined ) {
          const newPath = path.resolve(targetPath, fractalName);

          if (!fs.existsSync(newPath)){
            console.log(newPath);
            console.log(path.resolve(newPath, `${fractalName}.scss`));
            // fs.mkdir(newPath);
            fs.mkdir(newPath, { recursive: true }, (err) => {
              if (err) throw err;
            });

            console.log(path.resolve(newPath, `${fractalName}.scss`));

            fs.writeFile(path.resolve(newPath, `${fractalName}.twig`), '', function (err) {
              if (err) throw err;
            });

            fs.writeFile(path.resolve(newPath, `${fractalName}.config.js`), defaultjs, function (err) {
              if (err) throw err;
            });

            fs.writeFile(path.resolve(newPath, `${fractalName}.scss`), '', function (err) {
              if (err) throw err;
            });

          }

        }
      });

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
