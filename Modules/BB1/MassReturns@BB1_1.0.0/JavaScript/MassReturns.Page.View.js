/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Profile
define(
	'MassReturns.Page.View', [
		'GlobalViews.Message.View', 'Backbone.FormView', 'SC.Configuration'

		, 'massreturns.tpl'

		, 'Backbone', 'underscore', 'Utils'
	],
	function (
		GlobalViewsMessageView, BackboneFormView, Configuration

		, massreturns_tpl

		, Backbone, _
	) {
		'use strict';



		// @class MassReturns.Page.View @extends Backbone.View
		return Backbone.View.extend({

			template: massreturns_tpl

				,
			page_header: _('Create Mass Return').translate()

				,
			title: _('Create Mass Return').translate()

				,

			events: {

				'change form:has([data-action="reset"])': 'toggleReset',
				'keyup form:has([data-action="reset"])': 'toggleReset',
				'click [data-action="submit"]': 'save',
				'click [data-action="reset"]': 'resetForm',
				'click [data-action="add"]': 'addItem',
				'click [data-action="delete"]': 'deleteItem'
			}

			,
			initialize: function () {
				this.model.on('saveCompleted', _.bind(this.resetForm, this));

				BackboneFormView.add(this);

				if (!window._sessioninterval) {
					window._sessioninterval = window.setInterval(function () {
						$.get('services/LiveOrder.Service.ss');

					}, 60 * 1000);
				}
			},
			getReturnItems: function () {
				var returnitems;
				if (typeof (Storage) !== "undefined") {
					returnitems = localStorage.getItem("returnitems");

					if (returnitems) {
						try {
							returnitems = JSON.parse(returnitems);
						} catch (err) {
							returnitems = [];
						}
					} else {
						returnitems = this.model.get("returnitems") || [];
					}
				} else {
					returnitems = this.model.get("returnitems") || [];
				}
				return returnitems;
			},
			rendera: function () {
				this._render();
				console.log("render");
				var self = this;
				setTimeout(function () {
					var returnitems = self.getReturnItems();
					self.renderItems(returnitems);
				}, 1000);
			},
			setReturnItems: function (returnitems) {
				this.model.set("returnitems", returnitems);
				if (typeof (Storage) !== "undefined") {
					localStorage.setItem("returnitems", JSON.stringify(returnitems));
				}
			},
			save: function (event) {

				var returnitems = this.getReturnItems();
				if (!returnitems || returnitems.length == 0) {
					var global_view_message = new GlobalViewsMessageView({
						message: _('Add items before sending.').translate(),
						type: 'error',
						closable: true
					});

					//this.showContent();
					this.$('#alert-save-placeholder').html("<br />" + global_view_message.render().$el.html());
					return;
				}

				this.saveForm(event);
			},
			deleteItem: function (event) {
				var index = parseInt(jQuery(event.currentTarget).attr("data-index"));
				var returnitems = this.getReturnItems();
				returnitems.splice(index, 1);
				this.setReturnItems(returnitems);
				this.renderItems(returnitems);
			},
			addItem: function (event) {
				event.preventDefault();
				console.log("add item");
				//this.model.validate()
				var item = {
					"id": jQuery("#item").val(),
					"name": $("#item option:selected").text()
				};
				var quantity = 0;
				try {
					quantity = parseInt(jQuery("#quantity").val());
				} catch (e) {}
				var reason = {
					"id": jQuery("#reason").val(),
					"value": $("#reason option:selected").text()
				};
				var serialnumbers = jQuery("#serialnumbers").val();

				//validate
				if (!item.id) {
					var global_view_message = new GlobalViewsMessageView({
						message: _('An item is required.').translate(),
						type: 'error',
						closable: true
					});
					this.$('#alert-item-placeholder').html("<br />" + global_view_message.render().$el.html());
					return;
				} else {
					this.$('#alert-item-placeholder').html("");
				}
				if (quantity < 1) {
					var global_view_message = new GlobalViewsMessageView({
						message: _('Quantity must be a number greater than zero.').translate(),
						type: 'error',
						closable: true
					});
					this.$('#alert-quantity-placeholder').html("<br />" + global_view_message.render().$el.html());
					return;
				} else {
					this.$('#alert-quantity-placeholder').html("");
				}
				if (!reason.id) {
					var global_view_message = new GlobalViewsMessageView({
						message: _('A return reason is required.').translate(),
						type: 'error',
						closable: true
					});
					this.$('#alert-reason-placeholder').html("<br />" + global_view_message.render().$el.html());
					return;
				} else {
					this.$('#alert-reason-placeholder').html("");
				}

				if (!serialnumbers || serialnumbers.length == 0) {
					var global_view_message = new GlobalViewsMessageView({
						message: _('Serial numbers are required.').translate(),
						type: 'error',
						closable: true
					});
					this.$('#alert-serial-placeholder').html("<br />" + global_view_message.render().$el.html());
					return;
				} else {
					this.$('#alert-serial-placeholder').html("");
				}

				//add
				var returnitems = this.getReturnItems();
				returnitems.unshift({
					"item": item,
					"quantity": quantity,
					"reason": reason,
					"serialnumbers": serialnumbers
				});
				this.setReturnItems(returnitems);
				this.renderItems(returnitems);

			},
			renderItems: function (returnitems) {

				if (returnitems.length == 0) {
					jQuery("#massreturns-list").html(_('No Items Added').translate());
					return _('No Items Added').translate();
				} else {
					var body = "<table cellpadding=\"10\" class=\"massreturns-table\">";
					body += "<tr><th class=\"massreturns-th\">Item</th><th class=\"massreturns-th\">Quantity</th><th class=\"massreturns-th\">Reason</th><th class=\"massreturns-th\">Serial Numbers</th><th></th></tr>";
					for (var i = 0; i < returnitems.length; i++) {
						body += "<tr><td class=\"massreturns-td\">" + returnitems[i].item.name + "</td><td class=\"massreturns-td\">" + returnitems[i].quantity + "</td><td class=\"massreturns-td\">" + returnitems[i].reason.value + "</td><td class=\"massreturns-td\">" + returnitems[i].serialnumbers + "</td><td class=\"massreturns-td\"><a data-action=\"delete\" data-index=\"" + i + "\">delete</a></td></tr>";
					}
					body += "</table>";
					jQuery("#massreturns-list").html(body);
					return body;
				}
			},
			resetForm: function (event) {
					jQuery("#item").val("");
					jQuery("#reason").val("");
					jQuery("#serialnumbers").val("");
					jQuery("#quantity").val("1");
					this.setReturnItems([]);
					jQuery("#massreturns-list").html(_('No Items Added').translate());
					event && event.preventDefault();
					this.showSuccess();
				}

				,
			showSuccess: function () {
					if (this.$savingForm) {
						var global_view_message = new GlobalViewsMessageView({
							message: _('Return successfully created.').translate(),
							type: 'success',
							closable: true
						});

						this.showContent();
						this.$('[data-type="alert-placeholder"]').html(global_view_message.render().$el.html());
					}
				}

				//@method getSelectedMenu
				,
			getSelectedMenu: function () {
					return 'massreturn';
				}
				//@method getBreadcrumbPages
				,
			getBreadcrumbPages: function () {
					return {
						text: this.title,
						href: '/massreturn'
					};
				}

				// @method getContext @return MassReturns.Page.View.Context
				,
			getContext: function () {
				var items = this.model.get("items");

				//,{"id": "3","value": "Leaking"}

				var reasons = [{
						"id": "18",

						"value": "Banding"
					},

					{
						"id": "4",

						"value": "Broken/Damaged"
					},

					{
						"id": "17",

						"value": "Dots on page"
					},

					{
						"id": "20",

						"value": "Faded Prints"
					},

					{
						"id": "19",

						"value": "Ghosting"
					},

					{
						"id": "1",

						"value": "Incorrectly Ordered"
					},

					{
						"id": "21",

						"value": "Leaking (during use)"
					},

					{
						"id": "22",

						"value": "Leaking (in packaging)"
					},

					{
						"id": "16",

						"value": "Lines on page"
					},

					{
						"id": "23",

						"value": "No longer Required"
					},

					{
						"id": "24",

						"value": "Not Fitting"
					},

					{
						"id": "2",

						"value": "Not Recognised/Electrics"
					},

					{
						"id": "5",

						"value": "Poor Print Quality"
					}
				];

				// @class MassReturns.Page.View.Context
				return {
					// @property {String} pageHeader 
					pageHeader: this.page_header
						//@property {Boolean} showBackToAccount
						,
					showBackToAccount: Configuration.get('siteSettings.sitetype') === 'STANDARD',
					items: items,
					reasons: reasons,
					renderItems: this.renderItems(this.getReturnItems())

				};
			}
		});
	});