import React,{ Component } from 'react'
import { bindActionCreators } from 'redux'
import { Nav } from '../components/index'
import { connect } from 'react-redux'
import * as GetPostActions from '../actions/GetPostActions'

class NavBtn extends Component{
    render(){
        const { actions } = this.props
        return (
          <Nav {...actions} />
        )
    }
}

const mapStateToProps=()=>({

})

const mapDispatchToProps=dispatch=>({
    actions:bindActionCreators(GetPostActions,dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBtn)




