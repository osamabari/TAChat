define({ "api": [
  {
    "type": "socket:event",
    "url": ":::chkUser",
    "title": "chkUser",
    "description": "<p>for checking users is online or not. it will fire as a first event.</p>",
    "group": "Chat",
    "name": "chkUser________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "string",
            "optional": false,
            "field": "data.userId",
            "description": "<p>object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "routes/index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": "/test",
    "title": "test",
    "description": "<p>test</p>",
    "group": "test",
    "name": "test________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
    "version": "0.0.1",
    "filename": "routes/index.js",
    "groupTitle": "test"
  }
] });
