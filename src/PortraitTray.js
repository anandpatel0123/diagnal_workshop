import { Lightning, Utils } from "@lightningjs/sdk";

export default class PortraitTray extends Lightning.Component {
  static _template() {
    return {
      Container: {
        transitions: {
          w: {
            duration: 0.6,
            timingFunction: "cubic-bezier(0.20, 1.00, 0.80, 1.00)",
          },
          h: {
            duration: 0.6,
            timingFunction: "cubic-bezier(0.20, 1.00, 0.80, 1.00)",
          },
        },
        Poster: {
          w: 160,
          h: 240,
          transitions: {
            w: {
              duration: 0.6,
              timingFunction: "cubic-bezier(0.20, 1.00, 0.80, 1.00)",
            },
            h: {
              duration: 0.6,
              timingFunction: "cubic-bezier(0.20, 1.00, 0.80, 1.00)",
            },
          },
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 5 },
        },
        PosterStorke: { x: -6, y: -6 },
      },
      Title: {
        y: 260,
        text: {
          text: this.bindProp("posterTitle"),
          fontSize: 15,
          fontFace: "Regular",
          cutEx: 150,
        },
      },
    };
  }

  set itemData(data) {
    // patching the image from parent component
    this.tag("Poster").patch({
      src: data.posterImage,
    });

    // Incase of image failed to load then we are rendring fallback image
    this.tag("Poster").on("txError", () => {
      this.tag("Poster").patch({
        src: Utils.asset("./images/Slices/placeholder_for_missing_posters.png"),
      });
    });
    this.posterTitle = data.title;
    this.data = data;
  }

  // on focus adding the border around the card
  _focus() {
    this.fireAncestors("$descriptionData", this.data);
    this.tag("PosterStorke").patch({
      smooth: {
        texture: Lightning.Tools.getRoundRect(
          163,
          243,
          5,
          7,
          0xff00ff0c,
          false,
          0xff212121 //0xff212121,
        ),
      },
    });
    this.tag("Container").patch({
      scale: 1.02,
    });
  }

  // on unfocus removing the border around the card
  _unfocus() {
    this.tag("PosterStorke").patch({
      smooth: {
        texture: Lightning.Tools.getRoundRect(
          0,
          0,
          5,
          7,
          0xff212121,
          false,
          0xff212121 //0xff212121,
        ),
      },
    });
    this.tag("Container").patch({
      scale: 1,
    });
  }
}
