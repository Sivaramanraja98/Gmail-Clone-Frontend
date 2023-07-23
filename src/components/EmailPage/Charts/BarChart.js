import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ inbox, sent, starred, drafts, trash, read }) => {
  const labels = ["Inbox",  "Read", "Sent", "Starred", "Drafts", "Trash"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My MailBox Detials",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 3,
        data: [inbox.length, read.length, sent.length, starred.length, drafts.length, trash.length],
      },
    ],
  };

  const options={
    plugins: {
      title: {
        display: true,
        text: "All Mails"
      }
    }
  }

  return (
    <div style={{margin: '50px 90px'}}>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default BarChart;