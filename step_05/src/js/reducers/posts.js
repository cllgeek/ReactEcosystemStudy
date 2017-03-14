import { TT_REQUEST_POSTS,RECEIVE_POSTS,GK_REQUEST_POSTS,SG_REQUEST_POSTS,TC_REQUEST_POSTS,BL_REQUEST_POSTS } from '../actions/actionsTypes'

const init={
  isFetching:true,
  title:'开发者头条',
  items:{
    postLists:[]
  }
}

export default function ttPosts(state=init,action){
  switch(action.type){
    case TT_REQUEST_POSTS:
      return {
        ...state,
        title:'开发者头条',
        isFetching:true
      }
    case GK_REQUEST_POSTS:
      return {
        ...state,
        title:'极客头条',
        isFetching:true
      }
    case SG_REQUEST_POSTS:
      return {
        ...state,
        title:'SegmentFault',
        isFetching:true
      }
    case TC_REQUEST_POSTS:
      return {
        ...state,
        title:'推酷',
        isFetching:true
      }
    case BL_REQUEST_POSTS:
      return {
        ...state,
        title:'伯乐头条',
        isFetching:true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching:false,
        items:action.posts,
      }
    default:
      return state
  }
}