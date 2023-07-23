import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ inboxReply, outboxReply }) => {

  let outboxReplyCount = 0, inboxReplyCount = 0;

  if (outboxReply.length > 0) {
    outboxReply.forEach((outbox) => {
      outboxReplyCount += outbox.replyId.length;
    });
  }

  if (inboxReply.length > 0) {
    inboxReply.forEach((inbox) => {
      inboxReplyCount += inbox.replyId.length;
    });
  }

  const labels = ["Send by Others", "Send by Me"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My Mail Flow",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 3,
        data: [inboxReplyCount, outboxReplyCount],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "OverAll My Mail Flow"
      }
    }
  }

  return (
    <div style={{ margin: '50px 90px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};
export default PieChart;