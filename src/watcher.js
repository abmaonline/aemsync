'use strict'

const log = require('./log.js')
const anymatch = require('anymatch')
const chalk = require('chalk')
const watcher = require('simple-watcher')

class Watcher {
  watch (workingDirs, exclude, callback) {
    // Convert to array
    if (typeof workingDirs === 'string') {
      workingDirs = [workingDirs];
    }
    log.info(`Scanning: ${chalk.yellow(workingDirs)} ...`)

    workingDirs.forEach((dir) => {
      watcher(dir, (localPath) => {
        log.debug('Changed:', localPath)
  
        // Skip excluded.
        if (exclude && anymatch(exclude, localPath)) {
          return
        }
  
        callback(localPath)
      }, 0)        
    });

    log.info('Awaiting changes ...')
  }
}

module.exports.Watcher = Watcher
