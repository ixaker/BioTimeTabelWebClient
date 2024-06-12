import React from "react";

interface HideTableProps {
  children: React.ReactNode;
}

const HideTable: React.FC<HideTableProps> = ({ children }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const displayFromUrl = urlParams.get("display");

  if (displayFromUrl) {
    localStorage.setItem("display", displayFromUrl);
  }

  const displayValue = displayFromUrl || localStorage.getItem("display");

  const styles: React.CSSProperties = {
    width: "100%",
    display: displayValue === "none" ? "none" : "block",
  };

  return <div style={styles}>{children}</div>;
};

export default HideTable;
