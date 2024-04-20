"use strict";
class StringHelper {
    static padStringLeftToLengthWithChar(stringToPad, lengthToPadTo, charToPadWith) {
        var returnValue = stringToPad;
        while (returnValue.length < lengthToPadTo) {
            returnValue = charToPadWith + returnValue;
        }
        return returnValue;
    }
    static padStringRightToLengthWithChar(stringToPad, lengthToPadTo, charToPadWith) {
        var returnValue = stringToPad;
        while (returnValue.length < lengthToPadTo) {
            returnValue += charToPadWith;
        }
        return returnValue;
    }
}
