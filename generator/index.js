const fs = require('fs')
module.exports = (api, opts, rootOptions) => {
  if (opts.frame === 'WpFront') {
    if (opts.platform === 'webapp') {

    } else if (opts.platform === 'pc') {
      api.render('./templates/pc')
    }
    if (opts.winuponUI) {

    }
  } else if (opts.frame === 'vueCli') {
    if (opts.platform === 'webapp') {

    } else if (opts.platform === 'pc') {

    }
    if (opts.winuponUI) {

    }
  }

  api.onCreateComplete(() => {
    fs.rename(api.resolve('./packages/module'), api.resolve(`./packages/${opts.name}`),(err) => {
      if (err) throw err;
    })
  })
}