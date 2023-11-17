import React, { useState, useEffect } from "react";
import { Table } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { fetchPromotions } from "../services /promotions.service";
// import 'antd/dist/antd.css'; // Import Ant Design styles

interface Promotion {
  promotionName: string;
  type: string;
  startDate: {
    date: string;
  };
  endDate: {
    date: string;
  };
  userGroupName: string;
  index: number;
}

//todo
// 1. borders of table are not nice.
const Wrapper = styled.div`
  margin: 20px;
  overflow: auto;
`;

const ScrollableDiv = styled.div`
  overflow: auto;
  height: 400px;
`;

const StyledTable = styled(Table)`
  height: 400px;

  background: transparent !important;
  .ant-table-thead {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
  }

  .ant-table-th {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }

  .ant-table-tbody {
    border: 1px solid #ddd;
  }

  .ant-table-cell {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
    color: red;
  }
`;

interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
}
export const InfiniteScrollTable: React.FC = () => {
  const [data, setData] = useState<Promotion[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [columns, setColumns] = useState<IColumn[]>([]);

  //todo
  // 1. change function name
  const fetchMoreData = async () => {
    setIsLoading(true);
    //todo change temp name
    const temp = await fetchPromotions(pageNumber);
    const newData = temp.documents.map((document: any, index: number) => {
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
            title: key,
            dataIndex: key,
            key: key,
          });
      });
      setColumns(initialColumns);
      setIsInitialFetch(false);
    }

    if (!temp.hasMoreData) {
      setHasMore(false);
    }
    console.log(data.length);
    setData([...data, ...newData]);
    setPageNumber(pageNumber + 1);
    setIsLoading(false);
  };

  const commonbla = () => {};

  useEffect(() => {
    (async () => {
      // const initialData = await fetchPromotions(pageNumber);
      // setPageNumber(pageNumber + 1);
      await fetchMoreData();
    })();
  }, []);

  //todo
  // 1.
  // const columns = [
  //   {
  //     title: "Promotion Name",
  //     dataIndex: "promotionName",
  //     key: "promotionName",
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "type",
  //     key: "type",
  //   },
  //   {
  //     title: "Start Date",
  //     dataIndex: "startDate",
  //     key: "startDate",
  //   },
  //   {
  //     title: "End Date",
  //     dataIndex: "endDate",
  //     key: "endDate",
  //   },
  //   {
  //     title: "User Group Name",
  //     dataIndex: "userGroupName",
  //     key: "userGroupName",
  //   },
  // ];

  return (
    <Wrapper>
      <h1>Infinite Scroll Ant Design Table</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<span />}
        scrollableTarget="scrollableDiv" // Add this line to specify the scrollable target
      >
        <ScrollableDiv
          id="scrollableDiv"
          style={{ overflow: "auto", height: "400px" }}
        >
          <StyledTable
            columns={columns}
            sticky={true}
            dataSource={data}
            pagination={false}
            rowClassName={() => "infinite-scroll-table-row"} // Add a custom class for styling
          />
        </ScrollableDiv>
      </InfiniteScroll>
    </Wrapper>
  );
};
