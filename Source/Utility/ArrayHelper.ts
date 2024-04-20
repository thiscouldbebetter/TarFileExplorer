
namespace ThisCouldBeBetter.TarFileExplorer
{
	export class ArrayHelper
	{
		static removeElementFromArray(elementToRemove: any, array: Array<any>)
		{
			array.splice(array.indexOf(elementToRemove), 1);
		}
	}
}
