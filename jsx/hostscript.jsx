/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function addGrid (obj) {
  scrollWin (showObjDeep (obj));

  /*  scrollWin (
   obj.left + '\n' + obj.right + '\n' + obj.vCent + '\n' +
   obj.top + '\n' + obj.bott + '\n' + obj.hCent
   );*/
  return 8;
}
/**
 * TEST SECTION
 * */
function scrollWin (input) {
  if (input instanceof Array)     input = input.join ("\r");

  var w    = new Window ("dialog", 'Scrollable alert'),
      list = w.add ("edittext", undefined, input, {multiline: true, scrolling: true});

  list.maximumSize.height = w.maximumSize.height - 100;
  list.minimumSize.width  = 600;

  w.add ("button", undefined, "Close", {name: "ok"});
  w.show ();
}
function showObjDeep (obj) {
  var str    = '{\n';
  var indent = 1;

  showObj (obj);

  function showObj (obj) {

    for (var key in obj) {
      if (typeof obj[key] == 'object' /*&& !obj[key].splice*/) {
        str += addIndent (indent) + key + ':\n';
        ++indent;
        showObj (obj[key]);
      } else {
        str += addIndent (indent) + key + ': ' + obj[key] + ' [' + typeof obj[key] + '],\n';
      }
    }
    indent--;
  }

  return str + '}';
  function addIndent (i) {
    return new Array (i).join ('_');
  }
}

