import React, { useEffect } from "react";
import QIMap from "@qi/map";

export const QIMapLoader = ({
                                containerId,
                                className = "",
                                countryConfig = {
                                    center: [1.155209e7, 151997.9],
                                    minZoom: 1,
                                    zoom: 12,
                                    maxZoom: 25,
                                },
                                dataFormat = {
                                    lat: "lat",
                                    lon: "lng",
                                    time: "recorded_on",
                                },
                                setMapRef = () => {},
                                children,
                                mapExpand,
                            }) => {
  // useEffect(() => {
  // //     //QuickFix
  // //     // mapExpand &&
  // //     setTimeout(() => {
  // //         document.querySelector("canvas").style.width = "100%";
  // //         document.querySelector("canvas").style.height = "100vh";
  // //     }, 0);
  // // }, []);

  useEffect(() => {
    const qiMap = new QIMap({
      containerId: 'mapPublicHome',
      baseLayer: ['OSM'],
      currentCountry: {
        center: [1.155209e7, 151997.9],
        minZoom: 1,
        zoom: 12,
        maxZoom: 25,
      },
    });
    qiMap.createMap();

    /* qiMap.removeLayer = (layerName) => {
      try {
        qiMap._hideOverlay();
      } finally {
        qiMap.removeLayerSource(layerName);
        qiMap.resetZoomLevel();
      }
    }; */

    qiMap.removeLayerSource = (layerName) => {
      let layer_arr = Object.keys(qiMap.layer);
      let strVal = layerName.toString();
      let eleIndex = layer_arr.indexOf(strVal);
      let l = qiMap.layer[layer_arr[eleIndex]];
      qiMap.resetZoomLevel();
      l?.getSource()?.clear();

      /* try {
          qiMap._hideOverlay();
        } catch (e) {
          console.log(e);
        } finally {
          if (layer) {
            layer.getSource().clear();
          }
        } */
    };

    qiMap.resetZoomLevel = () => {
      const initialSize = qiMap.getMapReference().getSize();
      const map = qiMap.getMapReference();
      var view = map.getView();
      view.setZoom(countryConfig.zoom);
      view.centerOn(countryConfig.center, initialSize, [500, 400]);
    };

    qiMap.showTooltip = (coordinate) => {
      try {
        qiMap._hideOverlay();
      } finally {
        const evt = {};
        evt.type = "singleclick";
        evt.coordinate = qiMap.getGeometry(coordinate);
        evt.pixel = qiMap.getMapReference().getPixelFromCoordinate(evt.coordinate);
        qiMap._showTooltip(evt);
      }
    };

    setMapRef(qiMap);
  }, []);

  return (
    <main className="relative">
      <aside className="collapsable-side-panel">{children}</aside>

      <article className={`qiMap ${className}`}>
        <div id={containerId}></div>
      </article>
    </main>
  );
}