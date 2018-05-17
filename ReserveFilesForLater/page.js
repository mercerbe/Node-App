$(document).ready(function() {
  //const app = require('./app.js');
  jQuery(function($, cmd) {
    $('#terminal').terminal(function(cmd) {
      if (cmd !== '') {
        try {
          var result = window.eval(cmd);
          if (result !== undefined) {
            this.echo(new String(result));
          }
        } catch (e) {
          this.error(new String(e));
        }
      } else {
        this.echo('');
      }
    }, {
      greetings: "Use the following comands after entering 'node app': " + '\n' +
        "1. 'tweets' " + '\n' +
        "2. 'spotify' followed by any song title (e.g. node app spotify 'rocket man') " + '\n' +
        "3. 'omdb' followed by any movie title (e.g. node app omdb Robocop) " + '\n' +
        "4. 'do' displays random song " + '\n' +
        "REMINDER: any song or movie title with more than one word needs to be in quotes!",
      name: 'node_app',
      height: 200,
      prompt: 'prompt> '
    });
  });
});
