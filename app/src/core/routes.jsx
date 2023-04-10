import React from "react";
import { Routes, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Login = loadable(() =>
  import(/* webpackChunkName: "LoginChunk" */ "Pages/login/login")
);
const Motd = loadable(() =>
  import(/* webpackChunkName: "MotdChunk" */ "Pages/motd/motd")
);
const Localization = loadable(() =>
  import(
    /* webpackChunkName: "LocalizationChunk" */ "Pages/localization/localization"
  )
);
const UndoRedo = loadable(() =>
  import(/* webpackChunkName: "UndoRedoChunk" */ "Pages/undoredo/undoredo")
);
const ContextMenu = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/contextmenu/contextmenu")
);
const Image = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/image/image")
);
const Test = loadable(() => {
  import(/* webpackChunkName: "TestChunk" */ "Pages/test/test")
});

class AppRoutes extends React.Component {
  render() {    
    return (
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.MOTD} element={<Motd />}></Route>
        <Route path={ROUTES.LOCALIZATION} element={<Localization />}></Route>
        <Route path={ROUTES.UNDOREDO} element={<UndoRedo />}></Route>
        <Route path={ROUTES.CONTEXTMENU} element={<ContextMenu />}></Route>
        <Route path={ROUTES.IMAGE} element={<Image />}></Route>
        <Route path={ROUTES.TEST} element={<Test />}></Route>
      </Routes>
    );
  }
}

export default AppRoutes;
