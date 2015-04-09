var addBeamButton = function() {
  var beamLink = '<a class="beam-button"><img class="beam-icon"></a>'
  $('video').before(beamLink);          // html5 video tag
  $("iframe[src*='youtube']").before(beamLink);
  $('object').before(beamLink);         // todo: filter
  $('embed').before(beamLink);

  // $('[type=application/x-shockwave-flash]').before(beam_link);
  var img1 = chrome.extension.getURL("beam1.png");
  var img2 = chrome.extension.getURL("beam2.png");
  $(".beam-icon").attr({src: img1, 
    onmouseover: "this.src='" + img2 + "'",
    onmouseout: "this.src='" + img1 + "'",
  });

  $(".beam-button").click(function() {
    obj_tag = $(this).next();
    alert(obj_tag.outerHTML());
    beam({data: obj_tag.outerHTML(), type: 'html'});
  });
  return false;
};

var beam = function(data) {
  console.log('Beam data: ' + JSON.stringify(data));
  $.post('http://localhost:3000/beam', data);
};

jQuery.fn.outerHTML = function() {
  return $('<div>').append(this.eq(0).clone()).html();
};

window.onload = function() {
  console.log('--window.onload--');

  // wait few secs before injecting the beam link
  window.setTimeout(function() {
    addBeamButton();
  }, 2000);
};

chrome.extension.onRequest.addListener(function(data, sender, sendResponse) {
  beam(data);
});
