# Simple Selectize for AutoForm

This packages is a Selectize.js wrap for AutoForm focused of including it in the simplest way. Indeed, it doesn't even include Selectize itself.

## What?

Yes, you have to include Selectize.js yourself, using another Meteor package or including it any other way (npm, adding sources, etc...) so you can use any version you want.

## Yet another Selectize package?

Short answer: yes. Long answer: all the package I've used that include Selectize for Meteor or AutoForm performed some operations within data or didn't pass all Selectize options. This packages does.

Quick example: my documents have `_id` and `name` fields I use in Selectize selectors. Using other packages, I had to perform this operation when initializing them:

```javascript
  options: MyCollection.find().map(doc => {return {label: doc.name, value: doc._id}})
```

Ok, it's simple and, form small collections, it works like a charm but... what happens when my collection grows a little bigger? Let's say 10k docs. This map iterates over every doc in the collections, this is, 10k iterations. And it's reactive so, any changes in one doc, triggers another 10k iterations.

When you analyze it, it gets even worse: some package do already perform a `map` over the elements on their own. We're talking about 20k iteration in the best case.

This package performs **no iterations** over the elements. It just passes them as an options to the Selectize package. Also, it passes all options to Selectize so you can use any options on [it's documentation](https://github.com/selectize/selectize.js/blob/master/docs/usage.md).

## How to use?

Being an AutoForm custom input it is used in a similar way to others. Check this example:

```javascript
labels: {
  type: [String],
  label: function () {
    return I18N.translate('labels');
  },
  optional: true,
  autoform: {
    type: "simple-selectize",
    multiple: true,
    selectizeOptions: {
      sortField: 'name',
      searchField: 'name',
      labelField: 'name',
      valueField: '_id'
    },
    options: function () {
      return Labels.find(selector).fetch();
    }
  }
},
```

Important fields here are **type** which sould be set to `simple-selectize` and `options` which should be the documents used to populate the selector.

Also, take a look at this fields:

* **multiple**: it's the only options this package takes care of. If it's not present or it's set to `false`, it's sets the `maxItems` option to 1. Any other way, it does **nothing**.
* **selectizeOptions**: this object contains Selectize.js options. It gets passed to Selectize _as is_, just adding the `options` field to it (so Selectize knows the options it has to show).

In the example above, we're telling Selectize to use `_id` and `name` as the fields to get `value` and `label` respectively. This translates into no mapping needed in our end (no idea what Selectize does in it's own).
