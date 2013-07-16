# Filterade.js

Filtering and pagination with options, from Canada. Check out <a href="http://esselsolutions.ca/filteradejs/" target="_blank">the demo</a>

## How to Use

Just include jQuery and Filterade into your page:

```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="scripts/jquery.filterade.min.js"></script>
```


Here's one way you could call Filterade on your content:

```js
$('#content').Filterade({
  filterControls: '#filter-controls',
  useFilters:     'true',
  pageLimit:      10
});
```


Minimum configuration doesn't require any parameters. Pagination works out of the box, but filters are disabled by default. Check the documentation below to read on options and defaults.


#### Pagination

If pagination is enabled, you'll want to make an empty list where you want your page controls:

```html
<ul id="page-controls"></ul>
```


#### Filters

To filter through content, first you need to place the controls in a container. Make sure to set the id of the input to be the name of the filter you'd like it to control:

```html
<fieldset id="filter-controls">
  <input type="radio" name="filters" id="all">
  <label for="all">All</label>
  <input type="radio" name="filters" id="all">
  <label for="all">Coffee</label>
  <input type="radio" name="filters" id="all">
  <label for="all">Tea</label>
</fieldset>
```

To categorize content, use the :

```html
<ul id="content">
  <li data-filter="coffee">Beans</li>
  <li data-filter="tea">Leaves</li>
  <li data-filter="coffee">Powder</li>
</ul>
```


### Options

##### useFilters
Whether or not to use category filters
```
default: false
```
##### filterControls       
The container including all your filter &lt;input&gt;s
```
default: '#filter-controls'
```
##### defaultFilter:        
The id of the filter that should be focused on pageload
```
default: none
```
##### selectAll
The id of the filter that shows all content
```
default: 'all'
```
##### usePagination
Whether or not to paginate the content
```
default: true
```
##### pageLimit:
The amount of items to show per page
```
default: 15
```
##### pageControls
The container for the page controls (i.e., the 'previous', 'next' &amp; numbered controls)
```
default: '#page-controls'
```
##### previousButtonClass
default: 'previous'
...

##### previousButtonLabel
default: 'Previous'

...

##### nextButtonClass
default: 'next'

...

##### nextButtonLabel
default: 'Next'

...

##### pagerClass
default: 'page'

...

##### activeClass
default: 'active' 

...

##### log
default: false

...
