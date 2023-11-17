import React, { useEffect, useState } from "react";
import generateFakePromotions from "../generateFakePromotions";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPromotions } from "../services /promotions.service";

export const PromotionsTable = () => {
  const [promotions] = useState(generateFakePromotions(10));
  const [pageNumber, setPageNumber] = useState<number>(1);
  // const [promotions, setPromotions] = useState<any[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await fetchPromotions(pageNumber);
  //       console.log("data ????>>>>>> ", data);
  //       // setPromotions(data); // Update state with the fetched data
  //     } catch (error) {
  //       // Handle error
  //       console.error("Error in fetchPromotions:", error);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <h1>Promotions</h1>
      <table>
        <thead>
          <tr>
            <th>Promotion name</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>User Group Name</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map(
            ({ promotionName, type, startDate, endDate, userGroupName }, i) => {
              return (
                <tr key={i}>
                  <td>{promotionName}</td>
                  <td>{type}</td>
                  <td>{startDate.toISOString()}</td>
                  <td>{endDate.toISOString()}</td>
                  <td>{userGroupName}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </>
  );
  // return (
  //   <div>YAGEL</div>
  // <div>
  //   <InfiniteScroll
  //     dataLength={items.length}
  //     next={fetchData}
  //     hasMore={true} // Replace with a condition based on your data source
  //     loader={<p>Loading...</p>}
  //     endMessage={<p>No more data to load.</p>}
  //   >
  //     <ul>
  //       {items.map((item) => (
  //         <li key={item.id}>{item.name}</li>
  //       ))}
  //     </ul>
  //   </InfiniteScroll>
  //   {error && <p>Error: {error.message}</p>}
  // </div>
  // );
};
