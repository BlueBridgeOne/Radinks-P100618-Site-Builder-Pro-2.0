/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// MassReturns.ServiceController.js
// ----------------
// Service to manage MassReturns requests
define(
	'MassReturns.ServiceController'
,	[
		'ServiceController'
	,	'Models.Init'
	,	'MassReturns.Model'
	]
,	function(
		ServiceController
	,	ModelsInit
	,	MassReturnsModel
	)
	{
		'use strict';

		// @class MassReturns.ServiceController Manage MassReturns requests
		// @extend ServiceController
		return ServiceController.extend({

			// @property {String} name Mandatory for all ssp-libraries model
			name: 'MassReturns.ServiceController'

			// @property {Service.ValidationOptions} options. All the required validation, permissions, etc.
			// The values in this object are the validation needed for the current service.
			// Can have values for all the request methods ('common' values) and specific for each one.

		// @method get The call to MassReturns.Service.ss with http method 'get' is managed by this function
		// @return {MassReturns.Model.Item}
		,	get: function()
			{
				return MassReturnsModel.get();
			}

		// @method put The call to MassReturns.Service.ss with http method 'post' is managed by this function
		// @return {MassReturns.Model.Item}
		,	post: function()
			{
				// Pass the data to the MassReturns's update method and send it response
				MassReturnsModel.update(this.data);
				return MassReturnsModel.get();
			}
		});
	}
);