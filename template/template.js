Template.simpleSelectize.onRendered(function() {
  let _self = this;
  // getting values:
  let elementId = _self.data.atts.id;
  let selectizeOptions = _self.data.selectizeOptions;
  let options = {options: _self.data.selectOptions};
  if (!_self.data.atts.multiple) selectizeOptions.maxItems = 1;
  // creating selectize:
  _self.selectize = $('#' + elementId).selectize(_.extend(selectizeOptions, options));
  // setting default value if provided:
  if (_self.data.value) $('#' + elementId)[0].selectize.setValue(_self.data.value);
});

Template.simpleSelectize.helpers({
  'forceReactivity'() {
    let template = Template.instance();
    if (template.selectize && (template.data.selectOptions || template.data.selectizeOptions)) {
      let selectize = template.selectize[0].selectize;
      if (selectize) {
        // get currently selected option:
        let selectedOption = (selectize.items && selectize.items.length) ? selectize.options[selectize.items[0]] : null;
        // clear current options:
        selectize.clearOptions();
        // add new options:
        if (template.data.selectOptions && template.data.selectOptions.length) {
          template.data.selectOptions.map(option => selectize.addOption(option));
          // if previously selected options, set it as selected again:
          if (selectedOption) {
            selectize.addOption(selectedOption);
            selectize.setValue(selectedOption._id);
          }
        }
      }
    }
  }
});
