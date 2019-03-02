# Change Log
All notable changes to the New Fractal Folder extension will be documented in this file.

## 0.1.0
SASS OPTION REMOVED 😿
CUSTOM EXTENSIONS OPTION ADDED 🎉

*If you were previously generating a `.scss` or `.sass` file in the Sass Extension option, you will now need to add the extension to the Custom Extensions option.*

You can now add as many file extensions as you wish. Just enter a comma seperated list in the Custom Extensions option, such as `scss,jsx,partytime`, and each will be created as a file matching the folder name.

## 0.0.4
- Add optional README file generation
- Remove numerical order prefix from file name
  - Folder name `01-component` will create files named `component`, rather than `01-component` as per [Fractal ordering](https://fractal.build/guide/core-concepts/naming.html#ordering-and-hiding)
- Remove leading underscore from file names
  - Folder name `_hidden-component` will create files named `hidden-component`, rather than `_hidden-component` as per [Fractals hidden naming](https://fractal.build/guide/core-concepts/naming.html#ordering-and-hiding)
- Update credit: @fuhlig, closes issues #1 and #2.

## 0.0.3
- Update documentation

## 0.0.2
- Add fractal file extension option

## 0.0.1
- Initial release