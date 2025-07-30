"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var TarFileExplorer;
    (function (TarFileExplorer) {
        class DomDisplayHelper {
            static tarFileEntryToDomElement(tarFileEntry) {
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
                var tarFileTypeFlags = TarFileExplorer.TarFileTypeFlag.Instances();
                if (headerTypeFlagName == tarFileTypeFlags.Normal.name) {
                    var buttonDownload = d.createElement("button");
                    buttonDownload.innerHTML = "Download";
                    buttonDownload.onclick = tarFileEntry.download.bind(tarFileEntry);
                    td.appendChild(buttonDownload);
                }
                returnValue.appendChild(td);
                var td = d.createElement("td");
                var buttonDelete = d.createElement("button");
                buttonDelete.innerHTML = "Delete";
                buttonDelete.onclick = () => {
                    var tarFile = TarFileExplorer.Globals.Instance.tarFile;
                    var entries = tarFile.entries;
                    entries.splice(entries.indexOf(tarFileEntry), 1);
                    DomDisplayHelper.divTarFileRefresh(); // hack - ui event handler
                };
                td.appendChild(buttonDelete);
                returnValue.appendChild(td);
                return returnValue;
            }
            static tarFileToDOMElement(tarFile) {
                var d = document;
                var returnValue = d.createElement("div");
                var pFileName = d.createElement("p");
                pFileName.innerHTML = tarFile.fileName;
                returnValue.appendChild(pFileName);
                var tableEntries = d.createElement("table");
                var thead = d.createElement("thead");
                var th = d.createElement("th");
                th.innerHTML = "File Name";
                thead.appendChild(th);
                var th = d.createElement("th");
                th.innerHTML = "Type";
                thead.appendChild(th);
                th = d.createElement("th");
                th.innerHTML = "Size in Bytes";
                thead.appendChild(th);
                tableEntries.appendChild(thead);
                for (var i = 0; i < tarFile.entries.length; i++) {
                    var entry = tarFile.entries[i];
                    var domElementForEntry = this.tarFileEntryToDomElement(entry);
                    tableEntries.appendChild(domElementForEntry);
                }
                returnValue.appendChild(tableEntries);
                return returnValue;
            }
            static divTarFileRefresh() {
                // hack - This should perhaps be refactored.
                var d = document;
                var tarFile = TarFileExplorer.Globals.Instance.tarFile;
                var tarFileAsDOMElement = DomDisplayHelper.tarFileToDOMElement(tarFile);
                var divTarFile = document.getElementById("divTarFile");
                divTarFile.innerHTML = "";
                divTarFile.appendChild(tarFileAsDOMElement);
                var selectDirectoryToAddFileTo = d.getElementById("selectDirectoryToAddFileTo");
                selectDirectoryToAddFileTo.innerHTML = "";
                var optionRoot = d.createElement("option");
                optionRoot.innerHTML = "[root]";
                selectDirectoryToAddFileTo.appendChild(optionRoot);
                var entriesForDirectories = tarFile.entriesForDirectories();
                for (var i = 0; i < entriesForDirectories.length; i++) {
                    var entry = entriesForDirectories[i];
                    var option = d.createElement("option");
                    option.innerHTML = entry.header.fileName;
                    selectDirectoryToAddFileTo.appendChild(option);
                }
            }
        }
        TarFileExplorer.DomDisplayHelper = DomDisplayHelper;
    })(TarFileExplorer = ThisCouldBeBetter.TarFileExplorer || (ThisCouldBeBetter.TarFileExplorer = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
