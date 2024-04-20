
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class FileHelper
	{
		static loadFileAsBytes(fileToLoad: any, callback: any)
		{
			var fileReader = new FileReader();
			fileReader.onload = (fileLoadedEvent: any) =>
			{
				var fileLoadedAsBinaryString =
					fileLoadedEvent.target.result;
				var fileLoadedAsBytes =
					ByteHelper.stringUTF8ToBytes(fileLoadedAsBinaryString);
				callback(fileToLoad.name, fileLoadedAsBytes);
			}

			fileReader.readAsBinaryString(fileToLoad);
		}

		static loadFileAsText(fileToLoad: any, callback: any)
		{
			var fileReader = new FileReader();
			fileReader.onload = (fileLoadedEvent: any) =>
			{
				var textFromFileLoaded = fileLoadedEvent.target.result;
				callback(fileToLoad.name, textFromFileLoaded);
			};
			fileReader.readAsText(fileToLoad);
		}

		static saveBytesAsFile(bytesToWrite: number[], fileNameToSaveAs: string)
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

		static saveTextAsFile(textToSave: string, fileNameToSaveAs: string)
		{
			var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
			var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

			var downloadLink = document.createElement("a");
			downloadLink.download = fileNameToSaveAs;
			downloadLink.href = textToSaveAsURL;
			downloadLink.click();
		}
	}
}
