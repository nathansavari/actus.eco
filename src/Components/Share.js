import React from 'react';
import {
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

export default function Share(props) {
  let i = props.props;
  return (
    <div className="card-social">
      <EmailShareButton url={i.link} className="card-share">
        <EmailIcon className="card-icon"></EmailIcon>
      </EmailShareButton>
      <LinkedinShareButton url={i.link}>
        <LinkedinIcon className="card-icon"></LinkedinIcon>
      </LinkedinShareButton>
      <TwitterShareButton url={i.link}>
        <TwitterIcon className="card-icon"></TwitterIcon>
      </TwitterShareButton>
    </div>
  );
}
