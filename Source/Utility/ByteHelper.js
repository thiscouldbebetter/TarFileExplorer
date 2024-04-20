"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var TarFileExplorer;
    (function (TarFileExplorer) {
        class ByteHelper {
            static stringUTF8ToBytes(stringToConvert) {
                var bytes = new Array();
                for (var i = 0; i < stringToConvert.length; i++) {
                    var byte = stringToConvert.charCodeAt(i);
                    bytes.push(byte);
                }
                return bytes;
            }
            static bytesToStringHexadecimal(bytesToConvert) {
                var returnValue = "";
                for (var i = 0; i < bytesToConvert.length; i++) {
                    var byte = bytesToConvert[i];
                    var byteAsString = byte.toString(16);
                    returnValue += byteAsString;
                }
                return returnValue;
            }
            static bytesToStringUTF8(bytesToConvert) {
                var returnValue = "";
                for (var i = 0; i < bytesToConvert.length; i++) {
                    var byte = bytesToConvert[i];
                    var byteAsChar = String.fromCharCode(byte);
                    returnValue += byteAsChar;
                }
                return returnValue;
            }
        }
        TarFileExplorer.ByteHelper = ByteHelper;
    })(TarFileExplorer = ThisCouldBeBetter.TarFileExplorer || (ThisCouldBeBetter.TarFileExplorer = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
