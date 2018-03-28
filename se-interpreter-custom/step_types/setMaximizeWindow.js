/**
 * Step to maximize current window
 * Implementaion of  JSONWire Proctocol:
 * POST /session/:sessionId/window/:windowHandle/maximize
 *
 * author:  Chris Hamm
 * version: 0.0.1
 *
 * usage: { "type": "maximizeWindow"}
 */
exports.run = function(tr, cb) {
  tr.do('windowHandle', [], cb, function (err, handle) {
    tr.do('maximize', [handle], cb, function(err) {
      cb({'success': !err, 'error': err});
    });
  });
};
