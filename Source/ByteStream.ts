
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class ByteStream
	{
		bytes: number[];

		byteIndexCurrent: number;

		constructor(bytes: number[])
		{
			this.bytes = bytes;

			this.byteIndexCurrent = 0;
		}

		// constants

		static BitsPerByte = 8;
		static BitsPerByteTimesTwo = ByteStream.BitsPerByte * 2;
		static BitsPerByteTimesThree = ByteStream.BitsPerByte * 3;

		// instance methods

		hasMoreBytes(): boolean
		{
			return (this.byteIndexCurrent < this.bytes.length);
		}

		readBytes(numberOfBytesToRead: number): number[]
		{
			var returnValue = new Array<number>();

			for (var b = 0; b < numberOfBytesToRead; b++)
			{
				returnValue[b] = this.readByte();
			}

			return returnValue;
		}

		readByte(): number
		{
			var returnValue = this.bytes[this.byteIndexCurrent];

			this.byteIndexCurrent++;

			return returnValue;
		}

		readString(lengthOfString: number)
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

		writeBytes(bytesToWrite: number[])
		{
			for (var b = 0; b < bytesToWrite.length; b++)
			{
				this.bytes.push(bytesToWrite[b]);
			}

			this.byteIndexCurrent = this.bytes.length;
		}

		writeByte(byteToWrite: number)
		{
			this.bytes.push(byteToWrite);

			this.byteIndexCurrent++;
		}

		writeString(stringToWrite: string, lengthPadded: number)
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
}
