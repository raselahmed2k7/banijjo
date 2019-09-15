import React, { Component } from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import  { Redirect } from 'react-router-dom';

import {  Label,FormGroup, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const Login = React.lazy(() => import('../Login'));

class Rogistar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      stateNext:'',
    };

    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
handleClick(){
  this.setState({stateNext: 'two'});
}

handleClickTwo(){
  // this.setState({stateNext: 'three'});
  fetch('/api/updateShop', {
    method: 'GET'
  })
  .then(res => {
    console.log(res);
    return res.json()
  })
  .then(data => {
    console.log(data.message); 
    localStorage.setItem('user_status', 'approved');
    this.props.history.push("/dashboard");
  });
  
}
  componentDidMount () {
    const userName = localStorage.getItem('userName');
    const userPassword = localStorage.getItem('userPassword');
    // if(userName=== null && userPassword === null)
    // {
    //   this.props.history.push("/login");
    // }
    // else {
    //   this.props.history.push("/dashboard");
    // }
  }

  handleProductChange(event) {
    // this.setState({value: event.target.value});
    // alert(event.target.input.files[0]);
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    
  }

  

  handleSubmit (event) {
    event.preventDefault();
    
    console.log('submitted JSON value : ', JSON.stringify(this.state));
    console.log('submitted value : ', this.state);

    fetch('/api/vendor-registration' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
      // body: this.state
    })
    .then((result) => result.json())
    .then((info) => { 
      if (info.success == true) {
        ToastsStore.success("User  Successfully Registered !!");
        console.log('Success : ', info.success);
        
        setTimeout(
          function() {
            this.props.history.push("/");
          }
          .bind(this),
          3000
        );
      }
      else {
        ToastsStore.warning("User Registration Faild. Please try again !!");
        console.log(info.success);
      }
      
    })
  }

  render() {
    const currentState = this.state.stateNext;

    if (currentState=='two') {
      return (
        <div id="nextShop" className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
            <ToastsContainer store={ToastsStore}/>
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}  onChange={this.handleProductChange}>
                      <h1>Name Of Your Shop</h1>
                      <p className="text-muted">Lets get started, Tell us about you and your Shop</p>
  
                  
                      <FormGroup row>
                        <Col md="4">
                          <Label htmlFor="productCategory">Shop Name </Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="text" name="productCategory" id="productCategory" onChange={this.changeSpecification} value={this.state.value}>
                         
                          </Input>
                        </Col>
                      </FormGroup>
  
                      
                      <Button type="button" onClick={this.handleClickTwo.bind(this)}  color="success" block>Save and Continue</Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    else{
      return (
        <div id="nextShop" className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
            <ToastsContainer store={ToastsStore}/>
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}  onChange={this.handleProductChange}>
                      <h1>Shops Prefreences</h1>
                      <p className="text-muted">Lets get started, Tell us about you and your Shop</p>
  
                  
                      <FormGroup row>
                        <Col md="4">
                          <Label htmlFor="productCategory">Shop Language </Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="select" name="productCategory" id="productCategory" onChange={this.changeSpecification} value={this.state.value}>
                          <option value="ENG">English</option>
                          <option value="BAN">Bangla</option>
                          </Input>
                        </Col>
                      </FormGroup>
  
                      <FormGroup row>
                        <Col md="4">
                          <Label htmlFor="productCategory">Shop Country </Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="select" name="productCategory" id="productCategory" onChange={this.changeSpecification} value={this.state.value}>
                          <option value="BAN">Bangladesh</option>
                          <option value="IND">India</option>
                          </Input>
                        </Col>
                      </FormGroup>
  
                      <FormGroup row>
                        <Col md="4">
                          <Label htmlFor="productCategory">Shop Currency </Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="select" name="productCategory" id="productCategory" onChange={this.changeSpecification} value={this.state.value}>
                          <option value="dollar">Dollar</option>
                          <option value="bdt">BDT</option>
                          </Input>
                        </Col>
                      </FormGroup>
  
                      <FormGroup row>
                      <Col md="4">
                        <Label>Which of these best describes you?</Label>
                      </Col>
                      <Col md="8">
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio1" name="radios" value="option1" />
                          <Label check className="form-check-label" htmlFor="radio1">Selling is my full time job</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio2" name="radios" value="option2" />
                          <Label check className="form-check-label" htmlFor="radio2">I spell parttime</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio3" name="radios" value="option3" />
                          <Label check className="form-check-label" htmlFor="radio3">Other</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                      <Button type="button" onClick={this.handleClick.bind(this)}  color="success" block>Save and Continue</Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    
  }
}

export default Rogistar;
