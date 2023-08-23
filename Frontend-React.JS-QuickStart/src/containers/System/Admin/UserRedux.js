import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      position: '',
      address: '',
      gender: '',
      role: '',
      avatar: '',
      action: '',
      userEditId: '',
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // this.props.dispatch(actions.fetchGenderStart());
    // try {
    //   let res = await getAllCodeService('gender');
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   console.log('check res ', res);
    // } catch (e) {
    //   console.log(e);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
        address: '',
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
        avatar: '',
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: '',
      });
    }
  }
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log('base 64: ', base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return; //can not open preview if there's no image
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editAnUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address',
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert('This input is required: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
    // email:'',
    // password: '',
    // firstName: '',
    // lastName: '',
    // phoneNumber: '',
    // address: '',
    // gender: '',
    // role: '',
    // avatar: '',
  };
  handleEditUserFromParent = (user) => {
    console.log('stupid will smith: ', user);
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }

    this.setState({
      email: user.email,
      password: 'HardCode',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      position: user.positionId,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      previewImgURL: imageBase64,
      avatar: '',
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isGetGender = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    console.log('check state compionent: ', this.state);
    return (
      <div className="user-redux-container">
        <div className="title"> Practice User Redux </div>
        <div>{isGetGender === true ? 'Loading Genders' : ''}</div>
        <div className="user-redux-body">
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
          <div className="container">
            <div className="row">
              <div className="col-12">
                <FormattedMessage id="manage-user.add" />{' '}
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.email" />{' '}
                </label>
                <input
                  className="form-control"
                  type="email"
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, 'email');
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.password" />{' '}
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                  onChange={(event) => {
                    this.onChangeInput(event, 'password');
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.first-name" />{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, 'firstName');
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.last-name" />{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, 'lastName');
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.phone-number" />{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, 'phoneNumber');
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.address" />{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, 'address');
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.gender" />{' '}
                </label>
                <select
                  className="form-control"
                  value={gender}
                  onChange={(event) => {
                    this.onChangeInput(event, 'gender');
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.position" />{' '}
                </label>
                <select
                  className="form-control"
                  value={position}
                  onChange={(event) => {
                    this.onChangeInput(event, 'position');
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.role" />{' '}
                </label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(event) => {
                    this.onChangeInput(event, 'role');
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  {' '}
                  <FormattedMessage id="manage-user.image" />{' '}
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tai Anh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? 'btn btn-warning'
                      : 'btn btn-primary'
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParentKey={this.handleEditUserFromParent}
                  action={this.state.action}
                />
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
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAnUserRedux: (data) => dispatch(actions.editAnUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
