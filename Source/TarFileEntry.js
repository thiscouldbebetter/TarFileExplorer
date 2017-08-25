
function TarFileEntry(header, dataAsBytes)
{
	this.header = header;
	this.dataAsBytes = dataAsBytes;
}

{
	// methods

	// static methods

	TarFileEntry.directoryNew = function(directoryName)
	{
		var header = TarFileEntryHeader.directoryNew(directoryName);

		var entry = new TarFileEntry(header, []);

		return entry;
	}

	TarFileEntry.fileNew = function(fileName, fileContentsAsBytes)
	{
		var header = TarFileEntryHeader.fileNew(fileName, fileContentsAsBytes);

		var entry = new TarFileEntry(header, fileContentsAsBytes);

		return entry;
	}

	TarFileEntry.fromBytes = function(chunkAsBytes, reader)
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

	TarFileEntry.manyFromByteArrays = function
	(
		fileNamePrefix, fileNameSuffix, entriesAsByteArrays
	)
	{
		var returnValues = [];

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

	TarFileEntry.prototype.download = function(event)
	{
		FileHelper.saveBytesAsFile
		(
			this.dataAsBytes,
			this.header.fileName
		);
	}

	TarFileEntry.prototype.isNormalFile = function()
	{
		return (this.header.typeFlag == TarFileTypeFlag.Instances.Normal);
	}

	TarFileEntry.prototype.toBytes = function()
	{
		var entryAsBytes = [];

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

	TarFileEntry.prototype.toString = function()
	{
		var newline = "\n";

		headerAsString = this.header.toString();

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

		return returnValue
	}

}
