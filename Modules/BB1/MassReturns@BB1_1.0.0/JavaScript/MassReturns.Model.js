/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// MassReturns.Model.js
// -----------------------
// View Model for changing user's password
// @module Profile
define(
	'MassReturns.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	)
{
	'use strict';

	// @class MassReturns.Model @extends Backbone.Model
	return Backbone.Model.extend(
	{
		urlRoot: 'services/MassReturns.Service.ss'
		
	});
});