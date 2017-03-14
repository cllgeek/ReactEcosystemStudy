import React,{ Component } from 'react'
import { bindActionCreators } from 'redux'
import { Head } from '../components/index'
import { connect } from 'react-redux'
import * as GetPostActions from '../actions/GetPostActions'

class Header extends Component{
    render(){
        const { state } = this.props
        return (
            <div>
              <Head {...state} />
            </div>
        )
    }
}

const mapStateToProps=state=>({
    state:state.posts
})

export default connect(
    mapStateToProps
)(Header)




