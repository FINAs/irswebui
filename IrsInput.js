
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Input,AutoComplete} from 'antd'
const originDataSource = ['12'.repeat(20),'23','34','45','56']
export default class IrsInput extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      innerValue:''
    }
    this.showSuggest = true
    this.filterDataSource = props.originDataSource||[]
  }
  updateFilterDataSource(textField){
    if(textField===''){
      return this.filterDataSource = []
    }
    this.filterDataSource = (this.props.dataSource||[]).filter(it=>{
      return it.indexOf(textField)===0
    })
  }
  onInputChange=(evt)=>{
    if(typeof this.props.value==='undefined'){
      this.setState({
        innerValue :evt.target.value
      })
    }
    if(this.props.onChange){
      this.props.onChange.call(undefined,evt)
    }
  }
  onAutoCompleteChange=(value)=>{
    this.showSuggest = true
    if(typeof this.props.value==='undefined'){
      this.setState({
        innerValue:value
      })
    }
    if(this.props.onChange){
      this.props.onChange.call(undefined,value)
    }
    
  }

  onDropdownVisibleChange=(open)=>{
    
  }

  onFocusChange=()=>{
    this.showSuggest =false
    if(this.props.onBlur){
      this.props.onBlur()
    }
  }
  render() {
    const {autoComplete,dataSource,value,originDataSource,readOnly,disabled,style,placeholder} = this.props
    const {innerValue} = this.state
    const displayValue = (typeof value ==='undefined')?innerValue:value;
    this.updateFilterDataSource(displayValue)
    if(autoComplete){
      return (
        <AutoComplete
          onBlur={this.onFocusChange}
          placeholder={placeholder}
          style={style}
          onChange={this.onAutoCompleteChange}
          dataSource={this.filterDataSource}
          value={displayValue}
          open={this.showSuggest}
          dropdownMatchSelectWidth={false}
          >
        </AutoComplete>
      )
    }else{
      return (<Input
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
        style={style}
        onChange={this.onInputChange}
        value={displayValue}
       />)
    }
  }
}

