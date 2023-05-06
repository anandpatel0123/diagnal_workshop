import { Lightning, Utils } from "@lightningjs/sdk";
import { List } from "@lightningjs/ui";
import Clock from "./clock";
import Background from "./background";
import PortraitTray from "./PortraitTray";
import CONTENTLISTINGPAGE1 from "./API/CONTENTLISTINGPAGE-PAGE1.json";
import CONTENTLISTINGPAGE2 from "./API/CONTENTLISTINGPAGE-PAGE2.json";
import CONTENTLISTINGPAGE3 from "./API/CONTENTLISTINGPAGE-PAGE3.json";

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/TitilliumWeb-Regular.ttf") },
      { family: "Light", url: Utils.asset("fonts/TitilliumWeb-Light.ttf") },
      { family: "Bold", url: Utils.asset("fonts/TitilliumWeb-Bold.ttf") },
    ];
  }

  static _template() {
    return {
      w: 1280,
      h: 720,
      Background: {
        w: 1280,
        h: 720,
        color: 0xff141414,
        rect: true,
      },
      Heading: {
        w: 1280,
        h: 100,
        flex: {
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        Title: {
          text: {
            text: "LIGHTNING WORKSHOP",
            fontFace: "Light",
            textColor: 0xffffffff,
            fontSize: 20,
            fontStyle: "bold",
          },
        },
      },
      Clock: {
        type: Clock,
        fontSize: 40,
        textColor: 0xff747474,
        fontFace: "Regular",
      },
      Description: {
        w: 1280,
        h: 200,
        type: Background,
      },
      PortraitTray: {
        x: 40,
        y: 350,
        w: 1000,
        h: 720,
        TrayTitle: {
          x: 10,
          y: -50,
          text: {
            fontFace: "Regular",
            fontStyle: "Bold",
            textColor: 0xffffffff,
            fontSize: 24,
          },
        },
        direction: "row",
        type: List,

        smooth: {
          scrollTransition: { duration: 0.5 },
        },
        requestThreshold: 3,
        enableRequests: true,
        signals: {
          onRequestItems: "onRequestItems",
        },
      },
    };
  }

  $descriptionData(data) {
    this.tag("Description").patch({
      descriptionTitle: data.title,
      descriptionText: data.descriptionText,
    });
  }

  async onRequestItems(data) {
    let items = this.trayRendring();
    this.tag("PortraitTray").add(items);
    return items?.length > 0 ? true : false;
  }

  _init() {
    // array for all the pages
    this.pages = [
      CONTENTLISTINGPAGE1,
      CONTENTLISTINGPAGE2,
      CONTENTLISTINGPAGE3,
    ];
    this.tag("PortraitTray.TrayTitle").patch({
      text: { text: `${CONTENTLISTINGPAGE1.page.title}` },
    });
    this.totalItems = CONTENTLISTINGPAGE1.page["total-content-items"];
    this.totalItemsRendered = 0;
    this.pageId = 0;
    this.tag("PortraitTray").items = this.trayRendring();
  }

  // this will check if total items rendered and total items are less than the total item then
  //we are fetching the items from json files

  trayRendring() {
    if (
      this.totalItemsRendered < this.totalItems &&
      this.pageId <= this.pages.length
    ) {
      let content = this.pages[this.pageId];
      if (content?.page["content-items"]?.content?.length > 0) {
        let trayItems = [];
        content?.page["content-items"]?.content?.forEach((item) => {
          trayItems.push({
            w: 160,
            h: 240,
            type: PortraitTray,
            margin: 12,
            itemData: {
              posterImage: Utils.asset(
                `./images/Slices/${item["poster-image"]}`
              ),
              title: item.name,
              descriptionText: item.description,
            },
          });
        });

        this.pageId++;
        this.totalItemsRendered += content?.page["page-size"];
        return trayItems;
      }
    }
  }

  _getFocused() {
    return this.tag("PortraitTray");
  }
}
