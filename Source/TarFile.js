
class TarFile
{
	constructor(fileName, entries)
	{
		this.fileName = fileName;
		this.entries = entries;
	}

	// constants

	static ChunkSize = 512;

	// static methods

	static fromBytes(fileName, bytes)
	{
		var reader = new ByteStream(bytes);

		var entries = [];

		var chunkSize = TarFile.ChunkSize;

		var numberOfConsecutiveZeroChunks = 0;

		while (reader.hasMoreBytes() == true)
		{
			var chunkAsBytes = reader.readBytes(chunkSize);

			var areAllBytesInChunkZeroes = true;

			for (var b = 0; b < chunkAsBytes.length; b++)
			{
				if (chunkAsBytes[b] != 0)
				{
					areAllBytesInChunkZeroes = false;
					break;
				}
			}

			if (areAllBytesInChunkZeroes == true)
			{
				numberOfConsecutiveZeroChunks++;

				if (numberOfConsecutiveZeroChunks == 2)
				{
					break;
				}
			}
			else
			{
				numberOfConsecutiveZeroChunks = 0;

				var entry = TarFileEntry.fromBytes(chunkAsBytes, reader);

				entries.push(entry);
			}
		}

		var returnValue = new TarFile
		(
			fileName,
			entries
		);

		return returnValue;
	}

	static create(fileName)
	{
		return new TarFile
		(
			fileName,
			[] // entries
		);
	}

	// instance methods

	downloadAs(fileNameToSaveAs)
	{
		FileHelper.saveBytesAsFile
		(
			this.toBytes(),
			fileNameToSaveAs
		)
	}

	entriesForDirectories()
	{
		var returnValues = [];

		for (var i = 0; i < this.entries.length; i++)
		{
			var entry = this.entries[i];
			if (entry.header.typeFlag.name == "Directory")
			{
				returnValues.push(entry);
			}
		}

		return returnValues;
	}

	toBytes()
	{
		var fileAsBytes = [];

		// hack - For easier debugging.
		var entriesAsByteArrays = [];

		for (var i = 0; i < this.entries.length; i++)
		{
			var entry = this.entries[i];
			var entryAsBytes = entry.toBytes();
			entriesAsByteArrays.push(entryAsBytes);
		}

		for (var i = 0; i < entriesAsByteArrays.length; i++)
		{
			var entryAsBytes = entriesAsByteArrays[i];
			fileAsBytes = fileAsBytes.concat(entryAsBytes);
		}

		var chunkSize = TarFile.ChunkSize;

		var numberOfZeroChunksToWrite = 2;

		for (var i = 0; i < numberOfZeroChunksToWrite; i++)
		{
			for (var b = 0; b < chunkSize; b++)
			{
				fileAsBytes.push(0);
			}
		}

		return fileAsBytes;
	}

	// strings

	toString()
	{
		var newline = "\n";

		var returnValue = "[TarFile]" + newline;

		for (var i = 0; i < this.entries.length; i++)
		{
			var entry = this.entries[i];
			var entryAsString = entry.toString();
			returnValue += entryAsString;
		}

		returnValue += "[/TarFile]" + newline;

		return returnValue;
	}
}
