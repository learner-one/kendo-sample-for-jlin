import * as React from 'react';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import products from "./products.json";

const GettingStartedExcel = (props) => {
  const _exporter = React.createRef();

  console.log('this is the props in Child: ', props.passedData);

  const exportExcel = () => {
    if (_exporter.current) {
      _exporter.current.save(props.passedData);
    }
  };

  return <div>
    <br></br>
    <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportExcel}>Excel Export</button>
    <ExcelExport data={props.passedData} fileName="Products.xlsx" ref={_exporter}>
      <ExcelExportColumn field="ProductName" title="Product" />
      <ExcelExportColumn field="UnitPrice" title="Price" format="{0:c}" />
      <ExcelExportColumn field="UnitsInStock" title="Stock" />
      <ExcelExportColumn field="Discontinued" title="Dicontinued" />
      <ExcelExportColumn field="PriceCategory" title="Price Category" />
    </ExcelExport>
  </div>;
};

export default GettingStartedExcel;