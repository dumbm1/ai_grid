/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function addGrid (obj) {

  scrollWin (
    obj.left + '\n' + obj.right + '\n' + obj.vCent + '\n' +
    obj.top + '\n' + obj.bott + '\n' + obj.hCent
  );
  return 8;
}

function scrollWin (input) {
  if (input instanceof Array)     input = input.join ("\r");

  var w    = new Window ("dialog", 'Scrollable alert'),
      list = w.add ("edittext", undefined, input, {multiline: true, scrolling: true});

  list.maximumSize.height = w.maximumSize.height - 100;
  list.minimumSize.width  = 600;

  w.add ("button", undefined, "Close", {name: "ok"});
  w.show ();
}

