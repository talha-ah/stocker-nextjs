import React from "react"
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react"

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_VISIBILITY":
      return { ...state, visible: !state.visible }
    default:
      throw new Error()
  }
}

function SidebarExample() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    visible: false,
  })

  const { visible } = state

  return (
    <div>
      <Button onClick={() => dispatch({ type: "CHANGE_VISIBILITY" })}>
        SHOW / HIDE
      </Button>
      <Sidebar.Pushable as={Segment} style={{ overflow: "hidden" }}>
        <Sidebar
          inverted
          vertical
          as={Menu}
          width="thin"
          icon="labeled"
          direction="left"
          visible={visible}
          animation="uncover"
        >
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <Header as="h3">Application Content</Header>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
              alt="sidebar"
            />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

export default SidebarExample
