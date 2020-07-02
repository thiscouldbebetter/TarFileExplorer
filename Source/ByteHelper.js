
class ByteHelper
{
	static stringUTF8ToBytes(stringToConvert)
	{
		var bytes = [];

		for (var i = 0; i < stringToConvert.length; i++)
		{
			var byte = stringToConvert.charCodeAt(i);
			bytes.push(byte);
		}

		return bytes;
	}

	static bytesToStringUTF8(bytesToConvert)
	{
		var returnValue = "";

		for (var i = 0; i < bytesToConvert.length; i++)
		{
			var byte = bytesToConvert[i];
			var byteAsChar = String.fromCharCode(byte);
			returnValue += byteAsChar
		}

		return returnValue;
	}
}
