define('MassReturns.Model', [
    'SC.Model'
  ],
  function(SCModel) {
    return SCModel.extend({
      name: 'MassReturns',
      get: function(id) {

        try {
          //get list of all items here!

          var filters = [];
          var columns = [];

          filters.push(['isinactive', 'is', 'F']);
          filters.push('AND');
          filters.push(['isonline', 'is', 'T']);
          columns.push(new nlobjSearchColumn('salesdescription'));

          var res = nlapiSearchRecord('item', null, filters, columns);
          var list = [],
            item;
          for (var i = 0; res != null && i < res.length; i++) {

            item = res[i];

            // nlapiLogExecution("debug","Search", "Result: " + item.getId() + " " + item.getValue("salesdescription"));
            list.push({
              "id": item.getId(),
              "name": item.getValue("salesdescription")
            });


          }
          var swap, change = false;
          do {
          change=false;
            for (var i = 0; i < list.length - 1; i++) {
              if (list[i].name.localeCompare(list[i + 1].name) > 0) {
                swap = list[i];
                list[i] = list[i + 1];
                list[i + 1] = swap;
                change=true;
              }
            }
          } while (change);

          return {
            "items": list
          };
        } catch (err) {
          nlapiLogExecution("error", "Mass Update error: " + err);
          return {};
        }
      },
      update: function(data) {
        data.items = "remove items";
        nlapiLogExecution("error", "Mass Update Post: ", JSON.stringify(data));

if(!data.returnitems||data.returnitems.length==0){
throw "Please add items using the mass returns form.";
}

        var customer = nlapiGetWebContainer().getShoppingSession().getCustomer();

        var fields = ['isperson', 'email', 'internalid', 'name', 'overduebalance', 'phoneinfo', 'companyname', 'firstname', 'lastname', 'middlename', 'emailsubscribe', 'campaignsubscriptions', 'paymentterms', 'creditlimit', 'balance', 'creditholdoverride'];

        var profile = customer.getFieldValues(fields);
        nlapiLogExecution("error", "Mass Update profile: ", JSON.stringify(profile));
        if (!profile.internalid) {
          throw "Please login to send mass returns.";
        }
        var objRecord = nlapiCreateRecord("returnauthorization");
        objRecord.setFieldValue('entity', profile.internalid, true);
        nlapiLogExecution("error", "Mass Update entity: ", profile.internalid + "");
        objRecord.setFieldValue('memo', "Created using checkout mass returns page.", true);
        var lineNum;
        for (var i = 0; i < data.returnitems.length; i++) {
          var lineNum = objRecord.selectNewLineItem('item');
          objRecord.setCurrentLineItemValue('item', 'item', data.returnitems[i].item.id);
          objRecord.setCurrentLineItemValue('item', 'quantity', data.returnitems[i].quantity);
          objRecord.setCurrentLineItemValue('item', 'custcol_bb1_rareason', data.returnitems[i].reason.id);
          if (data.returnitems[i].serialnumbers && data.returnitems[i].serialnumbers != "") {
            objRecord.setCurrentLineItemValue('item', 'custcol1', data.returnitems[i].serialnumbers);
          } else {
            objRecord.setCurrentLineItemValue('item', 'custcol1', 'unknown');
          }
          objRecord.commitLineItem('item');
        }
        nlapiSubmitRecord(objRecord, true);
        return {}
      }
    });
  }
)