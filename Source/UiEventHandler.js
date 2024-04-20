
var tarFileExplorer = ThisCouldBeBetter.TarFileExplorer;
var globals = tarFileExplorer.Globals.Instance;
var DOMDisplayHelper = tarFileExplorer.DOMDisplayHelper;
var FileHelper = tarFileExplorer.FileHelper;
var TarFile = tarFileExplorer.TarFile;
var TarFileEntry = tarFileExplorer.TarFileEntry;
var TarFileEntryHeader = tarFileExplorer.TarFileEntryHeader;
var TarFileTypeFlag = tarFileExplorer.TarFileTypeFlag;

function buttonAddDirectoryToTar_Clicked()
{
	var tarFile = globals.tarFile;
	if (tarFile == null)
	{
		alert("No TAR file created or loaded yet!");
	}
	else
	{
		var inputDirectoryToAddToTar =
			document.getElementById("inputDirectoryToAddToTar");
		var directoryToAddToTar = inputDirectoryToAddToTar.value;
		if (directoryToAddToTar != "")
		{
			var delimiter = "/";
			if (directoryToAddToTar.lastIndexOf(delimiter) < directoryToAddToTar.length - 1)
			{
				directoryToAddToTar += delimiter;
			}

			var entryForDirectory = TarFileEntry.directoryNew(directoryToAddToTar);

			tarFile.entries.push(entryForDirectory);
		}

		DOMDisplayHelper.divTarFileRefresh();
	}
}

function buttonAddFileToTar_Clicked()
{
	var tarFile = globals.tarFile;
	if (tarFile == null)
	{
		alert("No TAR file created or loaded yet!");
	}
	else
	{
		var inputFileToAddToTar = document.getElementById("inputFileToAddToTar");
		var fileToLoad = inputFileToAddToTar.files[0];
		if (fileToLoad != null)
		{
			FileHelper.loadFileAsBytes
			(
				fileToLoad,
				buttonAddFileToTar_Clicked2 // callback
			);
		}
	}
}

function buttonAddFileToTar_Clicked2(fileToAddName, fileToAddAsBytes)
{
	var selectDirectoryToAddFileTo = document.getElementById("selectDirectoryToAddFileTo");
	var directoryToAddFileTo = selectDirectoryToAddFileTo.selectedOptions[0].text;
	if (directoryToAddFileTo == "[root]")
	{
		directoryToAddFileTo = "";
	}
	fileToAddName = directoryToAddFileTo + fileToAddName;

	var tarFile = globals.tarFile;

	var tarFileEntry0 = tarFile.entries[0];
	var headerToClone =
	(
		tarFileEntry0 == null
		? TarFileEntryHeader.default()
		: tarFileEntry0.header
	);

	var tarFileEntryHeader = new TarFileEntryHeader
	(
		fileToAddName,
		headerToClone.fileMode,
		headerToClone.userIDOfOwner,
		headerToClone.userIDOfGroup,
		fileToAddAsBytes.length, // fileSizeInBytes,
		headerToClone.timeModifiedInUnixFormat, // todo
		0, // checksum,
		TarFileTypeFlag.Instances().Normal,
		headerToClone.nameOfLinkedFile,
		headerToClone.uStarIndicator,
		headerToClone.uStarVersion,
		headerToClone.userNameOfOwner,
		headerToClone.groupNameOfOwner,
		headerToClone.deviceNumberMajor,
		headerToClone.deviceNumberMinor,
		headerToClone.filenamePrefix
	);

	tarFileEntryHeader.checksumCalculate();

	var entryForFileToAdd = new TarFileEntry
	(
		tarFileEntryHeader,
		fileToAddAsBytes
	);

	tarFile.entries.push(entryForFileToAdd);

	DOMDisplayHelper.divTarFileRefresh();
}

function buttonNew_Clicked()
{
	globals.tarFile = tarFileExplorer.TarFile.create("[new]");
	DOMDisplayHelper.divTarFileRefresh();
}

function buttonSaveAsTar_Clicked()
{
	var tarFileToSave = globals.tarFile;
	if (tarFileToSave == null)
	{
		alert("No TAR file created or loaded yet!");
	}
	else
	{
		var inputFileNameToSaveAs =
			document.getElementById("inputFileNameToSaveAs");
		var fileNameToSaveAs = inputFileNameToSaveAs.value;
		tarFileToSave.downloadAs(fileNameToSaveAs);
	}
}

function inputTarFileToLoad_Change(event)
{
	var fileToLoad = event.srcElement.files[0];
	if (fileToLoad != null)
	{
		FileHelper.loadFileAsBytes
		(
			fileToLoad,
			inputTarFileToLoad_Change2 // callback
		);
	}
}

function inputTarFileToLoad_Change2(fileName, fileAsBytes)
{
	var tarFile = TarFile.fromBytes(fileName, fileAsBytes);

	globals.tarFile = tarFile;

	DOMDisplayHelper.divTarFileRefresh();
}
