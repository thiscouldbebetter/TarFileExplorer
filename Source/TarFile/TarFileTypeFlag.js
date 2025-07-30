"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var TarFileExplorer;
    (function (TarFileExplorer) {
        class TarFileTypeFlag {
            constructor(value, name) {
                this.value = value;
                this.id = "_" + this.value;
                this.name = name;
            }
            static Instances() {
                if (TarFileTypeFlag._instances == null) {
                    TarFileTypeFlag._instances = new TarFileTypeFlag_Instances();
                }
                return TarFileTypeFlag._instances;
            }
            static byId(id) {
                return TarFileTypeFlag.Instances()._AllById.get(id);
            }
        }
        TarFileExplorer.TarFileTypeFlag = TarFileTypeFlag;
        class TarFileTypeFlag_Instances {
            constructor() {
                var tftf = (id, name) => new TarFileTypeFlag(id, name);
                this.Normal = tftf("0", "Normal");
                this.HardLink = tftf("1", "Hard Link");
                this.SymbolicLink = tftf("2", "Symbolic Link");
                this.CharacterSpecial = tftf("3", "Character Special");
                this.BlockSpecial = tftf("4", "Block Special");
                this.Directory = tftf("5", "Directory");
                this.FIFO = tftf("6", "FIFO");
                this.ContiguousFile = tftf("7", "Contiguous File");
                this.LongFilePath = tftf("L", "././@LongLink");
                // Additional types not implemented:
                // 'g' - global extended header with meta data (POSIX.1-2001)
                // 'x' - extended header with meta data for the next file in the archive (POSIX.1-2001)
                // 'A'-'Z' - Vendor specific extensions (POSIX.1-1988)
                // [other values] - reserved for future standardization
                this._All =
                    [
                        this.Normal,
                        this.HardLink,
                        this.SymbolicLink,
                        this.CharacterSpecial,
                        this.BlockSpecial,
                        this.Directory,
                        this.FIFO,
                        this.ContiguousFile,
                        this.LongFilePath,
                    ];
                this._AllById = new Map(this._All.map(x => [x.id, x]));
            }
        }
        TarFileExplorer.TarFileTypeFlag_Instances = TarFileTypeFlag_Instances;
    })(TarFileExplorer = ThisCouldBeBetter.TarFileExplorer || (ThisCouldBeBetter.TarFileExplorer = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
