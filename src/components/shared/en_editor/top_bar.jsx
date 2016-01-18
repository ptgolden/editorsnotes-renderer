"use strict";

var React = require('react')
  , Immutable = require('immutable')


const TOOLBAR_HEIGHT = '4em';


module.exports = React.createClass({
  displayName: 'TopBar',

  propTypes: {
  },

  getOptions(q) {
    var url = require('url')
      , apiFetch = require('../../../utils/api_fetch')
      , { itemType, projectURL } = this.props

    return apiFetch(url.format({
        pathname: projectURL + itemType + 's/',
        query: q.length === 0 ? undefined : { q }
      }))
      .then(resp => resp.json())
      .then(Immutable.fromJS)
      .then(data => {
        return { options: data.get('results').toArray() }
      });
  },

  renderOption(item) {
    var { getDisplayTitle } = require('../../../helpers/api')

    return getDisplayTitle(item);
  },

  render() {
    var Select = require('react-select')
      , { itemType, handleReferenceSelect } = this.props
      , style

    style = {
      height: TOOLBAR_HEIGHT,
    }

    return (
      <div className="bg-gray border-box flex flex-center flex-justify-center" style={style}>
        {
          itemType && (
            <div style={{ width: '400px' }}>
              <Select.Async
                  name="select"
                  value=""
                  ref="autocomplete"
                  minimumInput={2}
                  cache={null}
                  placeholder={`Search for a ${itemType}`}
                  filterOptions={opts => opts}
                  loadOptions={this.getOptions}
                  optionRenderer={this.renderOption}
                  valueRenderer={this.renderOption}
                  onChange={handleReferenceSelect} />
            </div>
          )
        }
      </div>
    )
  }
});