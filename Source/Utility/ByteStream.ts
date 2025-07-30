
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class ByteStream
	{
		bytes: number[];

		byteCurrentIndex: number;

		constructor(bytes: number[])
		{
			this.bytes = bytes;

			this.byteCurrentIndex = 0;
		}

		static fromBytes(bytes: number[]): ByteStream
		{
			return new ByteStream(bytes);
		}

		hasMoreBytes(): boolean
		{
			return (this.byteCurrentIndex < this.bytes.length);
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
			var returnValue = this.bytes[this.byteCurrentIndex];

			this.byteCurrentIndex++;

			return returnValue;
		}

		readString(lengthOfString: number): string
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

		writeBytes(bytesToWrite: number[]): ByteStream
		{
			for (var b = 0; b < bytesToWrite.length; b++)
			{
				this.bytes.push(bytesToWrite[b]);
			}

			this.byteCurrentIndex = this.bytes.length;

			return this;
		}

		writeByte(byteToWrite: number): ByteStream
		{
			this.bytes.push(byteToWrite);

			this.byteCurrentIndex++;

			return this;
		}

		writeString(stringToWrite: string, lengthPadded: number): ByteStream
		{
			for (var i = 0; i < stringToWrite.length; i++)
			{
				var charAsByte = stringToWrite.charCodeAt(i);
				this.writeByte(charAsByte);
			}

			var numberOfPaddingChars =
				lengthPadded - stringToWrite.length;
			for (var i = 0; i < numberOfPaddingChars; i++)
			{
				this.writeByte(0);
			}

			return this;
		}
	}
}
