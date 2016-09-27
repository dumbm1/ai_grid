/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';

  var csInterface = new CSInterface ();

  function loadJSX (fileName) {
    var extensionRoot = csInterface.getSystemPath (SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript ('$.evalFile("' + extensionRoot + fileName + '")');
  }

  function init () {

    themeManager.init ();
    loadJSX ("json2.js");

    $ ("#btn_github").click (function () {
      window.cep.util.openURLInDefaultBrowser ("https://github.com/dumbm1/ai_grid");
    });
    $ ("#btn_clear").click (reloadPanel);
  }

  init ();

  function reloadPanel () {
    location.reload ();
  }
} ());
