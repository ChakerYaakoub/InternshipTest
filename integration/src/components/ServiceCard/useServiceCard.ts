import { Service } from "../../models/Services";

export interface ServiceCardProps {
  service: Service;
  key: string;
}

export const useServiceCard = (props: ServiceCardProps) => {
  const { service } = props;
  const { id } = service;

  const handleInviteClick = () => {
    console.log("Invite clicked for service id : ", id);
  };
  const handleAttachmentClick = () => {
    console.log("Attachment clicked for service id : ", id);
  };
  const handleCommentClick = () => {
    console.log("Comment clicked for service id : ", id);
  };

  return {
    ...props,
    ...props.service,
    handleInviteClick,
    handleAttachmentClick,
    handleCommentClick,
  };
};
