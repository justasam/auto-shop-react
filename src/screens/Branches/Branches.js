import React from 'react';
import { GoogleMap } from '../../components/GoogleMap';
import { CompanyInfoCard } from '../../components/CompanyInfoCard';

import './index.css';

const Branches = props => {
  // var locations = [
  //     ['<b>Name 1</b><br>Address Line 1<br>Bismarck, ND 58501<br>Phone: 701-555-1234<br><a href="#" >Link<a> of some sort.', 56.4745215, -3.1069149, 4],
  //     ['<b>Name 2</b><br>Address Line 1<br>Fargo, ND 58103<br>Phone: 701-555-4321<br><a href="#" target="_blank">Link<a> of some sort.', 56.4748924,-3.0721133, 4]
  //     /*
  //       * Next point on map
  //       *   -Notice how the last number within the brackets incrementally increases from the prior marker
  //       *   -Use http://itouchmap.com/latlong.html to get Latitude and Longitude of a specific address
  //       *   -Follow the model below:
  //       *      ['<b>Name 3</b><br>Address Line 1<br>City, ST Zipcode<br>Phone: ###-###-####<br><a href="#" target="_blank">Link<a> of some sort.', ##.####, -##.####, #]
  //       */
  // ];

  // var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 11,
  //     /* Zoom level of your map */
  //     center: new google.maps.LatLng(56.4745215, -3.1069149),
  //     /* coordinates for the center of your map */
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  // });

  // var infowindow = new google.maps.InfoWindow();

  // var marker, i;

  // for (i = 0; i < locations.length; i++) {
  //     marker = new google.maps.Marker({
  //         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
  //         map: map
  //     });

  //     google.maps.event.addListener(marker, 'click', (function(marker, i) {
  //         return function() {
  //             infowindow.setContent(locations[i][0]);
  //             infowindow.open(map, marker);
  //         }
  //     })(marker, i));
  // }
  return (
    <div>
        <div id="map"></div>
        <ul className="CompanyInfoCards">
          <li className="CompanyInfoCards__item">
              <div className="CompanyInfoCards__container">
                  <div className="card__image card__image--fence"></div>
                  <div className="card__content">
                      <div className="card__title">Company</div>
                      <p className="card__text">info</p>
                      <button className="btn btn--block card__btn">detail</button>
                  </div>
              </div>
          </li>
        </ul>
    </div>
  )
}

export default Branches;
