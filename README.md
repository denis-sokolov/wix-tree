# Wix tree test

## Usage

Simplest use case to display a form that allows to build a tree.

```javascript
wixtree($('.tree'));
```

You can initialize the tree with predefined structure:

```javascript
wixtree($('.tree'), [
  {
    name: 'Fruits',
    children: [
      'Peach',
      'Banana',
      {
        name: 'Citrus',
        children: [
          'Orange',
          'Lemon'
        ]
      }
    ]
  }
]);
```

All calls to the module return promises.

### DOM structure

Some parts of the DOM structure is public API and you can rely on them.

Every category is represented by a `.category`. Every category contains a `.category-name` container with text, and a `.category-children` container containing more `.category`s.

Every category and the root container contains a `form.add-subcategory` that, when submitted, will add a new subcategory with a name in the `input[type="text"][name="name"]`.

