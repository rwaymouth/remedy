/* jshint devel:true */
var location_markup = '{{#each location}}<tr class="location--entry"><td> {{street}}</td><td>{{city}}</td><td>{{zip}}</td></tr>{{/each}}';
var template = Handlebars.compile(location_markup);

var req = $.get('../data/data.json', function(json) {
  appendLocation(json['locations']);
});

var locationData = {
  "locations": [

  ]
};

Object.observe(locationData.locations, function() {
  saveData(locationData);
});


function saveData(data) {
  $.post("../data/data.json",
    data,
    function(err) {
      console.log(err);
    });
}

function appendLocation(data) {
  var spot = $('#locations tbody');
  var entries = template({
    'location': data
  });
  spot.append(entries);
}

$('.location--button').on('click', function() {
  $('.location--form').toggle('hidden');
})

$('#modal--submit').on('click', function() {
  var data = {
    "street": $('#street').val(),
    "city": $('#cityState').val(),
    "zip": $('#zip').val()
  }
    locationData.locations.push(data);
    appendLocation([data]);
    $('#locations table').trigger( "enhance.tablesaw" );
})
