"use strict"

/* This class is used to delete non-usefull or sensible data from many api requests. */

class Mediator {

    constructor() { }

    /**
       * Useful for get paginated alert list request, mongo to api mediator.
       * @param {Object} alert - Alert plain object (not lean).
       * @return {Object} - Clean plain Alert.
       */

      alertList(alert) {
        delete alert.zone;
        delete alert.checksum;
        delete alert.__v
        return alert;
    }

    /**
       * Useful for get app users list request, mongo to api mediator.
       * @param {Object} userApp - UserApp plain object (lean).
       * @return {Object} - Clean plain UserApp.
       */

      userAppList(userApp) {
        delete userApp.__v;
        delete userApp.password;
        delete userApp.socialId;
        return userApp;
    }

    /**
       * Useful for enable/disable administrator users request, mongo to api mediator.
       * @param {Object} user - User plain object (lean).
       * @return {Object} - Clean plain User.
       */

      userList(user) {
        delete user.__v;
        delete user.password;
        return user;
    }

    /**
       * Useful for get paginated import log request, mongo to api mediator.
       * @param {Object} importLog - ImportLog plain object (lean).
       * @return {Object} - Clean plain ImportLog.
       */

      importLogList(importLog) {
        delete importLog.__v;
        return importLog;
    }

    /**
       * Useful for enable/disable alert request, mongo to alertgraph mediator.
       * @param {Object} alert - Alert plain object (lean).
       * @return {Object} - Clean plain Alert.
       */

      secureAlert(alert) {
        delete alert.__v;
        return alert;
    }

    /**
       * Useful for enable/disable drivers request, mongo to api mediator.
       * @param {Object} userApp - UserApp mongoose object (lean).
       * @return {Object} - Clean plain UserApp.
       */

      secureUserApp(userApp) {
        delete userApp.__v;
        delete userApp.password;
        delete userApp.socialId;
        return userApp;
    }

}

module.exports = new Mediator();
