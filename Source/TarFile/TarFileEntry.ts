
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class TarFileEntry
	{
		header: TarFileEntryHeader;
		dataAsBytes: number[];

		constructor
		(
			header: TarFileEntryHeader,
			dataAsBytes: number[]
		)
		{
			this.header = header;
			this.dataAsBytes = dataAsBytes;
		}

		// methods

		// static methods

		static directoryFromName(directoryName: string): TarFileEntry
		{
			return TarFileEntry.directoryNew(directoryName);
		}

		static directoryNew(directoryName: string): TarFileEntry
		{
			var header = TarFileEntryHeader.directoryNew(directoryName);

			var entry = new TarFileEntry(header, new Array<number>());

			return entry;
		}

		static fileFromNameAndBytes
		(
			fileName: string,
			fileContentsAsBytes: number[]
		): TarFileEntry
		{
			return TarFileEntry.fileFromNameAndBytes(fileName, fileContentsAsBytes);
		}

		static fileNew
		(
			fileName: string,
			fileContentsAsBytes: number[]
		): TarFileEntry
		{
			var header = TarFileEntryHeader.fileNew(fileName, fileContentsAsBytes);

			var entry = new TarFileEntry(header, fileContentsAsBytes);

			return entry;
		}

		static fromBytes(chunkAsBytes: number[], reader: ByteStream): TarFileEntry
		{
			var chunkSize = TarFile.ChunkSize;

			var header = TarFileEntryHeader.fromBytes
			(
				chunkAsBytes
			);

			var sizeOfDataEntryInBytesUnpadded = header.fileSizeInBytes;

			var numberOfChunksOccupiedByDataEntry = Math.ceil
			(
				sizeOfDataEntryInBytesUnpadded / chunkSize
			)

			var sizeOfDataEntryInBytesPadded =
				numberOfChunksOccupiedByDataEntry
				* chunkSize;

			var dataAsBytes = reader.readBytes
			(
				sizeOfDataEntryInBytesPadded
			).slice
			(
				0, sizeOfDataEntryInBytesUnpadded
			);

			var entry = new TarFileEntry(header, dataAsBytes);

			return entry;
		}

		static manyFromByteArrays
		(
			fileNamePrefix: string, fileNameSuffix: string,
			entriesAsByteArrays: number[][]
		): TarFileEntry[]
		{
			var returnValues = new Array<TarFileEntry>();

			for (var i = 0; i < entriesAsByteArrays.length; i++)
			{
				var entryAsBytes = entriesAsByteArrays[i];
				var entry = TarFileEntry.fileNew
				(
					fileNamePrefix + i + fileNameSuffix,
					entryAsBytes
				);

				returnValues.push(entry);
			}

			return returnValues;
		}

		// instance methods

		download(event: any): void
		{
			FileHelper.saveBytesAsFile
			(
				this.dataAsBytes,
				this.header.fileName
			);
		}

		remove(event: any): void
		{
			alert("Not yet implemented!"); // todo
		}

		toBytes(): number[]
		{
			var entryAsBytes = new Array<number>();

			var chunkSize = TarFile.ChunkSize;

			var headerAsBytes = this.header.toBytes();
			entryAsBytes = entryAsBytes.concat(headerAsBytes);

			entryAsBytes = entryAsBytes.concat(this.dataAsBytes);

			var sizeOfDataEntryInBytesUnpadded = this.header.fileSizeInBytes;

			var numberOfChunksOccupiedByDataEntry = Math.ceil
			(
				sizeOfDataEntryInBytesUnpadded / chunkSize
			)

			var sizeOfDataEntryInBytesPadded =
				numberOfChunksOccupiedByDataEntry
				* chunkSize;

			var numberOfBytesOfPadding =
				sizeOfDataEntryInBytesPadded - sizeOfDataEntryInBytesUnpadded;

			for (var i = 0; i < numberOfBytesOfPadding; i++)
			{
				entryAsBytes.push(0);
			}

			return entryAsBytes;
		}

		// strings

		toString(): string
		{
			var newline = "\n";

			var headerAsString = this.header.toString();

			var dataAsHexadecimalString = ByteHelper.bytesToStringHexadecimal
			(
				this.dataAsBytes
			);

			var returnValue =
				"[TarFileEntry]" + newline
				+ headerAsString
				+ "[Data]"
				+ dataAsHexadecimalString
				+ "[/Data]" + newline
				+ "[/TarFileEntry]"
				+ newline;

			return returnValue;
		}

	}
}
