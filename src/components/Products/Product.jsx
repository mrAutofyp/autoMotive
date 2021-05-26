import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import firebase from "../../config/firebase";
import { Paper, Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SettingsIcon from "@material-ui/icons/Settings";
const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    // maxWidth: "100%",
    width: "300px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0",
  },
  anchorBtnc: {
    textDecoration: "none",
    padding: "0 !important",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
    },
    // display: "flex",
    // background: "red",
  },
}));

const Product = (props) => {
  const classes = useStyles();
  const product = props;
  const handleAddtoCart = (key) => {
    let userUid = props.currentuser.userUid;

    let cartItems = {
      productID: key,
      qtn: 1,
    };
    let dbRef = firebase.database().ref("users");
    dbRef
      .child(userUid)
      .get()
      .then((user) => {
        if (user.exists()) {
          console.log(user.val());
        }
      });
  };
  return (
    <Card className={classes.root}>
      <Carousel
        autoPlay={false}
        animation="slide"
        swipe={true}
        indicators={true}
        IndicatorIcon={<SettingsIcon style={{ width: "17px" }} />} // Previous Example
        indicatorIconButtonProps={{
          style: {
            color: "#000",
            fontSize: "10px",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#444cc3",
          },
        }}
        // indicatorContainerProps={{
        //   style: {
        //     marginTop: "50px", // 5
        //     textAlign: "right", // 4
        //   },
        // }}
        // next={(next, active) =>
        //   console.log(`we left ${active}, and are now at ${next}`)
        // }
        // prev={(prev, active) =>
        //   console.log(`we left ${active}, and are now at ${prev}`)
        // }
        NextIcon={<ArrowForwardIcon />}
        PrevIcon={<ArrowBackIcon />}
        // NavButton={({ onClick, className, style, next, prev }) => {
        //   // Other logic

        //   return (
        //     <Button onClick={() => console.log("sufyan")} className={"ss"}>
        //       {next && "Next"}
        //       {prev && "Previous"}
        //     </Button>
        //   );
        // }}
      >
        {product.product.imgs.map((item, i) => (
          <Item key={i} item={item} link={product.product.key} />
        ))}
      </Carousel>

      <Link
        to={{ pathname: `/shop/item/${product.product.key}` }}
        className={classes.anchorBtnc}
      >
        <CardContent>
          <div>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className="prodTitle"
            >
              {product.product.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              RS {product.product.price}
            </Typography>
          </div>
          <Typography
            className="prodPara"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {product.product.description} Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Consequatur nulla ab, facilis saepe
            natus error cumque necessitatibus maxime numquam reprehenderit rem
            vero illo consequuntur vitae odit aliquid officia incidunt, quod a
            architecto, ipsum nesciunt mollitia reiciendis. Labore libero
            adipisci maiores quia. Sequi, magnam iure.
          </Typography>
        </CardContent>
      </Link>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label="Add to Cart">
          <AddShoppingCart
            onClick={() => handleAddtoCart(product.product.key)}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (store) => ({
  allProducts: store.allProducts,
  currentuser: store.currentuser,
});

function Item(props) {
  const classes = useStyles();
  return (
    <CardMedia
      className={classes.media}
      image={props.item}
      component={Link}
      to={{ pathname: `/shop/item/${props.link}` }}
      // className={classes.anchorBtnc}
    />
  );
}
{
  /* const mapDispatchToProps = (dispatch) => ({
   get_All_Products: () => dispatch(get_All_Products()),
    check_current_user: () => dispatch(check_current_user()),
 }); */
}

export default connect(mapStateToProps, null)(Product);
