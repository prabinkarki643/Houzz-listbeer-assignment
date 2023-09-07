import React, { useState } from "react";
import { BeersViewTab } from "./typings";
import styles from "./styles.module.css";
import AllBeers from "./components/AllBeers";
import TabPanel from "../../components/TabPanel";
import MyBeers from "./components/MyBeers";

interface BeersManagementProps {}

export default function BeersManagement(props: BeersManagementProps) {
  const [currentTab, setCurrentTab] = useState<BeersViewTab>(
    BeersViewTab.ALL_BEERS
  );

  const handleChangeCurrentTab = (tab: BeersViewTab) => {
    setCurrentTab(tab);
  };
  return (
    <div className={["container", styles.parent].join(" ")}>
      <div className={[styles.tabContainer].join(" ")}>
        <div
          onClick={() => handleChangeCurrentTab(BeersViewTab.ALL_BEERS)}
          data-active={currentTab === BeersViewTab.ALL_BEERS}
          className={[
            currentTab !== BeersViewTab.ALL_BEERS ? "text-muted" : "",
            styles.tab,
          ].join(" ")}
        >
          All Beers
        </div>
        <div
          onClick={() => handleChangeCurrentTab(BeersViewTab.MY_BEERS)}
          data-active={currentTab === BeersViewTab.MY_BEERS}
          className={[
            currentTab !== BeersViewTab.MY_BEERS ? "text-muted" : "",
            styles.tab,
          ].join(" ")}
        >
          My Beers
        </div>
      </div>

      <div className={styles.tabResultView}>
        <TabPanel name={BeersViewTab.ALL_BEERS} currentName={currentTab}>
          <AllBeers />
        </TabPanel>

        <TabPanel name={BeersViewTab.MY_BEERS} currentName={currentTab}>
          <MyBeers />
        </TabPanel>
      </div>
    </div>
  );
}
