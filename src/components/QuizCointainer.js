import React, { Component } from 'react'
import data from "../jsondata/data.json";
import {ListGroup ,Col ,Row,ToggleButtonGroup,ToggleButton ,ButtonGroup,ListGroupItem, Button, Panel, Well} from "react-bootstrap"
import arrayShuffle from "array-shuffle";

export default class Quiz extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            index:0,
            userValue:[],
            disabled:false,
            resultDisplay:false,
            validationStatus: null,
            key: '',
            color: [],
            score: 0
        }
        this.Nextquestion=this.Nextquestion.bind(this);
        this.handleChoose=this.handleChoose.bind(this);
        this.validate = this.validate.bind(this);
        this.handleResultValidate = this.handleResultValidate.bind(this);
        this.arrayShufle = this.arrayShufle.bind(this);
    }
   
    arrayShufle(data){
        var i,j;
        for(i=data.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [data[i], data[j]] = [data[j],data[i]];
        }
        return data;
    }

    componentWillMount() {
        
       this.setState({
           data: this.arrayShufle(data)
       });
   }

   handleChoose(e){
       let answer = this.state.data[this.state.index].answer;
       let user = this.state.userValue;
       user.push(e.target.value);
       this.setState({
           userValue: user,
           disabled: true,
        });
        const score = this.state.score + 1;
        console.log(this.state.userValue,3)
        if(answer === e.target.value){
            this.setState({
              validationState: "success",
              key: e.target.value,
              score
            })
        }else{
            this.setState({
              validationState: "danger",
              key: e.target.value
            })
        } 
    }

    Nextquestion(){
        const index=this.state.index;
        const length=this.state.data.length;
        if(index<length){
            this.setState({
                index:index+1,
                disabled: false
            });
            if(index===length-1){
                this.setState({
                    resultDisplay:true
                });
            
            }
        }
    }   

    validate(e){
        if(e === this.state.key){
            return this.state.validationState
        }
    }

    handleResultValidate(count,option,answer){
        if(this.state.userValue[count-1] === option.key){
            if(this.state.userValue[count-1] === answer){
                return <ToggleButton bsSize="large" bsStyle="success" value={option.key} disabled>{option.choice}</ToggleButton>
            }else{
                return <ToggleButton bsSize="large" bsStyle="danger" value={option.key} disabled>{option.choice}</ToggleButton>
            }
        }else{
            if(option.key === answer){
                return <ToggleButton bsSize="large" bsStyle="success" value={option.key} disabled>{option.choice}</ToggleButton>
            }else{
                return <ToggleButton bsSize="large" value={option.key} disabled>{option.choice}</ToggleButton>
            }
        }
    }


    render(){
        
        var count=0;
        if(this.state.index < this.state.data.length){
            var option=this.state.data[this.state.index].options.map((data)=>{
                return (
                    <ToggleButton
                        bsSize="large"
                        bsStyle={this.validate(data.key)}
                        value={data.key}
                        disabled={this.state.disabled}
                    >{data.choice}</ToggleButton>
                )
            });
        }
        
        var result=this.state.data.map((data)=>{
            count++;
            var options = data.options.map(option => (
                this.handleResultValidate(count,option, data.answer)
            ));

            

            return (
                <Panel header={data.question}>
                   <ButtonGroup>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.userValue[count-1]} vertical>
                        {options}
                        </ToggleButtonGroup>
                   </ButtonGroup>
                </Panel>  
            )
        });
            
        var test=()=>(
            <Row>
                <Col md={12}>
                    <h2 id="takeq">Take Quiz</h2>
                        <div id="listquestions">
                        <h3>{this.state.data[this.state.index].question}</h3>
                        <ButtonGroup onChange={this.handleChoose}>
                            <ToggleButtonGroup type="radio" name="options" vertical>
                            {option}
                            </ToggleButtonGroup>
                        </ButtonGroup>
                        <p Style="margin-top: 25px;"><Button onClick={this.Nextquestion}>Next Question</Button></p>
                    </div>
                </Col>
            </Row>
        )

        var displayResult = () => (
            <Row>
                <h2 id="takeq">Result</h2>
                <p Style="text-align: center; font-color: red; font-size: 25px; font-weight: bold;">Score: {this.state.score}</p>
                <Col md={12}>
                    {result}
                </Col>
            </Row>
        )

   return (
      <div>
      {!this.state.resultDisplay ? test() : displayResult()}        
      </div>
    )
  }
}
