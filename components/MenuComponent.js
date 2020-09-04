import React, { Component } from 'react';
import { Media, ListGroupItem } from 'reactstrap';
import DishDetailComponent from './dishdetail'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';
import { addEmitHelper } from 'typescript';

class Menu extends Component {

  constructor(props) {
      super(props);

      this.state = {
          selectedDish: null
      }
  }

  onDishSelect(dish) {
      this.setState({ selectedDish: dish});
  }

  renderDish(dish) {
      if (dish != null)
          return(
            <DishDetailComponent dish={this.state.selectedDish} postComment={this.props.postComment}     comments={this.props.comments} /> 
          );
      else
          return(
              <div></div>
          );
  }

  render() {
    const menu = this.props.dishes.dishes.map((dish) => {
        if (this.props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
          return (
            <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                    onClick={() => this.onDishSelect(dish)}>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
            </div>
          );
      });

      return (
          <div className="container">
              <div className="row">
                  {menu}
              </div>
              {this.renderDish(this.state.selectedDish)}
          </div>
      );
  }
}

export default Menu;