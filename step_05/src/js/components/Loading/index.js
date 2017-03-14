import styles from './index.scss';

import React ,{Component} from 'react';

export default class Loading extends Component{
    render (){
        return(
           <div className={styles.loading}>
               <div>
                   <img src="http://obl1r1s1x.bkt.clouddn.com/loading.gif" alt="loading"/>
                   <p>正在努力加载中......</p>
               </div>
           </div>
        );
    }
}