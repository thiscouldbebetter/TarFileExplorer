"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var TarFileExplorer;
    (function (TarFileExplorer) {
        class TarFileEntry {
            constructor(header, dataAsBytes) {
                this.header = header;
                this.dataAsBytes = dataAsBytes;
            }
            // methods
            // static methods
            static fromHeaderAndBytes(header, dataAsBytes) {
                return new TarFileEntry(header, dataAsBytes);
            }
            static directoryFromName(directoryName) {
                return TarFileEntry.directoryNew(directoryName);
            }
            static directoryNew(directoryName) {
                var header = TarFileExplorer.TarFileEntryHeader.directoryNew(directoryName);
                var entry = new TarFileEntry(header, new Array());
                return entry;
            }
            static fileFromNameAndBytes(fileName, fileContentsAsBytes) {
                return TarFileEntry.fileNew(fileName, fileContentsAsBytes);
            }
            static fileNew(fileName, fileContentsAsBytes) {
                var header = TarFileExplorer.TarFileEntryHeader.fileNew(fileName, fileContentsAsBytes);
                var entry = new TarFileEntry(header, fileContentsAsBytes);
                return entry;
            }
            static fromBytesAndByteStream(chunkAsBytes, reader) {
                var chunkSize = TarFileExplorer.TarFile.ChunkSize;
                var header = TarFileExplorer.TarFileEntryHeader.fromBytes(chunkAsBytes);
                var sizeOfDataEntryInBytesUnpadded = header.fileSizeInBytes;
                var numberOfChunksOccupiedByDataEntry = Math.ceil(sizeOfDataEntryInBytesUnpadded / chunkSize);
                var sizeOfDataEntryInBytesPadded = numberOfChunksOccupiedByDataEntry
                    * chunkSize;
                var dataAsBytes = reader.readBytes(sizeOfDataEntryInBytesPadded).slice(0, sizeOfDataEntryInBytesUnpadded);
                var entry = new TarFileEntry(header, dataAsBytes);
                return entry;
            }
            static manyFromByteArrays(fileNamePrefix, fileNameSuffix, entriesAsByteArrays) {
                var returnValues = new Array();
                for (var i = 0; i < entriesAsByteArrays.length; i++) {
                    var entryAsBytes = entriesAsByteArrays[i];
                    var entry = TarFileEntry.fileNew(fileNamePrefix + i + fileNameSuffix, entryAsBytes);
                    returnValues.push(entry);
                }
                return returnValues;
            }
            // instance methods
            download(event) {
                TarFileExplorer.FileHelper.saveBytesAsFile(this.dataAsBytes, this.header.fileName);
            }
            remove(event) {
                throw new Error("Not yet implemented!"); // todo
            }
            toBytes() {
                var entryAsBytes = new Array();
                var chunkSize = TarFileExplorer.TarFile.ChunkSize;
                var headerAsBytes = this.header.toBytes();
                entryAsBytes = entryAsBytes.concat(headerAsBytes);
                entryAsBytes = entryAsBytes.concat(this.dataAsBytes);
                var sizeOfDataEntryInBytesUnpadded = this.header.fileSizeInBytes;
                var numberOfChunksOccupiedByDataEntry = Math.ceil(sizeOfDataEntryInBytesUnpadded / chunkSize);
                var sizeOfDataEntryInBytesPadded = numberOfChunksOccupiedByDataEntry
                    * chunkSize;
                var numberOfBytesOfPadding = sizeOfDataEntryInBytesPadded - sizeOfDataEntryInBytesUnpadded;
                for (var i = 0; i < numberOfBytesOfPadding; i++) {
                    entryAsBytes.push(0);
                }
                return entryAsBytes;
            }
        }
        TarFileExplorer.TarFileEntry = TarFileEntry;
    })(TarFileExplorer = ThisCouldBeBetter.TarFileExplorer || (ThisCouldBeBetter.TarFileExplorer = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
