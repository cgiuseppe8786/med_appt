import React from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const reports = [
    {
      id: 1,
      name: "Patient Medical Report",
      date: "28/09/2026",
      file: "/patient_report.pdf",
    },
  ];

  return (
    <div className="reports-page">
      <div className="reports-container">

        <div className="reports-header">
          <h1>Your Reports</h1>
          <p>
            View or download your medical reports.
          </p>
        </div>

        {reports.length > 0 ? (
          <div className="reports-table-wrapper">

            <table className="reports-table">
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Report Name</th>
                  <th>Date</th>
                  <th>View</th>
                  <th>Download</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report, index) => (
                  <tr key={report.id}>
                    <td>{index + 1}</td>

                    <td>{report.name}</td>

                    <td>{report.date}</td>

                    <td>
                      <a
                        href={report.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="report-view-button"
                      >
                        View Report
                      </a>
                    </td>

                    <td>
                      <a
                        href={report.file}
                        download="patient_report.pdf"
                        className="report-download-button"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ) : (
          <div className="reports-empty">
            No reports available.
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportsLayout;