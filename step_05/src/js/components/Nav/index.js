import React from 'react';
import { ActionSheet, Button, Toast } from 'antd-mobile';
import styles from './index.scss';

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

let activeIndex=0;

const Nav = React.createClass({
  getInitialState() {
    return {
      clicked: 'none'
    };
  },
  showActionSheet() {
    const BUTTONS = ['开发者头条', 'SegmentFault', '推酷', '极客头条', '伯乐头条','取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: activeIndex,
      // title: '标题',
      message: '选择平台',
      maskClosable: true,
      'data-seed': 'logId',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
      const { onttRequestPosts,ongkRequestPosts,onblRequestPosts,ontcRequestPosts,onsgRequestPosts } = this.props
      switch(BUTTONS[buttonIndex]){
        case '开发者头条':
           onttRequestPosts();
           activeIndex=0;
           break;
        case 'SegmentFault':
           onsgRequestPosts();
           activeIndex=1;
           break;
        case '推酷':
           ontcRequestPosts();
           activeIndex=2;
           break;
        case '极客头条':
           ongkRequestPosts();
           activeIndex=3;
           break;
        case '伯乐头条':
           onblRequestPosts();
           activeIndex=4;
           break;
        default:
           break;
      }
    });
  },
  render() {
    return (<div className={styles.root}>
        <Button type="ghost" onClick={this.showActionSheet}>切换更多</Button>
    </div>);
  },
});

export default Nav