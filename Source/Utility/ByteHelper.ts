
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class ByteHelper
	{
		static stringUTF8ToBytes(stringToConvert: string): number[]
		{
			var bytes = new Array<number>();

			for (var i = 0; i < stringToConvert.length; i++)
			{
				var byte = stringToConvert.charCodeAt(i);
				bytes.push(byte);
			}

			return bytes;
		}

		static bytesToStringHexadecimal(bytesToConvert: number[]): string
		{
			var returnValue = "";

			for (var i = 0; i < bytesToConvert.length; i++)
			{
				var byte = bytesToConvert[i];
				var byteAsString = byte.toString(16);
				returnValue += byteAsString;
			}

			return returnValue;
		}

		static bytesToStringUTF8(bytesToConvert: number[]): string
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
}
