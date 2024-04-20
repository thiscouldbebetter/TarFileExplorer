
class StringHelper
{
	static padStringLeftToLengthWithChar
	(
		stringToPad: string, lengthToPadTo: number, charToPadWith: string
	): string
	{
		var returnValue = stringToPad;

		while (returnValue.length < lengthToPadTo)
		{
			returnValue = charToPadWith + returnValue;
		}

		return returnValue;
	}

	static padStringRightToLengthWithChar
	(
		stringToPad: string, lengthToPadTo: number, charToPadWith: string
	): string
	{
		var returnValue = stringToPad;

		while (returnValue.length < lengthToPadTo)
		{
			returnValue += charToPadWith;
		}

		return returnValue;
	}
}
