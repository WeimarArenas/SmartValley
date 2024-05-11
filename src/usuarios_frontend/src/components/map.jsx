import React from 'react';

function Mapa() {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          width="820"
          height="560"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=medell%C3%ADn&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
        <br />
        <style>{`
          .mapouter {
            position: relative;
            text-align: right;
            height: 560px;
            width: 820px;
          }
          .gmap_canvas {
            overflow: hidden;
            background: none !important;
            height: 560px;
            width: 820px;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Mapa;
