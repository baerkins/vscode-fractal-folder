# New Fractal Folder

Adds a "Create New Fractal Folder" option to the Explorer context menu. Clicking this option will allow you to enter a name for the folder. The folder will be generated, with matching twig, sass, and config named files.

## Configuration

Configure file creation in settings:

![configuration options](https://raw.githubusercontent.com/baerkins/vscode-fractal-folder/master/img/options.png "Configuration")

**Config File Format:** The extension for the `config` file (`json`, `js`, or `yml`) *Default: `js`*

**Fractal File Format:** The extension for the fractal file. Enter the extension name without a proceeding `.`, i.e. `twig` or `nunj`. *Default: `hbs`*

**Sass Options:** Create a `.sass` file, a `.scss` file, or no sass file. *Default: `scss`*

## Usage

Right click a file or folder where you would like to create the fractal folder in the explorer.

Select "Create New Fractal Folder", and enter the name in the input box.

![extension usage](https://raw.githubusercontent.com/baerkins/vscode-fractal-folder/master/img/usage.gif "Usage")


## Options

- Select to output a `js`, `json`, or `yml` config file. Default is `js`.
- Whether to output a `scss` or `sass` file, or no sass file at all. Default is `scss`.