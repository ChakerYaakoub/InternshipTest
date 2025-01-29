import avatar1 from "../assets/avatar/avatar1.svg";
import avatar2 from "../assets/avatar/avatar2.svg";
import avatar3 from "../assets/avatar/avatar3.svg";
import { Service } from "../models/Services";

export const serviceData: Service[] = [
  {
    id: "1",
    title: "Service Page Website",
    description:
      "Make a page display about services for websites company with blue and red colors",
    progress: "0/20",
    attachments: [
      {
        id: "1",
        path: "https://www.google.com/image.png",
      },
      {
        id: "2",
        path: "https://www.google.com/image.png",
      },
    ],
    comments: [
      {
        id: "1",
        content: "This is a comment",
      },
      {
        id: "2",
        content: "This is a comment",
      },
    ],
    collaborators: [
      {
        id: "1",
        avatar: avatar1,
      },
      {
        id: "2",
        avatar: avatar2,
      },
      {
        id: "3",
        avatar: avatar3,
      },
    ],
  },
];
