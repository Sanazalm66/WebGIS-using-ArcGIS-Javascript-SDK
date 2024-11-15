

import "./style.css"
//import FeatureLayer from "@arcgis/core/layers/FeatureLayer"

require(["esri/layers/FeatureLayer", "esri/layers/ImageryLayer", "esri/layers/MapImageLayer"], (FeatureLayer, ImageryLayer, MapImageLayer) => {

  const Cities = new FeatureLayer({
    url: "http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/shp_data/MapServer/0",
    visible: true
    });

  const Ostan = new FeatureLayer({
      url: "http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/shp_data/MapServer/1",
      visible: true
      });
  
  const Shahrestan = new FeatureLayer({
        url: "http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/shp_data/MapServer/2",
        visible: true
        });

 const Iran = new FeatureLayer({
          url: "http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/shp_data/MapServer/3",
          visible: true
          });


 //const IranDem = new ImageryLayer({
 // url:"http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/Dem30m_mapservice/MapServer/0",
  //visible:true
 //});

 const IranDem = new MapImageLayer({
  url:"http://localhost:3000/arcgis-proxy/arcgis/rest/services/Iran/Iran_DEM_30s/ImageServer",
  visible:true
 });


const arcgisMap = document.querySelector("arcgis-map");

const arcgisLayerList = document.querySelector("arcgis-layer-list");

  arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {
  //arcgisLayerList
  arcgisMap.addLayers([Cities,Iran,Ostan,Shahrestan,IranDem]);
  
  });

  
  arcgisLayerList.listItemCreatedFunction = (event) => {
 
    const { item } = event;
   
    // Add a calcite slider for updating opacity on group layers.
    
      const label = document.createElement("calcite-label");
      label.innerText = "Opacity";
      label.scale = "s";

      const slider = document.createElement("calcite-slider");
      slider.labelHandles = true;
      slider.labelTicks = true;
      slider.min = 0;
      slider.minLabel = "0";
      slider.max = 1;
      slider.maxLabel = "1";
      slider.scale = "s";
      slider.step = 0.01;
      slider.value = 1;
      slider.ticks = 0.5;

      slider.addEventListener("calciteSliderChange", () => {
        item.layer.opacity = slider.value;
      });

      label.appendChild(slider);

      item.panel = {
        content: label,
        icon: "sliders-horizontal",
        title: "Change layer opacity"
      };
    }

  

  // Event listener that fires each time an action is triggered
  arcgisLayerList.addEventListener("arcgisTriggerAction", (event) => {
    // The layer visible in the view at the time of the trigger.
    const visibleLayer = Ostan.visible ? Ostan : Iran;

    // Get a reference to the action id.
    const { id } = event.detail.action;

    // If the full-extent action is triggered then navigate
    // to the full extent of the visible layer
    if (id === "full-extent") {
      arcgisMap?.goTo(visibleLayer.fullExtent).catch((error) => {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
    }

    // If the information action is triggered, then
    // open the item details page of the service layer
    if (id === "information") {
      window.open(visibleLayer.url);
    }
 
 });

});
