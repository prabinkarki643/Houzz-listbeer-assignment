import React, { useMemo } from "react";
import { Beer } from "../../../../typings";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./styles.module.css";
import houzzBeerImage from "../../../../../../assets/images/houzz_beer.png";

interface BeerItemProps {
  beer: Beer;
  isMyBeerItem?: boolean;
}

export default function BeerItem({ beer, isMyBeerItem }: BeerItemProps) {
  const ingredients = useMemo(() => {
    return isMyBeerItem
      ? ""
      : `ingredients: ${Object.keys(beer.ingredients || {}).join(", ")}`;
  }, [beer, isMyBeerItem]);
  return (
    <Card className={[styles.containerStyle, "shadow"].join(" ")}>
      <div className="d-flex align-items-start gap-1">
        <div className={styles.beerImgContainer}>
          <OverlayTrigger
            show={ingredients ? undefined : false}
            overlay={<Tooltip>{ingredients}</Tooltip>}
          >
            <img
              className={styles.beerImg}
              src={isMyBeerItem ? houzzBeerImage : beer.image_url}
              alt="beer-img"
            />
          </OverlayTrigger>
        </div>
        <div className="flex-grow-1">
          <div className="d-flex flex-column g-1">
            <div className={styles.title} title={beer.name}>
              {beer.name}
            </div>
            <div className={styles.tagline} title={beer.tagline}>
              {beer.tagline}
            </div>
            <div
              className={[styles.description].join(" ")}
              title={beer.description}
            >
              {beer.description}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
