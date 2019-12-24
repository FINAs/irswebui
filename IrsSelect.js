import React from 'react';
import {Select,Option,AutoComplete,Input,Icon} from 'antd'
export default class IrsSelect extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (<></>)
    return (
      <Select defaultValue="lucy" style={{ width: 120 }} >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    )
  }
}