
//Google Places API

let API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place',
  API_KEY = 'xxxx';

exports.nearbysearch = ({ lat, lon, radius, type, keyword, photos }) => {
  let url = `${API_ENDPOINT}/nearbysearch/json?location=${lat},${lon}&radius=${radius}&types=${type}&keyword=${keyword}&key=${API_KEY}&photos=${photos}`;
  console.log(url);

  return fetch(url).then(res => res.json()).then(json => {

    return {
      status: json.status,
      results: json.results,
    };
  });
};

exports.geturlpath = ({ photo_ref }) => `${API_ENDPOINT}/photo?maxwidth=400&photoreference=${photo_ref}&key=${API_KEY}`
exports.getRating = ({ rat }) => `${rat}`
exports.getOpening = ({ hour }) => `${hour}`
exports.getPrice = ({ pri }) => `${pri}`
exports.getAdress = ({ adr }) => `${adr}`
exports.getIcon = ({ ico }) => `${ico}`
exports.getType = ({ typ }) => `${typ}`

