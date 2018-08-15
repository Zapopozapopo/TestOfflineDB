const Database = require('./database')
const IDText = 'ID'


class OfflineDatabase extends Database {
    constructor() {
        super()

        this._database = {}
        this._cursor = ''
        this._autoIncrement = 0
    }

    ref(path) {
        if (!path) {
            this._handleError('Path required')
            return null
        }
        this._cursor = path
        return this
    }

    push(object) {
        if (!object) {
            this._handleError('Cannot insert empty object')
            return null
        }
        const path = this._cursor.split('/')
        if (path.length > 1) {
            this._handleError('Cannot insert into nested object')
            return null
        }
        const newId = this._getNewID()

        this._setByCursor(newId, object)

        return newId
    }

    remove() {
        this._removeByCursor()
    }

    once(continuation) {
        if (typeof continuation === 'function'){

            continuation(this._getData())
        }
    }

    // Private methods
    _getData() {
        return this._getByCursor()
    }

    _getByCursor() {
        const path = this._cursor.split('/')
        return path.reduce((xs, x) =>
        (xs && xs[x]) ? xs[x] : null, this._database)
    }

    _setByCursor(newId, object) {
        if (!this._database[this._cursor]) {
            this._database[this._cursor] = {}
        }

        this._database[this._cursor][newId] = object
    }

    _removeByCursor() {
        let obj = this._database
        let path = this._cursor

        if (!obj || !path) {
            return;
          }
        
          if (typeof path === 'string') {
            path = path.split('/');
          }
        
          for (var i = 0; i < path.length - 1; i++) {
        
            obj = obj[path[i]];
        
            if (typeof obj === 'undefined') {
              return;
            }
          }
        
          delete obj[path.pop()];
    }

    _getNewID() {
        this._autoIncrement += 1
        return IDText + this._autoIncrement
    }

    _handleError(text) {
        console.error(text)
    }
}

module.exports = new OfflineDatabase()