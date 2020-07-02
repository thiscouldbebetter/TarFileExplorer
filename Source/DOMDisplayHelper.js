
class DOMDisplayHelper
{
	static tarFileEntryToDOMElement(tarFileEntry)
	{
		var returnValue = document.createElement("tr");

		var header = tarFileEntry.header;

		var td = document.createElement("td");
		td.innerHTML = header.fileName;
		returnValue.appendChild(td);

		var td = document.createElement("td");
		td.innerHTML = header.typeFlag.name;
		returnValue.appendChild(td);

		var td = document.createElement("td");
		td.innerHTML = header.fileSizeInBytes;
		returnValue.appendChild(td);

		var td = document.createElement("td");

		if (header.typeFlag.name == "Normal")
		{
			var buttonDownload = document.createElement("button");
			buttonDownload.innerHTML = "Download";
			buttonDownload.onclick = tarFileEntry.download.bind(tarFileEntry);
			td.appendChild(buttonDownload);
		}

		returnValue.appendChild(td);

		var td = document.createElement("td");
		var buttonDelete = document.createElement("button");
		buttonDelete.innerHTML = "Delete";
		buttonDelete.onclick = () =>
		{
			var tarFile = Globals.Instance.tarFile;
			tarFile.entries.remove(tarFileEntry);
			divTarFileRefresh(); // hack - ui event handler
		}
		td.appendChild(buttonDelete);

		returnValue.appendChild(td);

		return returnValue;
	}

	static tarFileToDOMElement(tarFile)
	{
		var returnValue = document.createElement("div");

		var pFileName = document.createElement("p");
		pFileName.innerHTML = tarFile.fileName;
		returnValue.appendChild(pFileName);

		var tableEntries = document.createElement("table");
		tableEntries.style.border = "1px solid";

		var thead = document.createElement("thead");

		var th = document.createElement("th");
		th.innerHTML = "File Name";
		th.style.border = "1px solid";
		thead.appendChild(th);

		var th = document.createElement("th");
		th.innerHTML = "Type";
		th.style.border = "1px solid";
		thead.appendChild(th);

		th = document.createElement("th");
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

}
