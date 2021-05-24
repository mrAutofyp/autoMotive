import React from "react";
import { connect } from "react-redux";
import { get_All_Products, check_current_user } from "../store/action/action";
import { Grid } from "@material-ui/core";
import Product from "../components/Products/Product";

function Shop(props) {
  return (
    <Grid
      style={{ margin: "50px auto" }}
      justify="center"
      spacing={4}
      container
    >
      {props.allProducts.length ? (
        props.allProducts.map((v, i) => {
          return (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <Product product={v} />
            </Grid>
          );
        })
      ) : (
        <h1>Loading....</h1>
      )}
    </Grid>
  );
}

const mapStateToProps = (store) => ({
  allProducts: store.allProducts,
  currentuser: store.currentuser,
});

const mapDispatchToProps = (dispatch) => ({
  get_All_Products: () => dispatch(get_All_Products()),
  check_current_user: () => dispatch(check_current_user()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
