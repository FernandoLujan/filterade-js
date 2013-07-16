###!
# @author V. Fernando Lujan
#
# @title  Filterade.js
# @url    http://esselsolutions.ca/filterade
# @desc   Basic filters and pagination for static content
###

$ ->
  $.fn.Filterade = (options) ->

    defaults = {
      useFilters:           false,
      filterControls:       '#filter-controls',
      defaultFilter:        '',
      selectAll:            'all',

      usePagination:        true,
      pageLimit:            15,
      pageControls:         '#page-controls',

      previousButtonClass:  'previous',
      previousButtonLabel:  'Previous',

      nextButtonClass:      'next',
      nextButtonLabel:      'Next',

      pagerClass:           'page',
      activeClass:          'active', 

      log:                  false
    }

    # Container elements
    container       = $ this.selector 
    pageControls    = $ (options.pageControls || defaults.pageControls)
    filterControls  = $ (options.filterControls || defaults.filterControls)

    # Cache the array of nodes to filter
    nodes           = container.children()

    # Pagination
    activePage      = 1 # Start at the 1st page as default
    pageCount       = Math.ceil nodes.length / options.pageLimit # Default is 1 since pagination is off by default

    # This list will be populated by the input elements in filterControls
    filters         = []
    activeFilter    = 0 # Default is the first input in filterControls

    ###
    # @getPageCount
    # Calculate page count
    ###
    getPageCount = ->
      if (options.usePagination || defaults.usePagination)
        nodeCount = 0

        nodes.each ->
          if $(this).is(':visible')
            nodeCount++

        pageCount = Math.ceil nodeCount / (options.pageLimit || defaults.pageLimit)
        if options.log || defaults.log
          console.log '[Filterade.nodes.length]: ' + nodeCount 
          console.log '[Filterade.pageCount]: ' + pageCount 

    ###
    # @paginateControls
    # Hide/display content based on pagination
    ###
    paginateControls = ->
      if (options.usePagination || defaults.usePagination)
        pageControls.empty()
        
        # Don't do anything if we've only got less than 2 pages to display
        if pageCount > 1
          # Don't render 'previous' button if first page is active
          if activePage != 1 
            # Render previous buttons
            pageControls.prepend '<li><a href="#" class="' +
              (options.previousButtonClass || defaults.previousButtonClass) + '">' + 
              (options.previousButtonLabel || defaults.previousButtonLabel) + '</a></li>'

          # Render page numbers
          for i in [1 .. pageCount]
            pageControls.append '<li><a href="#" class="' + (options.pagerClass || defaults.pagerClass) + '" data-page="' + 
              + i + '">' + i + '</a></li>' 

          # Don't render 'next' button if last page is active
          if activePage < pageCount 
            # Render 'next' button
            pageControls.append '<li><a href="#" class="' +
              (options.nextButtonClass || defaults.nextButtonClass) + '">' + 
              (options.nextButtonLabel || defaults.nextButtonLabel) + '</a></li>'

          # Toggle active button
          pageControls.find('a[data-page="' + activePage + '"]').addClass(options.activeClass || defaults.activeClass)

          # Bind pager controls and activePage to clicks
          pageControls.find('a.' + (options.pagerClass || defaults.pagerClass )).click (e) ->
            e.preventDefault()
            activePage = parseInt $(this).attr('data-page') 

            # Replace .active link status
            pageControls.find('a.' + (options.activeClass || defaults.activeClass)).removeClass((options.activeClass || defaults.activeClass))
            pageControls.find('a[data-page="' + activePage + '"]').addClass(options.activeClass || defaults.activeClass)
            updateView()

          # Bind 'previous' and 'next' controls and activePage to clicks
          pageControls.find('a.' + (options.previousButtonClass || defaults.previousButtonClass )).click (e) ->
            e.preventDefault()
            activePage--
            updateView()

          pageControls.find('a.' + (options.nextButtonClass || defaults.nextButtonClass )).click (e) ->
            e.preventDefault()
            activePage++
            updateView()

    ###
    # @paginateResults
    # Only displays results within the active page
    ###
    paginateResults = ->
      if (options.usePagination || defaults.usePagination)
        nodeIndex = 0
        nodes.each () ->
          if $(this).is(':visible')
            nodeIndex++ # Incremend Id only on visible items
            if nodeIndex > (activePage * (options.pageLimit || defaults.pageLimit) - (options.pageLimit || defaults.pageLimit) ) && nodeIndex <= ((options.pageLimit || defaults.pageLimit) * activePage)
              $(this).show()
            else
              $(this).hide()

    ###
    # @filterResults
    # Hide/display content based on the active filter
    ###
    filterResults = ->
      nodes.show()
      if (options.useFilters || defaults.useFilters)
        # If the selectAll filter is active, just show all
        if filters[activeFilter] == (options.selectAll || defaults.selectAll)
          nodes.each ->
            $(this).show()
        else
          nodes.each ->
            if $(this).attr('data-filter') != filters[activeFilter] 
              $(this).hide()

    ###
    # @updateView
    # Update controls and containers
    ###
    updateView = ->
      filterResults()
      getPageCount() # Always calc page count before applying pagination
      paginateControls() 
      paginateResults()


    ###
    # @initialize
    # Configures plugin defaults and updates the document when done
    ###
    initialize = ->
      if options.useFilters || defaults.useFilters
        # Populate the filters array
        filterControls.find('input').each (index) ->
          filters[ $(this).attr('value') || index ] = $(this).attr('id')
        if options.log || defaults.log
          console.log '[Filterade.filters]: ' + filters 

        # Set the default filter
        activeFilter = filters.indexOf options.defaultFilter || defaults.defaultFilter 
        if options.log || defaults.log
          console.log '[Filterade.activeFilter]: ' + filters[activeFilter] 

        filterControls.find('input[checked="checked"]').attr('checked', '')
        filterControls.find('input[id="' + filters[activeFilter] + '"]').attr('checked', 'checked')

        # Bind activeFilter to filterControls
        filterControls.find('input').click ->
          activeFilter = filters.indexOf $(this).attr('id') 
          activePage = 1
          updateView()
          if options.log
            console.log '[Filterade.activeFilter]: ' + filters[activeFilter] 

      # Update the document
      updateView()

    # Initialize the plugin
    initialize()