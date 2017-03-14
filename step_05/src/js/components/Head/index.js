import React, { Component } from 'react'
import { Flex, WhiteSpace,Button } from 'antd-mobile';
import styles from './index.scss';

const PlaceHolder = (props) => (
  <div {...props}>
    <Button type="primary">{props.title}</Button>
  </div>
);

const FlexExample = React.createClass({
  render() {
    const { title } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          酷阅读
        </div>
        <div className="flex-container">
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item><PlaceHolder title={title} /></Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  },
});

export default class Head extends Component {

  render () {
    const { title } = this.props
    return (
      <FlexExample title={title} />
    )
  }
}

