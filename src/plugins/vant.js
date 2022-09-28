import {
  Swipe, SwipeItem, Button, Sticky, Popup, Toast, Dialog, Collapse, CollapseItem, Icon
} from 'vant'

const plugins = [
  Swipe, SwipeItem, Button, Sticky, Popup, Toast, Dialog, Collapse, CollapseItem, Icon
]

export default function getVant (app) {
  plugins.forEach(item => {
    return app.use(item)
  })
}
