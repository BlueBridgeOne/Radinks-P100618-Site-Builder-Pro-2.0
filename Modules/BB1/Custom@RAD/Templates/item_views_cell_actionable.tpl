{{! © 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code; provided, however, if you are an authorized user with a NetSuite account or log-in, you may use this code subject to the terms that govern your access and use. BB1 G Truslove May 2017 }}
<tr id="{{lineId}}" data-item-id="{{itemId}}" data-type="order-item" itemscope itemtype="http://schema.org/Product" {{#if showGeneralClass}} class="{{generalClass}}" {{/if}}>
	<td class="item-views-cell-actionable-table-middle">
		<table><tr><td class="normal-td">
		<div class="item-views-cell-actionable-name">
			{{#if isNavigable}}
			<a {{linkAttributes}} class="item-views-cell-actionable-name-link">
				{{item._name}}
			</a> {{else}}
			<span class="item-views-cell-actionable-name-viewonly">{{item._name}}</span> {{/if}}
		</div>
</td><td class="normal-td">
		{{#if showSummaryView}}
		<div class="item-views-cell-actionable-summary" data-view="Item.Summary.View"></div>
		{{/if}}
	</td></tr></table>
		{{#if backOrderWarning}}
		<div>
			<p class="item-views-cell-actionable-backorder">This item may be back-ordered. 
			{{#if showBackOrderDate}}
			<b class="item-views-cell-actionable-backorder">More stock due on {{custcol_bb1_itemnextpoduedate}}</b></p>
			{{/if}}
		</div>
		{{/if}}
		<div class="item-views-cell-actionable-price">
			<table><tr><td class="normal-td">
			<div data-view="Item.Price"></div>
</td><td class="normal-td" style="width:25px;"></td><td class="normal-td">

	<span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Amount: ' }}</span>
	<span class="cart-item-summary-amount-value">{{ line.total_formatted}}</span>
	{{#if showComparePrice}}
		<small class="muted cart-item-summary-item-view-old-price">{{ line.amount_formatted}}</small>
	{{/if}}

</td></tr></table>

		</div>

		<!--<div class="item-views-cell-actionable-sku">
			<p>
				<span class="item-views-cell-actionable-sku-label">{{translate 'SKU: '}}</span>
				<span class="item-views-cell-actionable-sku-value">{{ item._sku}}</span>
			</p>
		</div>-->
		<div class="item-views-cell-actionable-options">
			<div data-view="Item.SelectedOptions"></div>
		</div>
		
		<div class="item-views-cell-actionable-stock" data-view="ItemViews.Stock.View">
		</div>
	</td>
	<td class="item-views-cell-actionable-table-last">
		<div data-view="Item.Actions.View"></div>
		{{#if showAlert}}
		<div class="item-views-cell-actionable-alert-placeholder" data-type="alert-placeholder"></div>
		{{/if}} {{#if showCustomAlert}}
		<div class="alert alert-{{customAlertType}}">
			{{item._cartCustomAlert}}
		</div>
		{{/if}}
	</td>
</tr>