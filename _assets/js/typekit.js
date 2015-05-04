/*

This small hack loads fonts from the Typekit webfontloader (https://github.com/typekit/webfontloader)
contextually, effectively "patching" in a new font if a media query is fired.

You need to have 2 seperate kits on Typekit, one for your main fonts, and another for the fonts you want
when the media query is fired.

Improvements or suggestions welcome!

Lots of love,
@adamyeats

*/

(function () {

  var query = '(max-width: 750px)', // Set your MQ here
      mql = window.matchMedia(query);

  function tkLoader (kit, callback) {
    WebFont.load({
      typekit: {
        id: kit
      },
      fontactive: function () {
        Typekit.load();
      }
    });

    if (typeof callback === 'function' && callback()) {
      callback();
    }
  };

  function handleMQChange (mql) {
    if (mql.matches) {
      tkLoader('hpu8dfm'); // Put the kit code for the fonts you want when MQ fires here
      if (typeof Typekit !== "undefined") { // Very ugly hack to support browser resizing!
        setTimeout(Typekit.load, 200);
      }
    }
  };

  mql.addListener(handleMQChange);

  tkLoader('pcf0pzp', function () { // Put the kit code for the defaut fonts here
    handleMQChange(mql);
  });

}());