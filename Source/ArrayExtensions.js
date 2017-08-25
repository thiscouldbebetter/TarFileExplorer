
// extensions

function ArrayExtensions()
{
	// extension class
}

{
	Array.prototype.remove = function(elementToRemove)
	{
		this.splice(this.indexOf(elementToRemove), 1);
	}
}
