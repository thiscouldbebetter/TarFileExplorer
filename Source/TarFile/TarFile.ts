
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class TarFile
	{
		fileName: string;
		entries: TarFileEntry[];

		constructor(fileName: string, entries: TarFileEntry[])
		{
			this.fileName = fileName;
			this.entries = entries;
		}

		// constants

		static ChunkSize: number = 512;

		// static methods

		static fromName(fileName: string): TarFile
		{
			return new TarFile
			(
				fileName, []
			);
		}

		static fromNameAndBytes(fileName: string, bytes: number[]): TarFile
		{
			var reader = new ByteStream(bytes);

			var entries = new Array<TarFileEntry>();

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

					var entry =
						TarFileEntry
							.fromBytesAndByteStream(chunkAsBytes, reader);

					entries.push(entry);
				}
			}

			var returnValue = new TarFile(fileName, entries);

			returnValue.consolidateLongPathEntries();

			return returnValue;
		}

		static fromNameAndEntries
		(
			fileName: string, entries: TarFileEntry[]
		): TarFile
		{
			return new TarFile(fileName, entries);
		}

		static fromNameAndEntriesAsFileNameByteArrayPairs
		(
			fileName: string,
			entriesAsFileNameByteArrayPairs: any[][]
		): TarFile
		{
			var entries =
				entriesAsFileNameByteArrayPairs
					.map(x => TarFileEntry.fileFromNameAndBytes(x[0], x[1]) );
			return new TarFile(fileName, entries);
		}

		// instance methods

		consolidateLongPathEntries(): void
		{
			// TAR file entries with paths longer than 99 chars require cheating,
			// by prepending them with a entry of type "L" whose data contains the path.
			var typeFlagLongPathName =
				TarFileTypeFlag.Instances().LongFilePath.name;
			var entries = this.entries;
			for (var i = 0; i < entries.length; i++)
			{
				var entry = entries[i];
				if (entry.header.typeFlag.name == typeFlagLongPathName)
				{
					var entryNext = entries[i + 1];
					entryNext.header.fileName = entry.dataAsBytes.reduce
					(
						(a, b) => a += String.fromCharCode(b),
						""
					);
					entries.splice(i, 1);
					i--;
				}
			}
		}

		download(): void
		{
			this.downloadAs(this.fileName);
		}

		downloadAs(fileNameToSaveAs: string): void
		{
			var thisAsBytes = this.toBytes();

			FileHelper.saveBytesAsFile
			(
				thisAsBytes,
				fileNameToSaveAs
			)
		}

		entriesForDirectories(): TarFileEntry[]
		{
			var flags = TarFileTypeFlag.Instances();
			return this.entries.filter
			(
				x => x.header.typeFlag.name == flags.Directory.name
			);
		}

		toBytes(): number[]
		{
			this.toBytes_PrependLongPathEntriesAsNeeded();

			var fileAsBytes = new Array<number>();

			// hack - For easier debugging.
			var entriesAsByteArrays = this.entries.map(x => x.toBytes());

			// Now that we've written the bytes for long path entries,
			// put it back the way it was.
			this.consolidateLongPathEntries();

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

		toBytes_PrependLongPathEntriesAsNeeded(): void
		{
			// TAR file entries with paths longer than 99 chars require cheating,
			// by prepending them with a entry of type "L" whose data contains the path.

			var typeFlagLongPath = TarFileTypeFlag.Instances().LongFilePath;
			var maxLength = TarFileEntryHeader.FileNameMaxLength;

			var entries = this.entries;
			for (var i = 0; i < entries.length; i++)
			{
				var entry = entries[i];
				var entryHeader = entry.header;
				var entryFileName = entryHeader.fileName;
				if (entryFileName.length > maxLength)
				{
					var entryFileNameAsBytes =
						entryFileName.split("").map(x => x.charCodeAt(0));
					var entryContainingLongPathToPrepend = TarFileEntry.fileNew
					(
						typeFlagLongPath.name, entryFileNameAsBytes
					);
					entryContainingLongPathToPrepend.header.typeFlag = typeFlagLongPath;
					entryContainingLongPathToPrepend.header.timeModifiedInUnixFormat =
						entryHeader.timeModifiedInUnixFormat;
					entryContainingLongPathToPrepend.header.checksumCalculate();
					entryHeader.fileName =
						entryFileName.substr(0, maxLength) + String.fromCharCode(0);
					entries.splice(i, 0, entryContainingLongPathToPrepend);
					i++;
				}
			}
		}
	}
}
