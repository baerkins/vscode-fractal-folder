const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const defaultjs = `module.exports = {
  context: {

  }
}`;

const defaultjson = `{
  "context": {

  }
}`;

const defaultyml = `context:`;



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  let disposable = vscode.commands.registerCommand('createFractalFolder', function (uri) {

    const uriPath = uri.fsPath;
    const isDir = fs.lstatSync(uriPath).isDirectory();
    const settings = vscode.workspace.getConfiguration('new-fractal-folder');
    let targetPath;

    console.log(settings);

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

    // Open Input Box
    vscode.window.showInputBox(options)
      .then((fractalName) => {

        if (fractalName !== null && fractalName !== undefined ) {
          const newPath = path.resolve(targetPath, fractalName);

          // Create folder path
          if (!fs.existsSync(newPath)){
            fs.mkdir(newPath, { recursive: true }, (err) => {
              if (err) throw err;

              // Create twig file
              fs.writeFile(path.resolve(newPath, `${fractalName}.twig`), '', function (err) {
                if (err) throw err;
              });

              // Create config file content
              const configExt = settings.configFileFormat;
              let configContent;

              switch (configExt) {
                case 'json':
                  configContent = defaultjson;
                  break;

                case 'yml':
                  configContent = defaultyml;
                  break;

                default:
                  configContent = defaultjs;
              }

              // Create config file with content
              fs.writeFile(path.resolve(newPath, `${fractalName}.config.${configExt}`), configContent, function (err) {
                if (err) throw err;
              });

              // Sass file
              const sassOpts = settings.sassOpts;
              let sassExt;

              switch (sassOpts) {
                case 'Create .sass file':
                  sassExt = 'sass';
                  break;

                case 'Do not generate sass file':
                  sassExt = false;
                  break;

                default:
                  sassExt = 'scss';

              }

              if ( sassExt != false ) {
                fs.writeFile(path.resolve(newPath, `${fractalName}.${sassExt}`), '', function (err) {
                  if (err) throw err;
                });
              }

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
