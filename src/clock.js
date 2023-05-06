import { Lightning, Registry } from '@lightningjs/sdk'

export default class Clock extends Lightning.Component {
  static _template() {
    return {
      Clock: {
        x: 1150,
        y: 20,
        text: {
          text: this.bindProp('time'),
        },
      },
    }
  }

  set fontSize(size) {
    this.tag('Clock').patch({
      text: {
        fontSize: size,
      },
    })
  }
  set textColor(color) {
    this.tag('Clock').patch({
      text: {
        textColor: color,
      },
    })
  }
  set fontFace(font) {
    this.tag('Clock').patch({
      text: {
        fontFace: font,
      },
    })
  }

  _init() {
    const d = new Date()
    let hour = d.getHours()
    let minute = String(d.getMinutes()).padStart(2, '0')
    this.time = `${hour}:${minute}`

    //every second updating the clock, for better accuracy and
    // to reduce the unnecessory interval function calls we can check if the minute value has changed or not
    // if changed then we can stop the currecnt Interval and start new Interval with 1minute

    Registry.setInterval(() => {
      const d = new Date()
      this.time = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
    }, 1000)
  }
}
