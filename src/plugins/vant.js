import {
  Swipe, SwipeItem, Button, Sticky, Popup, Toast, Dialog
} from 'vant'

const plugins = [
  Swipe, SwipeItem, Button, Sticky, Popup, Toast, Dialog
]

export default function getVant (app) {
  plugins.forEach(item => {
    return app.use(item)
  })
}
