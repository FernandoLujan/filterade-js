# Filterade.js

Filtering and pagination with options, from Canada

## How to Use

Just include jQuery and Filterade into your page:

```html
&lt;script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="scripts/jquery.filterade.min.js"&gt;&lt;/script&gt;
```

Here's one way you could call Filterade on your content:

```js
&lt;script&gt;
$('#content').Filterade({
  filterControls: '#filter-controls',
  useFilters:     'true',
  pageLimit:      10
});
&lt;/script&gt;
```

Minimum configuration doesn't require any parameters. Pagination works out of the box, but filters are disabled by default. Check the documentation below to read on options and defaults.

To filter through content, first you need to place the controls in a container. Make sure to set the id of the input to be the name of the filter you'd like it to control:

```html
&lt;fieldset id="filter-controls"&gt;
  &lt;input type="radio" name="filters" id="all"&gt;
  &lt;label for="all"&gt;All&lt;/label&gt;
  &lt;input type="radio" name="filters" id="all"&gt;
  &lt;label for="all"&gt;Coffee&lt;/label&gt;
  &lt;input type="radio" name="filters" id="all"&gt;
  &lt;label for="all"&gt;Tea&lt;/label&gt;
&lt;/fieldset&gt;
```

If pagination is enabled, you'll want to make an empty list where you want your page controls:

```html
&lt;ul id="filter-controls"&gt;&lt;/ul&gt;
```

To categorize content, use the :

```html
&lt;ul id="content"&gt;
  &lt;li data-filter="coffee"&gt;Beans&lt;/li&gt;
  &lt;li data-filter="tea"&gt;Leaves&lt;/li&gt;
  &lt;li data-filter="coffee"&gt;Powder&lt;/li&gt;
&lt;/ul&gt;
```

## Options

```
useFilters
default: false
```
Whether or not to use category filters

```
filterControls       
default: '#filter-controls'
```
The container including all your filter &lt;input&gt;'s

```
defaultFilter:        
default: none
```
The id of the filter that should be focused on pageload

```
selectAll
default: 'all'
```
The id of the filter that shows all content

```
usePagination
default: true
```
Whether or not to paginate the content

```
pageLimit:
default: 15
```
The amount of items to show per page

```
pageControls
default: '#page-controls'
```
The container for the page controls (i.e., the 'previous', 'next' &amp; numbered controls)

```
previousButtonClass
default: 'previous'
```
...

```
previousButtonLabel
default: 'Previous'
```
...

```
nextButtonClass
default: 'next'
```
...

```
nextButtonLabel
default: 'Next'
```
...

```
pagerClass
default: 'page'
```
...

```
activeClass
default: 'active' 
```
...

```
log
default: false
```
...
