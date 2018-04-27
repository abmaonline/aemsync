'use strict'

const log = require('./log.js')
const mm = require('micromatch')
const chalk = require('chalk')
const watcher = require('simple-watcher')

class Watcher {
  watch ({workingDirs, exclude, callback}) {
    // Convert to array
    if (typeof workingDirs === 'string') {
      workingDirs = [workingDirs];
    }
    log.info(`Scanning: ${chalk.yellow(workingDirs)} ...`)

    workingDirs.forEach((dir) => {
      watcher(dir, (localPath) => {
        log.debug('Changed:', localPath)
  
        // Skip excluded.
        if (exclude && mm([localPath], {dot: true}, exclude).length > 0) {
          return
        }
  
        callback(localPath)
      }, 0)        
    });

    log.info('Awaiting changes ...')
  }
}

module.exports = Watcher
