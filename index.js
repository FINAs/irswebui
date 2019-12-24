
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import './index.css';
import IrsInput from './IrsInput'
import IrsSelect from './IrsSelect'
import IrsCombox from './IrsCombox'
function onSelect(value) {
  console.log('onSelect', value);
}
const originDataSource = ['12'.repeat(20),'12','23','34','45','56']
class Complete extends React.Component {
  state = {
    inputValue: '',
    autoInputValue:'',
    dataSource: originDataSource ,
  };

  onSearch = searchText => {
    this.setState({
     
    });
  };

  inputOnChange = event => {
    const value = event.target.value
    this.setState({ 
      inputValue:value,
      dataSource: originDataSource.filter(it=>{
        return it.indexOf(value)===0
      })
     });

  };

  autoInputOnChange=value=>{
    this.setState({ 
      autoInputValue:value
     });
  };

  render() {
    const { dataSource, value,inputValue,autoInputValue } = this.state;
    return (
      <>
      <ul className="demo-ul" >
        Input:
        <br/>
        <li>
        <IrsInput style={{width:'100px'}}
          placeholder={'标准Input'}
           value={inputValue} 
          onChange={this.inputOnChange} />
        </li>
        <li>
          <IrsInput autoComplete
          placeholder={'自动补全'}
        //   value={autoInputValue}
            onChange={this.autoInputOnChange}
            dataSource={originDataSource}
           />
        </li>
        <li>
           <IrsInput style={{width:'100px'}}
          value={'read-only'}
          readOnly
          onChange={this.inputOnChange} />
        </li>
        <li>
           <IrsInput style={{width:'100px'}}
          value={'disabled'}
          disabled
          onChange={this.inputOnChange} />
        </li>
        <li>
          自动补全没有read-only,disabled模式
        </li>
        <li>
          readOnly用户可以选择复制，disabled用户光标无法进入
        </li>
      </ul>
      <br/>
      <ul className="demo-select">
        Select:
        <li>
          <IrsSelect />
        </li>
      </ul>
      <ul className="demo-combox" >
        combobox<br/>
        <li>
         Single :<br/>
          <IrsCombox dataSource={dataSource} />
        </li>
        <li>
        Multi :<br/>
          <IrsCombox mode="multi" dataSource={dataSource} />
        </li>
      </ul>
      </>
    );
  }
}

ReactDOM.render(<Complete />, document.getElementById('container'));
          




