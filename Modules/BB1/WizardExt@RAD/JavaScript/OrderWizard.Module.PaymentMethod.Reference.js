/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.

	BB1 G Truslove July 2017
*/

//@module OrderWizard.Module.PaymentMethod
define(
	'OrderWizard.Module.PaymentMethod.Reference'
,	[	
		'Wizard.Module'
	,	'SC.Configuration'
	,	'order_wizard_paymentmethod_reference_module.tpl'
	,	'jQuery'
	]
,	function (
		WizardModule
	,	Configuration
	,	order_wizard_paymentmethod_reference_module_tpl
	,	jQuery
	)
{
	'use strict';

	return WizardModule.extend({
		//@property {Function} template
		template: order_wizard_paymentmethod_reference_module_tpl

		//@property {String} className
	,	className: 'OrderWizard.Module.PaymentMethod.Reference'

	,	isActive: function ()
		{
			return true;
		}

	,	submit: function ()
		{

			var order_reference = this.$('[name=order-reference]').val() || '';
var options=this.wizard.model.get('options');
options.custbody_bb1_comments=order_reference;
			this.wizard.model.set('options', options);

			return jQuery.Deferred().resolve();
		}

		//@method getContext 
		//@returns {OrderWizard.Module.PaymentMethod.Creditcard.Context}
	,	getContext: function ()
		{		
		//console.log(JSON.stringify(this.wizard.model));
			return {
				//@property {String} orderReference
				orderReference: this.wizard.model.get('options').custbody_bb1_comments
			};
		}
	});
});
