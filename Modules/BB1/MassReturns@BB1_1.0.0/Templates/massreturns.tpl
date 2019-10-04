{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

{{#if showBackToAccount}}
	<a href="/" class="massreturns-button-back">
		<i class="massreturns-button-back-icon"></i>
		{{translate 'Back to Account'}}
	</a>
{{/if}}

<section class="massreturns">
	<h2 class="massreturns-form-title">{{pageHeader}}</h2>
	<div data-type="alert-placeholder"></div>
	<div class="massreturns-form-area">
		<form class="massreturns-form">
			<fieldset>
				<small class="massreturns-form-label">{{translate 'Required'}} <span class="massreturns-form-group-label-required">*</span></small>

				<div class="massreturns-form-group" data-input="item" data-validation="control-group">
					<label class="massreturns-form-group-label" for="item">{{translate 'Item'}} <span class="massreturns-form-group-label-required">*</span></label>
					<div id="alert-item-placeholder"></div>
					<div  class="massreturns-group-form-controls" data-validation="control">
						<select class="massreturns-form-group-input" id="item" name="item">
						<option></option>
						{{#each items}}
    <option value="{{this.id}}">{{this.name}}</option>
  {{/each}}
						</select>
						
					</div>
				</div>
				
				<div class="massreturns-form-group" data-input="quantity" data-validation="control-group">
					<label class="massreturns-form-group-label" for="quantity">{{translate 'quantity'}} <span class="massreturns-form-group-label-required">*</span></label>
					<div id="alert-quantity-placeholder"></div>
					<div  class="massreturns-group-form-controls" data-validation="control">
						<input type="number" class="massreturns-form-group-input" id="quantity" name="quantity" value="1" min="1">
					</div>
				</div>

				<div class="massreturns-form-group" data-input="reason" data-validation="control-group">
					<label class="massreturns-form-group-label" for="reason">{{translate 'Reason for Return'}} <span class="massreturns-form-group-label-required">*</span></label>
					<div id="alert-reason-placeholder" ></div>
					<div  class="massreturns-group-form-controls" data-validation="control">
						<select class="massreturns-form-group-input" id="reason" name="reason" value="">
						<option></option>
						{{#each reasons}}
    <option value="{{this.id}}">{{this.value}}</option>
  {{/each}}
						</select>
					</div>
				</div>

				<div class="massreturns-form-group" data-input="serialnumbers" data-validation="control-group">
					<label class="massreturns-form-group-label" for="serialnumbers">{{translate 'Serial Numbers'}} <span class="massreturns-form-group-label-required">*</span></label>
					<div id="alert-serial-placeholder" ></div>
					<div  class="massreturns-group-form-controls" data-validation="control">
						<input type="text" class="massreturns-form-group-input" id="serialnumbers" name="serialnumbers" value="">
					</div>
				</div>
			</fieldset>
			<div class="massreturns-form-actions">
				<button data-action="add" class="order-history-list-header-button-active">{{translate '+ Add Item'}}</button>
			</div>
			<br />
			<div id="massreturns-list">
			{{{renderItems}}}
			</div>
			<div id="alert-save-placeholder"></div>
			<div class="massreturns-form-actions">
				<button data-action="submit" class="massreturns-form-actions-update">{{translate 'Send'}}</button>
				<button type="reset" class="massreturns-form-actions-reset hide" data-action="reset">{{translate 'Reset'}}</button>
			</div>
		</form>
	</div>
</section>