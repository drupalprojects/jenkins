(function($) {

  var updateLog = function(data) {

    $('#jenkins-log pre').append(Drupal.checkPlain(data.log));

    var d = $(document);
    d.scrollTop(d.height());

    if (!data.done) {
      Drupal.settings.jenkins.offset = parseInt(data.offset);
      setTimeout(pollLog, 2000);
    }
    else {
      $('#jenkins-throbber').hide();
      $('#jenkins-log h2').text(Drupal.t("Build complete."));
    }
  };

  var pollLog = function() {
    settings = Drupal.settings.jenkins;
    url = '/jenkins/stream-log/' + settings.name + '/' + settings.build_id + '/' + settings.offset;
    $.get(url, null, updateLog);
  };

  Drupal.behaviors.jenkinsLog = {
    attach: function (context, settings) {
      if ($('#jenkins-log', context).length) {
        pollLog();
      }
    }
  };
})(jQuery);
