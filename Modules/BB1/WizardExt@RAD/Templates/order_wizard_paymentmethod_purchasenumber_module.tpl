{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="order-wizard-paymentmethod-purchasenumber-module-shrink">
	<h3 class="order-wizard-paymentmethod-purchasenumber-module-title">
		{{translate 'Purchase Order Number'}}
	 </h3>
	<div class="order-wizard-paymentmethod-purchasenumber-module-row">
		<label for="purchase-order-number" class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-label">
			{{translate 'Enter Purchase Order Number'}} <span class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-optional"> {{ translate '(Optional)' }} </span>
		</label>
		<input
			type="text"
			name="purchase-order-number"
			id="purchase-order-number"
			class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-value"
			value="{{purchaseNumber}}"
		>
	</div>
</div>