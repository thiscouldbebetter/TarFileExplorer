"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var TarFileExplorer;
    (function (TarFileExplorer) {
        class ByteStream {
            constructor(bytes) {
                this.bytes = bytes;
                this.byteCurrentIndex = 0;
            }
            static fromBytes(bytes) {
                return new ByteStream(bytes);
            }
            hasMoreBytes() {
                return (this.byteCurrentIndex < this.bytes.length);
            }
            readBytes(numberOfBytesToRead) {
                var returnValue = new Array();
                for (var b = 0; b < numberOfBytesToRead; b++) {
                    returnValue[b] = this.readByte();
                }
                return returnValue;
            }
            readByte() {
                var returnValue = this.bytes[this.byteCurrentIndex];
                this.byteCurrentIndex++;
                return returnValue;
            }
            readString(lengthOfString) {
                var returnValue = "";
                for (var i = 0; i < lengthOfString; i++) {
                    var byte = this.readByte();
                    if (byte != 0) {
                        var byteAsChar = String.fromCharCode(byte);
                        returnValue += byteAsChar;
                    }
                }
                return returnValue;
            }
            writeBytes(bytesToWrite) {
                for (var b = 0; b < bytesToWrite.length; b++) {
                    this.bytes.push(bytesToWrite[b]);
                }
                this.byteCurrentIndex = this.bytes.length;
                return this;
            }
            writeByte(byteToWrite) {
                this.bytes.push(byteToWrite);
                this.byteCurrentIndex++;
                return this;
            }
            writeString(stringToWrite, lengthPadded) {
                for (var i = 0; i < stringToWrite.length; i++) {
                    var charAsByte = stringToWrite.charCodeAt(i);
                    this.writeByte(charAsByte);
                }
                var numberOfPaddingChars = lengthPadded - stringToWrite.length;
                for (var i = 0; i < numberOfPaddingChars; i++) {
                    this.writeByte(0);
                }
                return this;
            }
        }
        TarFileExplorer.ByteStream = ByteStream;
    })(TarFileExplorer = ThisCouldBeBetter.TarFileExplorer || (ThisCouldBeBetter.TarFileExplorer = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
