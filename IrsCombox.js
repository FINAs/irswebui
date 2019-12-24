import React from 'react'
import {AutoComplete,Input,Icon,Select,Option as option,Checkbox} from 'antd'
//import './combobox'
function isUndefined(value){
  return typeof(value) === 'undefined'
}

export default class IrsCombox extends React.Component {
  constructor(props){
    super(props)
    this.state={
      innerValue:this.props.defaultValue||'',
      dropdownOpen:false
   //   filterDataSource:this.props.dataSource||[]
    }
    this.mode = 'multi'
    this.filterDataSource = this.props.dataSource||[]
    this.inputOnFocus = false
    this.dropdownOpen = true
    this.inputRef=React.createRef()
    this.render2 = (this.props.mode==='multi')?this.multiComboxRender:this.singleComboxRender
  } 
  onAutoCompleteChange=(inputValue)=>{
    if(isUndefined(this.props.value)){
      this.setState({
        innerValue:inputValue
      })
    }
    this.filterDataSource = this.updateFilterDataSource(inputValue)
    if(this.props.onChange){
      this.props.onChange(inputValue)
    }
  }
  updateFilterDataSource=(inputValue)=>{

    let dataSource = this.props.dataSource||[]
    if((inputValue!=='')&&(typeof inputValue!=='undefined')){
      dataSource = dataSource.filter(item=>{
        return item.indexOf(inputValue)===0
      })
    }
    return dataSource
  }
  onInputFocusChange=(focused)=>{
   // this.inputOnFocus = focused
   // this.setState({})
  //  this.inputRef.forceUpdate()
  //  console.log(this.inputRef)
 //   this.inputRef.current.forceUpdate()
  }
  onDropdownVisibleChange=(visible)=>{
    this.setState({
      dropdownOpen:visible
    })
  }
  onIconClick=()=>{
    this.filterDataSource = this.props.dataSource||[]
    this.onDropdownVisibleChange(!this.state.dropdownOpen)
  }
  singleComboxRender=()=>{
    //filter is only work on type event
    //click arrow do not trigger
    const {className=''}  =this.props
    const value=!isUndefined(this.props.value)?this.props.value:this.state.innerValue
    const rotateArrow = this.state.dropdownOpen
    return (
      <AutoComplete
        dropdownMatchSelectWidth={false}
        allowClear={true}
        className={className+' Irs-combobox single-combobox'}
        value={value} 
        dataSource={this.filterDataSource} 
        onChange={this.onAutoCompleteChange}
        open={this.state.dropdownOpen}
        onDropdownVisibleChange={this.onDropdownVisibleChange}
         >
         <Input
            ref={node=>this.inputRef=node}
            onFocus={this.onInputFocusChange.bind(undefined,true)}
            onBlur={this.onInputFocusChange.bind(undefined,false)}
            suffix={
                <Icon className={'ant-select-arrow-icon'} 
                  onClick={this.onIconClick} 
                  type={'down'}  style={{color:'rgba(0,0,0,0.25)',fontSize:'12px',transform:'0.3s, -webkit-transform 0.3s'}}
                />
              }
              />
      </AutoComplete>
    )
  }
  multiComboxRender=()=>{
    const {value,style} = this.props||{}
    value=!isUndefined(value)?value:this.state.innerValue
    const filterDataSource = this.updateFilterDataSource(value)
    let children 
    if(filterDataSource.length){
      children = []
      for(let i=0;i<filterDataSource.length;i++){
        children.push(
          <option key={i}>
            <Checkbox  className="hide-in-input" style={{marginRight:'10px'}}  />
            <span>{filterDataSource[i]}2</span>
          </option>
        )
      }
    }
 
    return (
      <Select mode="tags"
        className={'irs-combobox-multiple'}
        allowClear={true}
        showArrow={true}
        style={{width:'200px',...style}}
        notFoundContent={null}
        dropdownMatchSelectWidth={false}
        menuItemSelectedIcon={<></>}
       >
        {children}
       </Select>
    )
  }
  render(){
    return this.render2()
  }

}
