import "./style.css";

import "@arcgis/map-components/dist/components/arcgis-layer-list";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-shell";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import { setAssetPath } from "@esri/calcite-components/dist/components";

// Set asset path for Calcite components
setAssetPath("https://js.arcgis.com/calcite-components/2.11.1/assets");

// Get a reference to the arcgis-layer-list element
const arcgisLayerList = document.querySelector("arcgis-layer-list");

// Set the listItemCreatedFunction to add a legend to each list item
arcgisLayerList.listItemCreatedFunction = (event) => {
  const { item } = event;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend"
    };
  }
};

// Get a reference to the arcgis-map element
const arcgisMap = document.querySelector("arcgis-map");

// Event listener for when the map's view is ready
arcgisMap.addEventListener("arcgisViewReadyChange", () => {
  const { portalItem } = arcgisMap.map;
  const navigationLogo = document.querySelector("calcite-navigation-logo");
  navigationLogo.heading = portalItem.title;
  navigationLogo.description = portalItem.snippet;
  navigationLogo.thumbnail = portalItem.thumbnailUrl;

 
    // Create the Trailheads feature layer
    const trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    // Add the feature layer to the map
    arcgisMap.map.add(trailheadsLayer);

  // Create the Trailheads feature layer
     const Cities = new FeatureLayer({
      url: "http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/shp_data/MapServer/0"
    });

    // Add the feature layer to the map
    arcgisMap.map.add(Cities);

     // Create the Trailheads feature layer
     const Shahrestan = new FeatureLayer({
      url: "http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/shp_data/MapServer/1"
    });

    // Add the feature layer to the map
    arcgisMap.map.add(Shahrestan);

      // Create and add the tile layer for Iran GeoIranTile
  

  // Create and add the imagery layer for Iran DEM
  const iranDEMImageryLayer = new ImageryLayer({
    url: "https://localhost:6443/arcgis/rest/services/Iran/Iran_DEM_30s/ImageServer"
  });
  arcgisMap.map.add(iranDEMImageryLayer);
});
