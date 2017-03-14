import React,{ Component }from 'react'

import Loading from '../Loading'

class Content extends Component{
   // state = {
   //  datas:[{
   //      url:"https://www.cllgeek.com/archives/546",
   //      title:"怎么学习react",
   //      meta:"react",
   //      img_url:"http://obl1r1s1x.bkt.clouddn.com/isomorphic-javascript.png",
   //      user_url:"https://www.cllgeek.com/archives/546",
   //      user:"cll"
   //  },{
   //      url:"https://www.cllgeek.com/archives/546",
   //      title:"怎么学习react",
   //      meta:"react",
   //      img_url:"http://obl1r1s1x.bkt.clouddn.com/isomorphic-javascript.png",
   //      user_url:"https://www.cllgeek.com/archives/546",
   //      user:"cll"
   //  },{
   //      url:"https://www.cllgeek.com/archives/546",
   //      title:"怎么学习react",
   //      meta:"react",
   //      img_url:"http://obl1r1s1x.bkt.clouddn.com/isomorphic-javascript.png",
   //      user_url:"https://www.cllgeek.com/archives/546",
   //      user:"cll"
   //  },{
   //      url:"https://www.cllgeek.com/archives/546",
   //      title:"怎么学习react",
   //      meta:"react",
   //      img_url:"http://obl1r1s1x.bkt.clouddn.com/isomorphic-javascript.png",
   //      user_url:"https://www.cllgeek.com/archives/546",
   //      user:"cll"
   //  }]
   // }
   componentDidMount() {
     const { onttRequestPosts } =this.props
     onttRequestPosts()
   }

   render(){
    const { isFetching,items } = this.props

    return (
      <div className="category-content">
         {isFetching?<Loading />:''}
         <div className="contents">
            {items.postLists.map((item,i)=>
                <div className="post" key={i}>
                  <div className="content">
                    <h3 className="title"><a href={/^http/.test(item.listOriginUrl)?item.listOriginUrl:`https://toutiao.io${item.listOriginUrl}`} target="_blank">{item.listTitle}</a></h3>
                    <div className="meta">
                      {item.listMeta}
                    </div>
                  </div>
                  <div className="user-info">
                    <div className="user-avatar">
                    <img src={item.listAvatarUrl} width='32' /></div>
                  </div>
                  <div className="subject-name">
                    来自
                    <a href={item.listSubjectUrl} target="_blank">{item.listSubjectText}</a>
                  </div>
                </div>
            )}
          </div>
        </div>
    )
   }
}

export default Content