"use strict";


function getJSONFromTrimmedPath(get, pathname) {
  return get(pathname.replace(/edit\/$/, '?embed_style=nested'), { 'Accept': 'application/json' })
    .then(data => JSON.parse(data))
    .then(data => ({ data }))
}


function getProjectJSON(get, pathname) {
  return get(pathname.replace(/(notes|topics|documents)\/add\//, ''), { 'Accept': 'application/json' })
    .then(data => JSON.parse(data))
    .then(project => ({ project }))
}


function transformReturn(transformFn, fn) {
  return function () {
    return fn.apply(null, arguments)
      .then(ret => {
        transformFn(ret);
        return ret;
      });
  }
}

const projectURL = pathname => pathname.replace(/(notes|topics|documents)\/add\//, '')
const trimmedURL = pathname => pathname.replace(/edit\/$/, '?embed_style=nested')


const noContainer = transformReturn.bind(null, ret => ret.noContainer = true)
    , noFooter = transformReturn.bind(null, ret => ret.noFooter = true)
    , noHeader = transformReturn.bind(null, ret => ret.noHeader = true)


module.exports = {
  /* Notes */
  '/projects/:project_slug/notes/add/': {
    name: 'note_add',
    Component: require('./components/main/note_edit/component.jsx'),
    resource: projectURL
  },

  '/projects/:project_slug/notes/:id/edit/': {
    name: 'note_edit',
    Component: require('./components/main/note_edit/component.jsx'),
    resource: trimmedURL
  },

  /* Topics */
  '/projects/:project_slug/topics/add/': {
    name: 'topic_add',
    Component: require('./components/main/topic_edit/component.jsx'),
    resource: projectURL
  },
  '/projects/:project_slug/topics/:id/edit/': {
    name: 'topic_edit',
    Component: require('./components/main/topic_edit/component.jsx'),
    resource: trimmedURL
  },

  /* Documents */
  '/projects/:project_slug/documents/add/': {
    name: 'document_add',
    Component: require('./components/main/document_edit/component.jsx'),
    resource: projectURL
  },
  '/projects/:project_slug/documents/:id/edit/': {
    name: 'document_edit',
    Component: require('./components/main/document_edit/component.jsx'),
    resource: trimmedURL
  },

}
