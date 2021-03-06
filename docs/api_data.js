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
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "Object",
            "optional": false,
            "field": "data.userId",
            "description": "<p>object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::disconnects",
    "title": "disconnects",
    "description": "<p>when the user disconnects.. perform this</p>",
    "group": "Chat",
    "name": "disconnects________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.userId",
            "description": "<p>Object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::connectGroup",
    "title": "connectGroup",
    "description": "<p>connectGroup</p>",
    "group": "Chat",
    "name": "groupId________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.groupId",
            "description": "<p>Object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::onlineFriends",
    "title": "onlineFriends",
    "description": "<p>onlineFriends</p>",
    "group": "Chat",
    "name": "onlineFriends________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.userId",
            "description": "<p>Object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::readMessages",
    "title": "readMessages",
    "description": "<p>readMessages</p>",
    "group": "Chat",
    "name": "readMessages________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.from_id",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.to_id",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.chatId",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.group_id",
            "description": "<p>Object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::sendGroupMsg",
    "title": "sendGroupMsg",
    "description": "<p>sendGroupMsg</p>",
    "group": "Chat",
    "name": "sendGroupMsg________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.from_id",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.group_id",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.message_type",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.filename",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.fileurl",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.filesize",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.msgUUID",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.chatType",
            "description": "<p>Object parameter</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::sendPrivateMsg",
    "title": "sendPrivateMsg",
    "description": "<p>sendPrivateMsg</p>",
    "group": "Chat",
    "name": "sendPrivateMsg________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.from_id",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.to_id",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.message_type",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.filename",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.fileurl",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.filesize",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.msgUUID",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.chatType",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.message",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.group_id",
            "description": "<p>Object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::typing",
    "title": "typing",
    "description": "<p>typing</p>",
    "group": "Chat",
    "name": "typing________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.currentUser",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.oppUser",
            "description": "<p>Object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "type": "socket:event",
    "url": ":::typing",
    "title": "typing",
    "description": "<p>typing</p>",
    "group": "Chat",
    "name": "typing________________________________________________________________________________________________________________________________________________________________",
    "parameter": {
      "fields": {
        "Expected parameters": [
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.currentUser",
            "description": "<p>Object parameter</p>"
          },
          {
            "group": "Expected parameters",
            "type": "object",
            "optional": false,
            "field": "data.oppUser",
            "description": "<p>Object parameter</p> <hr>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "filename": "./index.js",
    "groupTitle": "Chat"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "_home_osamabari_Documents_TAChat_docs_main_js",
    "groupTitle": "_home_osamabari_Documents_TAChat_docs_main_js",
    "name": ""
  }
] });
