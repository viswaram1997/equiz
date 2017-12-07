import React, { Component } from 'react'
import { Row, Col, Radio, Button, ButtonGroup, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default class ListQuestions extends Component {
  constructor(){
    super();
    this.state = {
      validationState: "null",
      rightans: 'east',
      key: ''
    }
    this.handleChoose = this.handleChoose.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChoose(e){
    if(this.state.rightans === e.target.value){
      this.setState({
        validationState: "success",
        key: e.target.value
      })
    }else{
      this.setState({
        validationState: "danger",
        key: e.target.value
      })
    }
  }
  
  validate(e){
    if(e === this.state.key){
      return this.state.validationState
    }
  }

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <div id="listquestions">
            <h3>In which direction the sun rises?</h3>
            <ButtonGroup>
              <ToggleButtonGroup type="radio" name="options" vertical>
                <ToggleButton disabled={false} bsSize="large" bsStyle={this.validate("north")} value="north" onClick={this.handleChoose}>North</ToggleButton>
                <ToggleButton disabled={false} bsSize="large" bsStyle={this.validate("south")} value="south" onClick={this.handleChoose}>South</ToggleButton>
                <ToggleButton disabled={false} bsSize="large" bsStyle={this.validate("east")} value="east" onClick={this.handleChoose}>East</ToggleButton>
                <ToggleButton disabled={false} bsSize="large" bsStyle={this.validate("west")} value="west" onClick={this.handleChoose}>West</ToggleButton>
              </ToggleButtonGroup>
            </ButtonGroup>
            <p Style='margin-top: 20px;'><Button bsStyle="primary">Next</Button></p>
          </div>
        </Col>
      </Row>
    )
  }
}

// <Radio name="options" disabled={false} validationState={this.validate("north")} value="north" onClick={this.handleChoose}>North</Radio>
// <Radio name="options" disabled={false} validationState={this.validate("south")} value="south" onClick={this.handleChoose}>South</Radio>
// <Radio name="options" disabled={false} validationState={this.validate("east")} value="east" onClick={this.handleChoose}>East</Radio>
// <Radio name="options" disabled={false} validationState={this.validate("west")} value="west" onClick={this.handleChoose}>West</Radio>