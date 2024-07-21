import { Tag } from '@chakra-ui/react'

export default function Status(props: { status: string }) {
    const status = props.status;

    let bgColor, textColor;

    switch (status) {
      case "Upcoming":
        bgColor = "#cbdaf5";
        textColor = "#1156d6";
        break;
      case "Ongoing":
        bgColor = "#d3d3d3";
        textColor = "#000000";
        break;
      case "Closed":
        bgColor = "#ffe6e6";
        textColor = "#ff0000";
        break;
      case "Completed":
        bgColor = "#e6ffe7";
        textColor = "#0ce917";
        break;
      default:
        bgColor = "#ffffff";
        textColor = "#000000";
        break;
    }
    return (
      <Tag bg={bgColor} color={textColor} fontSize="sm" fontWeight="500">
        {props.status}
      </Tag>
    );
}