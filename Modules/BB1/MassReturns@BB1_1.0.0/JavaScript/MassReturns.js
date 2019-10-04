/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// MassReturns.js
// -----------------
// Defines the MassReturns module (Collection, Views, Router)
// As the MassReturns is instanciated in the application (without definining a model)
// the validation is configured here in the mountToApp
define(
	'MassReturns'
,	[
		'MassReturns.Router'
	,	'MassReturns.Model'
	,	'underscore'
	,	'jQuery'
	,	'Utils'
	]
,	function (
		Router
	,	MassReturnsModel
	,	_
	,	jQuery
	)
{
	'use strict';

	return	{
		Router: Router
	,	MenuItems: function () 
		{
			
			return {
				parent: 'orders'
			,	id: 'massreturn'
			,	name: _('Mass Returns').translate()
			,	url: 'massreturn'
			,	index: 3
			};
		}

	,	mountToApp: function (application)
		{
			return new Router(application);
		}
	};
});
