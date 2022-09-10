import React from 'react';
import './App.css';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { process } from "@progress/kendo-data-query";
import { Window } from "@progress/kendo-react-dialogs";
import GettingStartedExcel from './GettingStartedExcel.jsx';
import products from "./products.json";
import categories from "./categories.json";

function App() {
  const [category, setCategory] = React.useState(null);
  const [dataState, setDataState] = React.useState({
    sort: [{ field: "ProductName", dir: "asc" }],
    skip: 0,
    take: 10
  });
  const [windowVisible, setWindowVisible] = React.useState(false);
  const [gridClickedRow, setGridClickedRow] = React.useState({});
  
  const processedData = process(products, dataState);
  if (processedData !== null) {console.log(processedData);} else {console.log("NO PROCESSED DATA")};
  
  const handleGridDataStateChange = (event) => {
    setDataState(event.dataState);
  };

  const handleDropDownChange = React.useCallback(
    (event) => {
      let newDataState = { ...dataState };
      if (event.target.value.CategoryID !== null) {
        newDataState.filter = {
          logic: "and",
          filters: [
            {
              field: "CategoryID",
              operator: "eq",
              value: event.target.value.CategoryID
            }
          ]
        };
        newDataState.skip = 0;
      } else {
        newDataState.filter = [];
        newDataState.skip = 0;
      }
      setDataState(newDataState);
      setCategory(event.target.value.CategoryID);
    }, [dataState]
  );

  const handleGridRowClick = (event) => {
    setWindowVisible(true);
    setGridClickedRow(event.dataItem);
  };

  const closeWindow = React.useCallback((event) => {
    setWindowVisible(false);
  }, []);

  return (
    <div className="App">
      <p>
        Select Prodcut Category:&nbsp;
        <DropDownList
          data={categories}
          dataItemKey="CategoryID"
          textField="CategoryName"
          defaultItem={{ CategoryID: null, CategoryName: "Product Categories" }}
          onChange={handleDropDownChange}
        />&nbsp;
        Category ID: <strong>{category}</strong>
      </p>
      <Grid
        data={processedData}
        groupable={true}
        filterable={true}
        pageable={true}
        sortable={true}
        {...dataState}
        onDataStateChange={handleGridDataStateChange}
        onRowClick={handleGridRowClick}
        style={{ height: "400px" }}
      >
        <GridColumn field="ProductName" title="Product" />
        <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
        <GridColumn field="UnitsInStock" title="Stock" />
        <GridColumn field="Discontinued" title="Dicontinued" />
        <GridColumn field="PriceCategory" title="Price Category" />
      </Grid>
      {
        windowVisible &&
        // (
        <Window title="Product Details" onClose={closeWindow} height={250}>
          <dl style={{ textAlign: "left" }}>
            <dt>Product Name</dt>
            <dd>{gridClickedRow.ProductName}</dd>
            <dt>Product ID</dt>
            <dd>{gridClickedRow.ProductID}</dd>
            <dt>Quantity per Unit</dt>
            <dd>{gridClickedRow.QuantityPerUnit}</dd>
          </dl>
        </Window>
        // );
      }
      <GettingStartedExcel title='GettingStartedExcel' passedData={processedData}>GettingStartedExcel</GettingStartedExcel>
    </div>
  );
};

export default App;