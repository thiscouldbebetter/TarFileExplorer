
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class FileHelper
	{
		static loadFileAsBytes(fileToLoad: any, callback: any): void
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

		static loadFileAsText
		(
			fileToLoad: any,
			callback: (name: string, text: string) => void
		): void
		{
			var fileReader = new FileReader();
			fileReader.onload = (fileLoadedEvent: any) =>
			{
				var textFromFileLoaded = fileLoadedEvent.target.result;
				callback(fileToLoad.name, textFromFileLoaded);
			};
			fileReader.readAsText(fileToLoad);
		}

		static saveBytesAsFile(bytesToWrite: number[], fileNameToSaveAs: string): void
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
			downloadLink.href = URL.createObjectURL(bytesToWriteAsBlob);
			downloadLink.click();
		}

		static saveTextAsFile(textToSave: string, fileNameToSaveAs: string): void
		{
			var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
			var textToSaveAsURL = URL.createObjectURL(textToSaveAsBlob);

			var downloadLink = document.createElement("a");
			downloadLink.download = fileNameToSaveAs;
			downloadLink.href = textToSaveAsURL;
			downloadLink.click();
		}
	}
}
