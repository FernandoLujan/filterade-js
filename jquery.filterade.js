/*!
# @author Fernando Lujan
#
# @title  Filterade.js
# @url    https://github.com/FernandoLujan/filterade-js
# @desc   Filters and pagination with options, from Canada
*/

;(function ( $, window, document, undefined ) {
  return $.fn.Filterade = function(options) {
    var activeFilter, activePage, container, defaults, filterControls, filterResults, filters, getPageCount, initialize, nodes, pageControls, pageCount, paginateControls, paginateResults, updateView;
    defaults = {
      useFilters: false,
      filterControls: '#filter-controls',
      defaultFilter: '',
      selectAll: 'all',
      usePagination: true,
      pageLimit: 15,
      pageControls: '#page-controls',
      previousButtonClass: 'previous',
      previousButtonLabel: 'Previous',
      nextButtonClass: 'next',
      nextButtonLabel: 'Next',
      pagerClass: 'page',
      activeClass: 'active',
      log: false
    };
    container = $(this.selector);
    pageControls = $(options.pageControls || defaults.pageControls);
    filterControls = $(options.filterControls || defaults.filterControls);
    nodes = container.children();
    activePage = 1;
    pageCount = Math.ceil(nodes.length / options.pageLimit);
    filters = [];
    activeFilter = 0;
    /*
        # @getPageCount
        # Calculate page count
    */

    getPageCount = function() {
      var nodeCount;
      if (options.usePagination || defaults.usePagination) {
        nodeCount = 0;
        nodes.each(function() {
          if ($(this).is(':visible')) {
            return nodeCount++;
          }
        });
        pageCount = Math.ceil(nodeCount / (options.pageLimit || defaults.pageLimit));
        if (options.log || defaults.log) {
          console.log('[Filterade.nodes.length]: ' + nodeCount);
          return console.log('[Filterade.pageCount]: ' + pageCount);
        }
      }
    };
    /*
        # @paginateControls
        # Hide/display content based on pagination
    */

    paginateControls = function() {
      var i, _i;
      if (options.usePagination || defaults.usePagination) {
        pageControls.empty();
        if (pageCount > 1) {
          if (activePage !== 1) {
            pageControls.prepend('<li><a href="#" class="' + (options.previousButtonClass || defaults.previousButtonClass) + '">' + (options.previousButtonLabel || defaults.previousButtonLabel) + '</a></li>');
          }
          for (i = _i = 1; 1 <= pageCount ? _i <= pageCount : _i >= pageCount; i = 1 <= pageCount ? ++_i : --_i) {
            pageControls.append('<li><a href="#" class="' + (options.pagerClass || defaults.pagerClass) + '" data-page="' + +i + '">' + i + '</a></li>');
          }
          if (activePage < pageCount) {
            pageControls.append('<li><a href="#" class="' + (options.nextButtonClass || defaults.nextButtonClass) + '">' + (options.nextButtonLabel || defaults.nextButtonLabel) + '</a></li>');
          }
          pageControls.find('a[data-page="' + activePage + '"]').addClass(options.activeClass || defaults.activeClass);
          pageControls.find('a.' + (options.pagerClass || defaults.pagerClass)).click(function(e) {
            e.preventDefault();
            activePage = parseInt($(this).attr('data-page'));
            pageControls.find('a.' + (options.activeClass || defaults.activeClass)).removeClass(options.activeClass || defaults.activeClass);
            pageControls.find('a[data-page="' + activePage + '"]').addClass(options.activeClass || defaults.activeClass);
            return updateView();
          });
          pageControls.find('a.' + (options.previousButtonClass || defaults.previousButtonClass)).click(function(e) {
            e.preventDefault();
            activePage--;
            return updateView();
          });
          return pageControls.find('a.' + (options.nextButtonClass || defaults.nextButtonClass)).click(function(e) {
            e.preventDefault();
            activePage++;
            return updateView();
          });
        }
      }
    };
    /*
        # @paginateResults
        # Only displays results within the active page
    */

    paginateResults = function() {
      var nodeIndex;
      if (options.usePagination || defaults.usePagination) {
        nodeIndex = 0;
        return nodes.each(function() {
          if ($(this).is(':visible')) {
            nodeIndex++;
            if (nodeIndex > (activePage * (options.pageLimit || defaults.pageLimit) - (options.pageLimit || defaults.pageLimit)) && nodeIndex <= ((options.pageLimit || defaults.pageLimit) * activePage)) {
              return $(this).show();
            } else {
              return $(this).hide();
            }
          }
        });
      }
    };
    /*
        # @filterResults
        # Hide/display content based on the active filter
    */

    filterResults = function() {
      nodes.show();
      if (options.useFilters || defaults.useFilters) {
        if (filters[activeFilter] === (options.selectAll || defaults.selectAll)) {
          return nodes.each(function() {
            return $(this).show();
          });
        } else {
          return nodes.each(function() {
            if ($(this).attr('data-filter') !== filters[activeFilter]) {
              return $(this).hide();
            }
          });
        }
      }
    };
    /*
        # @updateView
        # Update controls and containers
    */

    updateView = function() {
      filterResults();
      getPageCount();
      paginateControls();
      return paginateResults();
    };
    /*
        # @initialize
        # Configures plugin defaults and updates the document when done
    */

    initialize = function() {
      if (options.useFilters || defaults.useFilters) {
        filterControls.find('input').each(function(index) {
          return filters[$(this).attr('value') || index] = $(this).attr('id');
        });
        if (options.log || defaults.log) {
          console.log('[Filterade.filters]: ' + filters);
        }
        activeFilter = filters.indexOf(options.defaultFilter || defaults.defaultFilter);
        if (options.log || defaults.log) {
          console.log('[Filterade.activeFilter]: ' + filters[activeFilter]);
        }
        filterControls.find('input[checked="checked"]').attr('checked', '');
        filterControls.find('input[id="' + filters[activeFilter] + '"]').attr('checked', 'checked');
        filterControls.find('input').click(function() {
          activeFilter = filters.indexOf($(this).attr('id'));
          activePage = 1;
          updateView();
          if (options.log) {
            return console.log('[Filterade.activeFilter]: ' + filters[activeFilter]);
          }
        });
      }
      return updateView();
    };
    return initialize();
  };
})( jQuery, window, document );
