import {
  Swipe, SwipeItem, Button, Sticky, Popup, Toast, Dialog, Collapse, CollapseItem, Icon, Tab, Tabs
  , Cell, CellGroup, Loading, Overlay
} from 'vant'

const plugins = [
  Swipe, SwipeItem, Button, Sticky, Popup, Toast, Dialog, Collapse, CollapseItem, Icon, Tab, Tabs,
  Cell, CellGroup, Loading, Overlay
]

export default function getVant (app) {
  plugins.forEach(item => {
    return app.use(item)
  })
}
