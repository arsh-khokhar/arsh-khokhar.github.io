$ (document).ready (function () {
  var currSection = '#home';
  $ ('#social-links-centered').show ();
  $ ('#home-nav > li > a').click (function (e) {
    e.preventDefault ();

    if (this.href.split ('#').length == 1) {
      window.location.href = this.href;
      return;
    }

    var sectionName = '#' + this.href.split ('#')[1];
    $ (currSection).hide ();
    currSection = sectionName;
    $ (sectionName).show ();
    if (sectionName == '#home') {
      $ ('#main-nav-bar').hide ();
      //$ ('#social-links-centered').hide ();
    } else {
      $ ('#main-nav-bar').show ();
      $ ('#social-links-centered').show ();
    }
  });

  $ ('#main-nav-bar > ul > li > a').click (function (e) {
    e.preventDefault ();
    $ (currSection).hide ();

    if (this.href.split ('#').length == 1) {
      window.location.href = this.href;
      return;
    }

    var sectionName = '#' + this.href.split ('#')[1];
    currSection = sectionName;
    $ (sectionName).show ();
    if (sectionName == '#home') {
      $ ('#main-nav-bar').hide ();
      //$ ('#social-links-centered').hide ();
    }
  });

  $ ('.navbar-brand').click (function (e) {
    e.preventDefault ();
    $ (currSection).hide ();
    var sectionName = '#' + this.href.split ('#')[1];
    currSection = sectionName;
    $ (sectionName).show ();
    if (sectionName == '#home') {
      $ ('#main-nav-bar').hide ();
      //$ ('#social-links-centered').hide ();
    }
  });
});
