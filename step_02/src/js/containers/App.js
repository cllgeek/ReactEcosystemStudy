import React,{ Component } from 'react'
import { CommonTitle,CssTest,BigComponent,Animation,Tab } from '../components'

export default class App extends Component {

    state={
        items:['webpack','react','babel','npm']
    }

    render(){

       const {items}=this.state;

       return (
         <div className="box">
             <CommonTitle title="一个简单的按钮mixin示例" />
             <CssTest />
             <CommonTitle title="图片转换" />
             <BigComponent />
             <CommonTitle title="Animation示例,点击列表删除" />
             <Animation />
             <CommonTitle title="Tab示例" />
             <Tab items={items} />
         </div>
       )
    }
}