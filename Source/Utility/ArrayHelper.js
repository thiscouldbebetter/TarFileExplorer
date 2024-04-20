"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var TarFileExplorer;
    (function (TarFileExplorer) {
        class ArrayHelper {
            static removeElementFromArray(elementToRemove, array) {
                array.splice(array.indexOf(elementToRemove), 1);
            }
        }
        TarFileExplorer.ArrayHelper = ArrayHelper;
    })(TarFileExplorer = ThisCouldBeBetter.TarFileExplorer || (ThisCouldBeBetter.TarFileExplorer = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
