import React from "react";
import "./ServiceCard.css";
import { ServiceCardProps, useServiceCard } from "./useServiceCard";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { LiaStumbleuponCircle } from "react-icons/lia";

const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const {
    title,
    description,
    progress = "0/20",
    attachments = [],
    comments = [],
    collaborators = [],
    handleInviteClick,
    handleAttachmentClick,
    handleCommentClick,
  } = useServiceCard(props);

  return (
    <div className="card">
      <div className="badge">User Interface</div>

      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>

      <div className="footer">
        <div className="row">
          <div className="progress">
            <MdCheckCircleOutline />
            <span>{progress}</span>
          </div>
          <div className="collaborators">
            {collaborators.length > 0 && (
              <div className="avatars">
                {collaborators.map((collaborator) => (
                  <img
                    key={collaborator.id}
                    src={collaborator.avatar}
                    alt=""
                    className="avatar"
                  />
                ))}
              </div>
            )}
            <button className="btn-invite" onClick={handleInviteClick}>
              Invite
            </button>
          </div>
        </div>

        <div className="row stats">
          <button className="stat " onClick={handleAttachmentClick}>
            <LiaStumbleuponCircle className="icon" size={22} />{" "}
            {attachments.length} Attachment
          </button>
          <div className="divider"></div>
          <button className="stat" onClick={handleCommentClick}>
            <FaCommentAlt className="icon" /> {comments.length} Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
