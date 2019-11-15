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
  if (_self.data.value) {
    let selectize = $('#' + elementId)[0].selectize;
    // if items, but no options, add those items as options and add items:
    if (_.isArray(_self.data.value) && !_.isObject(_self.data.value[0]) && !options.options) {
      _self.data.value.map(
        value => {
          selectize.addOption({value: value, text: value});
          selectize.addItem(value);
        }
      );
    // else, just set values:
    } else {
      selectize.setValue(_self.data.value)
    }
  };
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
            let valueField = (template.data.selectizeOptions && template.data.selectizeOptions.valueField) ? template.data.selectizeOptions.valueField : 'value';
            selectize.setValue(selectedOption[valueField]);
          }
        }
      }
    }
  }
});
