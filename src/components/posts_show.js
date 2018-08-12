import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component {
    componentDidMount() {
        // This is the property of react router to return
        // parameters of URL
        const { id } = this.props.match.params;
        this.props.fetchPost(id);

    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading..</div>;
        }

        return (
          <div>
              <Link to="/"> Back to posts </Link>
              <button
                  className="btn btn-danger pull-xs-right"
                  onClick={this.onDeleteClick.bind(this)}>
                  Delete post
              </button>
              <h3>{ post.title }</h3>
              <h6>Categories: { post.categories }</h6>
              <p> { post.content }</p>
          </div>
        );
    }
}

// Here ownprops is equal to this.props of component
function mapStateToProps({ posts }, ownProps) {
    return { post : posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);