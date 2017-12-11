/* @flow */

import React, {Component} from 'react';
// import cx from 'classnames';
import IconButton from './IconButton';

import {
  supportMultiple,
  fileAccepted,
  // allFilesAccepted,
  fileMatchSize,
  getDataTransferItems
} from "../lib/inputUtils";


type Props = {
  label?: string,
  icon?: string,
  accept?: string,
  disableClick?: boolean,
  disabled?: boolean,
  inputProps?: Object,
  multiple?: boolean,
  name?: string,
  maxSize?: number,
  minSize?: number,
  onClick?: Function,
  onChange?: Function,
  onChangeAccepted?: Function,
  onChangeRejected?: Function,
  onCallback?: Function,
  onFileDialogCancel?: Function,
};

export default class UploadIconButton extends Component {
  props: Props;

  constructor(props, context) {
    super(props, context);
    this.composeHandlers = this.composeHandlers.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this)
    this.onFileDialogCancel = this.onFileDialogCancel.bind(this)
    this.onInputElementClick = this.onInputElementClick.bind(this)

    this.setRef = this.setRef.bind(this)
    this.setRefs = this.setRefs.bind(this)

    this.isFileDialogActive = false;

    this.state = {
      draggedFiles: [],
      acceptedFiles: [],
      rejectedFiles: []
    }
  }

  componentDidMount() {
    this.fileInputEl.addEventListener('click', this.onInputElementClick, false);
    document.body.onfocus = this.onFileDialogCancel;
  }

  componentWillUnmount() {
    this.fileInputEl.removeEventListener('click', this.onInputElementClick, false);
    document.body.onfocus = null;
  }

  composeHandlers(handler) {
    if (this.props.disabled) {
      return null;
    }

    return handler;
  }

  onChange (evt) {
    const { onChange, onChangeAccepted, onChangeRejected, multiple, accept } = this.props;
    const fileList = getDataTransferItems(evt);
    const acceptedFiles = [];
    const rejectedFiles = [];

    // Stop default browser behavior
    evt.preventDefault();

    this.isFileDialogActive = false;

    fileList.forEach(file => {
      if (
        fileAccepted(file, accept) &&
        fileMatchSize(file, this.props.maxSize, this.props.minSize)
      ) {
        acceptedFiles.push(file)
      } else {
        rejectedFiles.push(file)
      }
    })

    if (!multiple) {
      // if not in multi mode add any extra accepted files to rejected.
      // This will allow end users to easily ignore a multi file drop in "single" mode.
      rejectedFiles.push(...acceptedFiles.splice(1))
    }

    if (onChange) {
      onChange.call(this, acceptedFiles, rejectedFiles, evt)
    }

    if (rejectedFiles.length > 0 && onChangeRejected) {
      onChangeRejected.call(this, rejectedFiles, evt)
    }

    if (acceptedFiles.length > 0 && onChangeAccepted) {
      onChangeAccepted.call(this, acceptedFiles, evt)
    }

    // Clear files value
    // this.draggedFiles = null

    // Reset drag state
    this.setState({
      isActive: false,
      // draggedFiles: [],
      acceptedFiles,
      rejectedFiles
    })
  }

  onClick (evt) {
    const { onClick, disableClick } = this.props
    if (!disableClick) {
      evt.stopPropagation();

      if (onClick) {
        onClick.call(this, evt);
      }

      // in IE11/Edge the file-browser dialog is blocking, ensure this is behind setTimeout
      // this is so react can handle state changes in the onClick prop above above
      // see: https://github.com/react-dropzone/react-dropzone/issues/450
      setTimeout(this.open.bind(this), 0);
    }
  }

  onInputElementClick(evt) {
    evt.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onFileDialogCancel() {
    // timeout will not recognize context of this method
    const { onFileDialogCancel } = this.props
    const { fileInputEl } = this
    let { isFileDialogActive } = this
    // execute the timeout only if the onFileDialogCancel is defined and FileDialog
    // is opened in the browser
    if (onFileDialogCancel && isFileDialogActive) {
      setTimeout(() => {
        // Returns an object as FileList
        const FileList = fileInputEl.files
        if (!FileList.length) {
          isFileDialogActive = false
          onFileDialogCancel()
        }
      }, 300)
    }
  }

  setRef (ref) {
    this.node = ref
  }

  setRefs (ref) {
    this.fileInputEl = ref
  }

  open () {
    this.isFileDialogActive = true;
    this.fileInputEl.value = null;
    this.fileInputEl.click();
  }

  render() {

    const {
      accept,
      disabled,
      inputProps,
      multiple,
      name,
      icon,
      label,
    } = this.props

    // const { isActive, draggedFiles } = this.state
    // const filesCount = draggedFiles.length
    // const isMultipleAllowed = multiple || filesCount <= 1;
    // const isAccept = filesCount > 0 && allFilesAccepted(draggedFiles, this.props.accept)
    // const isReject = filesCount > 0 && (!isAccept || !isMultipleAllowed)

    const inputAttributes = {
      accept,
      disabled,
      type: 'file',
      style: { display: 'none' },
      multiple: supportMultiple && multiple,
      ref: this.setRefs,
      onChange: this.onChange,
      autoComplete: 'off'
    }

    if (name && name.length) {
      inputAttributes.name = name
    }

    return (
      <IconButton
        label={label}
        iconName={icon}
        onClick={this.composeHandlers(this.onClick)}
        onChange={this.composeHandlers(this.onChange)}
        ref={this.setRef}
        aria-disabled={disabled}
      >
        <input
          { ...inputProps }
          { ...inputAttributes }
        />
      </IconButton>
    );
  }
}

UploadIconButton.defaultProps = {
  icon: 'picture',
  disabled: false,
  disableClick: false,
  multiple: true,
  maxSize: Infinity,
  minSize: 0
}