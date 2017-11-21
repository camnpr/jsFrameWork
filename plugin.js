/*
 * @Author: camnpr 
 * @Date: 2017-11-21 10:10:11 
 * @Last Modified by: camnpr
 * @Last Modified time: 2017-11-21 13:51:59
 */
 
/**
* class by es6
*/
class Plugin {

  constructor(id, name = "newPluginName") {
    this.id = id;
    this.name = name;
    this.eventList = {};
  }
  
  // get property, free monitor property
  get id() {
    return this._id;
  }
  set id(value) {
    if (!value) {
      throw 'Pugin ID cannot be empty';
    }
    this._id = value.toLowerCase();
  }
  
  get name() {
    return this._name;
  }
  set name(value) {
    if (!value) {
      throw 'Plugin Name cannot be empty';
    }
    this._name = value;
  }
  
  /**
  * register an event
  * @public
  * @param {String} eventName
  * @param {Function} callback
  */
  on(eventName, callback) {
    this.eventList[eventName] = callback;
    return this;
  }
  
  /**
  * trigger an event
  * @public
  * @param {String} eventName
  * @param {Mixed} data
  */
  trigger(eventName, data) {
    if (typeof this.eventList[eventName] === 'function') {
      this.eventList[eventName].call(this, data);
    } else {
      let method = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
      if (typeof this[method] === 'function') {
        this[method].call(this, data);
      }
    }
    return this;
  }
}// end class

export default Plugin;
