import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './CreateClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class CreateClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <div className="create-clinic-container">
        <div className="title">
          <FormattedMessage id="admin.manage-clinic.create-clinic" />
        </div>
        <div className="create-clinic-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <label>Clinic Name</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-6">
                <label>Clinic Name</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-6">
                <label>Clinic Name</label>
                <input className="form-control" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateClinic);
