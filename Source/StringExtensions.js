
function StringExtensions()
{
	// extension class
}

{
	String.prototype.padLeft = function(lengthToPadTo, charToPadWith)
	{
		var returnValue = this;

		while (returnValue.length < lengthToPadTo)
		{
			returnValue = charToPadWith + returnValue;
		}

		return returnValue;
	}


	String.prototype.padRight = function(lengthToPadTo, charToPadWith)
	{
		var returnValue = this;

		while (returnValue.length < lengthToPadTo)
		{
			returnValue += charToPadWith;
		}

		return returnValue;
	}
}
