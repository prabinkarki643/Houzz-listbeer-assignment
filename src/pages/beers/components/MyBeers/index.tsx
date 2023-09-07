import React, { createRef, useEffect, useState } from "react";
import { Beer } from "../../typings";
import { EntityStatus } from "../../../../types";
import LoadingComponent from "../../../../components/LoadingComponent";
import { Card, Col, Row } from "react-bootstrap";
import BeerItem from "../AllBeers/components/BeerItem";
import styles from "./styles.module.css";
import AppButton from "../../../../components/AppButton";
import SelfControlModal, {
  SelfControlModalRefsHandler,
} from "../../../../components/SelfControlModal";
import AddNewBeer from "./components/AddNewBeer";

interface MyBeersProps {}

const MY_BEERS_STORE_KEY = "MY_BEERS_STORE_KEY";

export default function MyBeers(props: MyBeersProps) {
  const [state, setState] = useState<{
    beers: Beer[];
    loadingStatus: EntityStatus;
  }>({
    beers: [],
    loadingStatus: EntityStatus.Loading,
  });
  const refs = {
    createMyBeerModal: createRef<SelfControlModalRefsHandler>(),
  };

  useEffect(() => {
    const preloadBeersFromlocalStorage = () => {
      try {
        setState((prevState) => ({
          ...prevState,
          loadingStatus: EntityStatus.Loading,
        }));
        const beersFromStore = localStorage.getItem(MY_BEERS_STORE_KEY);
        if (beersFromStore) {
          const beers = JSON.parse(beersFromStore) as Beer[];
          setState((prevState) => ({
            ...prevState,
            loadingStatus: EntityStatus.Loaded,
            beers: beers || [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            loadingStatus: EntityStatus.Loaded,
          }));
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loadingStatus: EntityStatus.Error,
        }));
        console.warn("Error prepopulating beers from store");
      }
    };
    preloadBeersFromlocalStorage();
  }, []);

  const handleAddNewBeerSuccess = (beer: Beer) => {
    refs.createMyBeerModal?.current?.hide?.();
    const updatedBeers = [beer, ...state.beers];
    setState((prevState) => ({ ...prevState, beers: updatedBeers }));
    localStorage.setItem(MY_BEERS_STORE_KEY, JSON.stringify(updatedBeers));
  };

  const renderMyBeers = () => {
    if (state.beers.length <= 0) {
      return (
        <Card
          className={`d-flex justify-content-center align-items-center text-muted ${styles.emptyBeer}`}
        >
          <div>Noting to see yet.</div>
          <div>
            <span
              className={styles.addBeer}
              onClick={() => {
                refs.createMyBeerModal?.current?.show?.();
              }}
            >
              Click here
            </span>{" "}
            to add your first beer!
          </div>
        </Card>
      );
    } else {
      return (
        <Row>
          {state.beers.map((beer) => {
            return (
              <Col xs={12} lg={6} key={beer.id} className="mb-3">
                <BeerItem beer={beer} isMyBeerItem={true} />
              </Col>
            );
          })}
        </Row>
      );
    }
  };

  return (
    <div>
      <LoadingComponent loading={state.loadingStatus === EntityStatus.Loading}>
        <>
          <div className="d-flex align-items-center justify-content-end mb-3">
            <SelfControlModal
              anchorElement={<AppButton>Add a new beer</AppButton>}
              ref={refs.createMyBeerModal}
              title="Add a New Beer"
              closable={false}
              size="md"
            >
              <AddNewBeer
                onCancel={() => {
                  refs.createMyBeerModal?.current?.hide?.();
                }}
                onSuccess={handleAddNewBeerSuccess}
              />
            </SelfControlModal>
          </div>
          {renderMyBeers()}
        </>
      </LoadingComponent>
    </div>
  );
}
