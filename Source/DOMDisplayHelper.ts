
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class DOMDisplayHelper
	{
		static tarFileEntryToDOMElement(tarFileEntry: TarFileEntry)
		{
			var d = document;

			var returnValue = d.createElement("tr");

			var header = tarFileEntry.header;

			var td = d.createElement("td");
			td.style.wordBreak = "break-all"; //td.style = "word-break: break-all";
			td.innerHTML = header.fileName;
			returnValue.appendChild(td);

			var td = d.createElement("td");
			td.innerHTML = header.typeFlag.name;
			returnValue.appendChild(td);

			var td = d.createElement("td");
			td.innerHTML = "" + header.fileSizeInBytes;
			returnValue.appendChild(td);

			var td = d.createElement("td");

			var headerTypeFlagName = header.typeFlag.name;
			var tarFileTypeFlags = TarFileTypeFlag.Instances();
			if (headerTypeFlagName == tarFileTypeFlags.Normal.name)
			{
				var buttonDownload = d.createElement("button");
				buttonDownload.innerHTML = "Download";
				buttonDownload.onclick = tarFileEntry.download.bind(tarFileEntry);
				td.appendChild(buttonDownload);
			}

			returnValue.appendChild(td);

			var td = d.createElement("td");
			var buttonDelete = d.createElement("button");
			buttonDelete.innerHTML = "Delete";
			buttonDelete.onclick = () =>
			{
				var tarFile = Globals.Instance.tarFile;
				ArrayHelper.removeElementFromArray(tarFileEntry, tarFile.entries);
				DOMDisplayHelper.divTarFileRefresh(); // hack - ui event handler
			}
			td.appendChild(buttonDelete);

			returnValue.appendChild(td);

			return returnValue;
		}

		static tarFileToDOMElement(tarFile: TarFile)
		{
			var d = document;
			var returnValue = d.createElement("div");

			var pFileName = d.createElement("p");
			pFileName.innerHTML = tarFile.fileName;
			returnValue.appendChild(pFileName);

			var tableEntries = d.createElement("table");
			tableEntries.style.border = "1px solid";

			var thead = d.createElement("thead");

			var th = d.createElement("th");
			th.innerHTML = "File Name";
			th.style.border = "1px solid";
			thead.appendChild(th);

			var th = d.createElement("th");
			th.innerHTML = "Type";
			th.style.border = "1px solid";
			thead.appendChild(th);

			th = d.createElement("th");
			th.innerHTML = "Size in Bytes";
			th.style.border = "1px solid";
			thead.appendChild(th);

			tableEntries.appendChild(thead);

			for (var i = 0; i < tarFile.entries.length; i++)
			{
				var entry = tarFile.entries[i];
				var domElementForEntry = DOMDisplayHelper.tarFileEntryToDOMElement(entry);
				tableEntries.appendChild(domElementForEntry);
			}

			returnValue.appendChild(tableEntries);

			return returnValue;
		}

		static divTarFileRefresh()
		{
			// hack - This should perhaps be refactored.

			var tarFile = Globals.Instance.tarFile;
			var tarFileAsDOMElement = DOMDisplayHelper.tarFileToDOMElement(tarFile);
			var divTarFile = document.getElementById("divTarFile");
			divTarFile.innerHTML = "";
			divTarFile.appendChild(tarFileAsDOMElement);

			var selectDirectoryToAddFileTo = document.getElementById
			(
				"selectDirectoryToAddFileTo"
			);
			selectDirectoryToAddFileTo.innerHTML = "";

			var optionRoot = document.createElement("option");
			optionRoot.innerHTML = "[root]";
			selectDirectoryToAddFileTo.appendChild(optionRoot);

			var entriesForDirectories = tarFile.entriesForDirectories();
			for (var i = 0; i < entriesForDirectories.length; i++)
			{
				var entry = entriesForDirectories[i];
				var option = document.createElement("option");
				option.innerHTML = entry.header.fileName;
				selectDirectoryToAddFileTo.appendChild(option);
			}
		}


	}
}
