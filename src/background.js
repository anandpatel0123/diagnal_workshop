import { Lightning } from "@lightningjs/sdk";

export default class Background extends Lightning.Component {
  static _template() {
    return {
      w: (w) => w,
      h: (h) => h,
      flex: {
        direction: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      BackgroundBody: {
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
        flexItem: {
          marginLeft: 50,
        },
        Title: {
          text: {
            text: this.bindProp("title"),
            fontFace: "Bold",
            textColor: 0xffffffff,
            fontSize: 28,
          },
        },
        Description: {
          y: 80,
          text: {
            text: this.bindProp("description"),
            fontFace: "Regular",
            textColor: 0xffffffff,
            fontSize: 26,
            maxLines: 2,
            wordWra: true,
            cutEx: 640,

            wordWrapWidth: 640,
            maxLinesSuffix: "...",
          },
        },
      },
    };
  }

  // method to set the title of movie/show description from parent component
  set descriptionTitle(title) {
    this.tag("BackgroundBody").x = -30;
    this.tag("BackgroundBody").setSmooth(
      "x",
      this.tag("BackgroundBody").x + 30,
      {
        duration: 0.5,
      }
    );

    this.title = title ? title : "No title available";
  }

  // method to set the description of movie/show from parent component
  set descriptionText(des) {
    this.description = des ? des : "No Description available";
  }
}
