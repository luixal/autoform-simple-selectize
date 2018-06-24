Template.simpleSelectize.onCreated(function() { console.log('onCreated!'); console.log(this);});

Template.simpleSelectize.onRendered(function() {
  // getting values:
  let elementId = this.data.atts.id;
  let selectizeOptions = this.data.selectizeOptions;
  let options = {options: this.data.selectOptions};
  if (!this.data.atts.multiple) selectizeOptions.maxItems = 1;
  // creating selectize:
  $('#' + elementId).selectize(_.extend(selectizeOptions, options));
  // setting default value if provided:
  if (this.data.value) $('#' + elementId)[0].selectize.setValue(this.data.value);
});
