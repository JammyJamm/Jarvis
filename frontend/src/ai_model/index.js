import React, { useState } from "react";
import axios from "axios";
import SideBar from "../components/sidebar";

import AI_Search from "../components/ai_search";
import MainLayout from "../components";
import { Outlet } from "react-router-dom";
function AI_model() {
  return (
    <div className="modelUI" style={{ display: "flex" }}>
      <aside style={{ height: "100vh" }}>
        <SideBar />
      </aside>
      {/* <MainLayout /> */}
      <main
        style={{
          height: "100vh",

          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Outlet />
        <AI_Search />
      </main>
    </div>
  );
}

export default AI_model;
