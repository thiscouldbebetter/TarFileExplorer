
class ByteStream
{
	constructor(bytes)
	{
		this.bytes = bytes;

		this.byteIndexCurrent = 0;
	}

	// constants

	static BitsPerByte = 8;
	static BitsPerByteTimesTwo = ByteStream.BitsPerByte * 2;
	static BitsPerByteTimesThree = ByteStream.BitsPerByte * 3;

	// instance methods

	hasMoreBytes()
	{
		return (this.byteIndexCurrent < this.bytes.length);
	}

	readBytes(numberOfBytesToRead)
	{
		var returnValue = [];

		for (var b = 0; b < numberOfBytesToRead; b++)
		{
			returnValue[b] = this.readByte();
		}

		return returnValue;
	}

	readByte()
	{
		var returnValue = this.bytes[this.byteIndexCurrent];

		this.byteIndexCurrent++;

		return returnValue;
	}

	readString(lengthOfString)
	{
		var returnValue = "";

		for (var i = 0; i < lengthOfString; i++)
		{
			var byte = this.readByte();

			if (byte != 0)
			{
				var byteAsChar = String.fromCharCode(byte);
				returnValue += byteAsChar;
			}
		}

		return returnValue;
	}

	writeBytes(bytesToWrite)
	{
		for (var b = 0; b < bytesToWrite.length; b++)
		{
			this.bytes.push(bytesToWrite[b]);
		}

		this.byteIndexCurrent = this.bytes.length;
	}

	writeByte(byteToWrite)
	{
		this.bytes.push(byteToWrite);

		this.byteIndexCurrent++;
	}

	writeString(stringToWrite, lengthPadded)
	{
		for (var i = 0; i < stringToWrite.length; i++)
		{
			var charAsByte = stringToWrite.charCodeAt(i);
			this.writeByte(charAsByte);
		}

		var numberOfPaddingChars = lengthPadded - stringToWrite.length;
		for (var i = 0; i < numberOfPaddingChars; i++)
		{
			this.writeByte(0);
		}
	}
}
