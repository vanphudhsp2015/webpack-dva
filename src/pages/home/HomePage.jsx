import React, { Component } from 'react';
import { connect } from 'dva';
import { MasterLayout } from 'layouts';
import { TableComponent, FormComponent } from 'components';

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      views: 'TABLE',
      dataEdit: {},
      edit: false,
    };
  }

  onChangerView = () => {
    if (this.state.views === 'TABLE') {
      this.setState({
        views: 'FORM',
        edit: false,
      });
    } else {
      this.setState({
        views: 'TABLE',
        edit: false,
      });
    }
  };

  onRemove = (id) => {
    this.props.dispatch({
      type: 'posts/delete',
      payload: id,
    });
  };

  onAdd = (data) => {
    this.props.dispatch({
      type: 'posts/create',
      payload: data,
    });
    this.setState({
      views: 'TABLE',
    });
  };

  onEdit = (id) => {
    this.setState({
      views: 'FORM',
      dataEdit: this.props.posts.filter(item => item.id === id)[0],
      edit: true,
    });
  };

  onUpdate = (data) => {
    this.props.dispatch({
      type: 'posts/update',
      payload: data,
    });
    this.setState({
      views: 'TABLE',
    });
  };

  render() {
    const { posts } = this.props;
    const { views } = this.state;
    const View = () => {
      if (views === 'TABLE') {
        return (
          <TableComponent
            data={posts.reverse()}
            onChangerView={this.onChangerView}
            loading={this.props.loading}
            onRemove={this.onRemove}
            onEdit={this.onEdit}
          />
        );
      } else {
        return (
          <FormComponent
            onChangerView={this.onChangerView}
            onAdd={this.onAdd}
            dataEdit={this.state.dataEdit}
            edit={this.state.edit}
            onUpdate={this.onUpdate}
          />
        );
      }
    };
    return <MasterLayout>{View()}</MasterLayout>;
  }
}

const mapStateToProps = state => {
  const { loading, posts } = state.posts;
  return {
    loading,
    posts,
  };
};

export default connect(mapStateToProps)(HomePage);
