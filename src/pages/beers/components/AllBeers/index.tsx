import { useState } from "react";
import { useAsyncRetry } from "react-use";
import beersAPI from "../../api/beers.api";
import { Beer } from "../../typings";
import LoadingComponent from "../../../../components/LoadingComponent";
import BeerItem from "./components/BeerItem";
import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { EntityStatus } from "../../../../types";
import { toast } from "react-toastify";

interface AllBeersProps {}

export default function AllBeers(props: AllBeersProps) {
  const [state, setState] = useState<{
    beers: Beer[];
    pagination: {
      page: number;
      per_page: number;
    };
    loadMoreStatus: EntityStatus;
  }>({
    beers: [],
    pagination: {
      page: 1,
      per_page: 10,
    },
    loadMoreStatus: EntityStatus.Idle,
  });

  const fetchAllBeersState = useAsyncRetry(async () => {
    const response = await beersAPI.fetchAllBeers({
      ...state.pagination,
    });
    setState((prevState) => ({
      ...prevState,
      beers: [...response.data],
    }));
    return response.data;
  }, []);

  const handleLoadMore = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        loadMoreStatus: EntityStatus.Loading,
      }));
      const newPage = state.pagination.page + 1;
      const response = await beersAPI.fetchAllBeers({
        ...state.pagination,
        page: newPage,
      });
      setState((prevState) => ({
        ...prevState,
        loadMoreStatus: EntityStatus.Loaded,
        pagination: { ...prevState.pagination, page: newPage },
        beers: [...prevState.beers, ...response.data],
      }));
    } catch (error) {
      toast.error("Error loading more beers, try again!");
      setState((prevState) => ({
        ...prevState,
        loadMoreStatus: EntityStatus.Error,
      }));
    }
  };

  return (
    <div>
      <LoadingComponent
        loading={fetchAllBeersState.loading}
        error={fetchAllBeersState.error}
        onClickTryAgain={() => fetchAllBeersState.retry()}
      >
        <>
          <Row>
            {state.beers.map((beer) => {
              return (
                <Col xs={12} lg={6} key={beer.id} className="mb-3">
                  <BeerItem beer={beer} />
                </Col>
              );
            })}
          </Row>
          <div
            className={`d-flex align-items-center justify-content-center ${styles.paginationContainer}`}
          >
            <div className={`d-flex align-items-center ${styles.loadMore}`}>
              <div onClick={handleLoadMore}>
                {state.loadMoreStatus === EntityStatus.Loading
                  ? "Loading..."
                  : "Load More"}
              </div>
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
        </>
      </LoadingComponent>
    </div>
  );
}
