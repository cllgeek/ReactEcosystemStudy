import React ,{ Component } from 'react'
import Header from './Header'
import Posts from './Posts'
import NavBtn from './NavBtn'

class Home extends Component{
    render(){
        return(
            <div>
              <Header />
              <Posts />
              <NavBtn/ >
            </div>
        )
    }
}

export default Home