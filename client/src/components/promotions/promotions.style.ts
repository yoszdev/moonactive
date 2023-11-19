import styled from "styled-components";
import { Spin, Table } from "antd";
import { PALETTE } from "../../palette/palette.const";

export const Wrapper = styled.div`
  padding: 0 20px;
  overflow: auto;
`;

export const ScrollableDiv = styled.div`
  overflow: auto;
  height: 650px;
`;

export const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 0;
  }

  .ant-table-thead {
    background-color: ${PALETTE.midGray};
    border: 1px solid ${PALETTE.swedishGray};
    :first-child,
    :last-child {
      border-radius: 0 !important;
    }
  }

  .ant-table-th {
    padding: 10px;
    text-align: center;
    border: 1px solid;
  }

  .ant-table-tbody {
    border: 1px solid ${PALETTE.swedishGray};
  }

  .ant-table-cell {
    padding: 10px;
    border: 1px solid ${PALETTE.swedishGray};
    color: ${PALETTE.black};
  }
`;

export const StyledSpinner = styled(Spin)`
  display: flex;
  justify-content: center;
  margin: 25px;
`;
