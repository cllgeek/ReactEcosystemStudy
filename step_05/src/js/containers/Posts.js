import React,{ Component } from 'react'
import { bindActionCreators } from 'redux'
import { Content } from '../components/index'
import { connect } from 'react-redux'
import * as GetPostActions from '../actions/GetPostActions'

class Posts extends Component{
    render(){
        const { state,actions } = this.props
        return (
            <div>
              <Content {...state} {...actions} />
            </div>
        )
    }
}

const mapStateToProps=state=>({
    state:state.posts
})

const mapDispatchToProps=dispatch=>({
    actions:bindActionCreators(GetPostActions,dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts)




