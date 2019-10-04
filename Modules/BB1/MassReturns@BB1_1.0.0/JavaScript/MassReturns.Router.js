define('MassReturns.Router', [
  'Backbone',
  'MassReturns.Page.View',
  'MassReturns.Model'
], function (Backbone, MassReturnsPageView, Model) {
  return Backbone.Router.extend({
    initialize: function (application) {
      this.application = application;
    },
    routes: {
      'massreturn': 'MassReturnsPage'
    },
    MassReturnsPage: function () {
      var model = new Model();
      var view = new MassReturnsPageView({
        model: model,
        application: this.application
      });
      model.fetch().done(function () {
        view.showContent();
      });
    }
  });
});