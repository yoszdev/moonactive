import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPromotions } from "../../services /promotions.service";
import {
  ScrollableDiv,
  StyledSpinner,
  StyledTable,
  Wrapper,
} from "./promotions.style";
import { IColumn, IDocument } from "../../consts /promotions.types";
export const PromotionsTable: React.FC = () => {
  const [data, setData] = useState<IDocument[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const fetchMoreData = async () => {
    setIsLoading(true);
    const rawPromotions = await fetchPromotions(pageNumber);
    const newData = rawPromotions.documents.map((document: IDocument) => {
      return {
        ...document,
        key: document._id,
      };
    });

    if (isInitialFetch) {
      const initialColumns: IColumn[] = [];
      Object.keys(newData[0]).forEach((key) => {
        if (key !== "_id" && key !== "key")
          initialColumns.push({
            title: key.replace(/([a-z](?=[A-Z]))/g, "$1 ") ?? key,
            dataIndex: key,
            key: key,
          });
      });
      setColumns(initialColumns);
      setIsInitialFetch(false);
    }

    if (!rawPromotions.hasMoreData) {
      setHasMore(false);
    }

    setData([...data, ...newData]);
    setPageNumber(pageNumber + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchMoreData();
    })();
  }, []);

  return (
    <Wrapper>
      <h1>Promotions</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={isLoading && <StyledSpinner size="small" />}
        scrollableTarget="scrollableDiv"
      >
        <ScrollableDiv id="scrollableDiv">
          <StyledTable
            columns={columns}
            sticky={true}
            dataSource={data}
            pagination={false}
            rowClassName={() => "infinite-scroll-table-row"}
          />
        </ScrollableDiv>
      </InfiniteScroll>
    </Wrapper>
  );
};
