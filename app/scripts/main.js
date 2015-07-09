/* jshint devel:true */
var location_markup = '{{#each location}}<tr class="location--entry"><td class="location--street">{{street}}</td><td>{{city}}</td><td>{{zip}}</td><td><button class="location--remove">Delete</button></td></tr>{{/each}}';
var template = Handlebars.compile(location_markup);

// var req = $.get('../data/data.json', function(json) {
//   appendLocation(json['locations']);
// });

if (localStorage.locations) {
  var locationData = JSON.parse(localStorage.locations);
} else {
  var locationData = {
    "locations": [

    ]
  };
}
appendLocation(locationData['locations']);

Object.observe(locationData.locations, function() {
  saveData(locationData);
});


function saveData(data) {
  localStorage.locations = JSON.stringify(data);
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
  $('#locations table').table();
});

$('.location--remove').on('click', function() {
  var entry = $(this).parents('.location--entry');
  var key = $('.location--street > .tablesaw-cell-content', entry).html();
  var data = locationData.locations;
  var filtered = data.filter(function(entry) {
    if (entry['street'] === key) {
      return false;
    } else {
      return true;
    }
  });
  locationData.locations = filtered;
  entry.remove();
  if (locationData.locations.length > 0) {
    localStorage.locations = JSON.stringify(filtered);
  } else {
    localStorage.clear(locations);
  }
});
