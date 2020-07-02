
class FileHelper
{
	static loadFileAsBytes(fileToLoad, callback)
	{
		var fileReader = new FileReader();
		fileReader.onload = (fileLoadedEvent) =>
		{
			var fileLoadedAsBinaryString =
				fileLoadedEvent.target.result;
			var fileLoadedAsBytes =
				ByteHelper.stringUTF8ToBytes(fileLoadedAsBinaryString);
			callback(fileToLoad.name, fileLoadedAsBytes);
		}

		fileReader.readAsBinaryString(fileToLoad);
	}

	static loadFileAsText(fileToLoad, callback)
	{
		var fileReader = new FileReader();
		fileReader.onload = (fileLoadedEvent) =>
		{
			var textFromFileLoaded = fileLoadedEvent.target.result;
			callback(fileToLoad.name, textFromFileLoaded);
		};
		fileReader.readAsText(fileToLoad);
	}

	static saveBytesAsFile(bytesToWrite, fileNameToSaveAs)
	{
		var bytesToWriteAsArrayBuffer = new ArrayBuffer(bytesToWrite.length);
		var bytesToWriteAsUIntArray = new Uint8Array(bytesToWriteAsArrayBuffer);
		for (var i = 0; i < bytesToWrite.length; i++)
		{
			bytesToWriteAsUIntArray[i] = bytesToWrite[i];
		}

		var bytesToWriteAsBlob = new Blob
		(
			[ bytesToWriteAsArrayBuffer ],
			{ type:"application/type" }
		);

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.href = window.URL.createObjectURL(bytesToWriteAsBlob);
		downloadLink.click();
	}

	static saveTextAsFile(textToSave, fileNameToSaveAs)
	{
		var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
		var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.href = textToSaveAsURL;
		downloadLink.click();
	}
}
