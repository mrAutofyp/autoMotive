import React from "react";
import { connect } from "react-redux";
import { get_All_Products, check_current_user } from "../store/action/action";
import { makeStyles } from "@material-ui/core/styles";
import Product from "../components/Products/Product";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
  },
}));
function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="container " style={{ margin: "50px auto" }}>
        <div className="row">
          {props.allProducts.length ? (
            props.allProducts.map((v, i) => {
              return (
                <div
                  style={{ margin: "10px auto" }}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={i}
                >
                  <Product product={v} index={i} />
                </div>
              );
            })
          ) : (
            <>
              <h1>Loading....</h1>
            </>
          )}
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
