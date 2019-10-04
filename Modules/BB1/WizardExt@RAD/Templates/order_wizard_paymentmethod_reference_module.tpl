{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.

	BB1 G Truslove July 2017
}}

<div class="order-wizard-paymentmethod-purchasenumber-module-shrink">
	<h3 class="order-wizard-paymentmethod-reference-module-title">
		{{translate 'Comments'}}
	 </h3><span class="order-wizard-paymentmethod-reference-module-optional"> {{ translate '(Optional)' }} </span>
	<div class="order-wizard-paymentmethod-row">
		<textarea
			type="text"
			name="order-reference"
			id="order-reference"
			class="input-textarea"
			style="width:100%;"
		>{{orderReference}}</textarea>
	</div>
</div>