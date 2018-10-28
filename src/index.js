const mediaFile = require('./media.js');

const NoSleep = function() {
  // Detect iOS browsers < version 10
  this.oldIOS = typeof window.navigator !== 'undefined' && parseFloat(
    ('' + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(window.navigator.userAgent) || [0, ''])[1])
      .replace('undefined', '3_2').replace('_', '.').replace('_', '')
  ) < 10 && !window.MSStream

  if (this.oldIOS) {
    this.noSleepTimer = null
  } else {
    // Set up no sleep video element
    this.noSleepVideo = document.createElement('video')

    this.noSleepVideo.setAttribute('title', 'No Sleep')
    this.noSleepVideo.setAttribute('playsinline', '')
    this.noSleepVideo.setAttribute('src', mediaFile)

    this.noSleepVideo.addEventListener('timeupdate', function (e) {
      if (this.noSleepVideo.currentTime > 0.5) {
        this.noSleepVideo.currentTime = Math.random()
      }
    }.bind(this))
  }
};

NoSleep.prototype.enable = function() {
  if (this.oldIOS) {
    this.disable()
    this.noSleepTimer = window.setInterval(function () {
      window.location.href = '/'
      window.setTimeout(window.stop, 0)
    }, 15000)
  } else {
    this.noSleepVideo.play()
  }
};

NoSleep.prototype.disable = function() {
  if (this.oldIOS) {
    if (this.noSleepTimer) {
      window.clearInterval(this.noSleepTimer)
      this.noSleepTimer = null
    }
  } else {
    this.noSleepVideo.pause()
  }
};

module.exports = NoSleep;
