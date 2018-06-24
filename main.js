AutoForm.addInputType(
  'simple-selectize',
  {
    template: 'simpleSelectize',

    valueOut: function() {
      // returnings selected value:
      return this[0].value;
    },

    contextAdjust: function(context) {
      // adjusting values:
      context.selectizeOptions = context.atts.selectizeOptions;
      delete context.atts.selectizeOptions;
      return context;
    },

    valueConverters: {
      'stringArray': AutoForm.valueConverters.stringToStringArray
    }
  }
);
