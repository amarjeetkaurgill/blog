import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
    renderField(field) {
        // Below statement is used for destructuring
        // We want to pull meta property from field object, i.e field.meta.
        // Again we want to pull touched and error properties from field.meta
        // which can be written as below in ES6 syntax
        const { meta: {touched, error}} = field;

        const className = `form-group ${ touched && error ? 'has-danger' : ''}`;
        return (
            <div className={ className }>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                {touched ? error: ''}
                </div>
            </div>
        )
    }
    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="title"
                    label="Title"
                    component={this.renderField}
                />

                <Field
                    name="categories"
                    label="Category"
                    component={this.renderField}
                />

                <Field
                    name="content"
                    label="Post Content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.title) {
        errors.title = "Please enter title";
    }

    if (!values.categories) {
        errors.categories = "Please enter category";
    }

    if (!values.content) {
        errors.content = "Please enter content";
    }

    return errors;
}
export default reduxForm({
    validate,
    form: 'PostNewForm'
})(
    connect(null, { createPost })(PostNew)
);