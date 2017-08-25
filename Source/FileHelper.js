
function FileHelper()
{
	// static class
}

{
    FileHelper.loadFileAsBytes = function(fileToLoad, callback)
	{   
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent)
		{
			var fileLoadedAsBinaryString = 
				fileLoadedEvent.target.result;
			var fileLoadedAsBytes = 
				ByteHelper.stringUTF8ToBytes(fileLoadedAsBinaryString);
			callback(fileToLoad.name, fileLoadedAsBytes);
		}
 
		fileReader.readAsBinaryString(fileToLoad);
	}

	FileHelper.loadFileAsText = function(fileToLoad, callback)
	{
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) 
		{
			var textFromFileLoaded = fileLoadedEvent.target.result;
			callback(fileToLoad.name, textFromFileLoaded);
		};
		fileReader.readAsText(fileToLoad);
	}
 
	FileHelper.saveBytesAsFile = function(bytesToWrite, fileNameToSaveAs)
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

	FileHelper.saveTextAsFile = function(textToSave, fileNameToSaveAs)
	{
		var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
		var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.href = textToSaveAsURL;
		downloadLink.click();
	}
}
