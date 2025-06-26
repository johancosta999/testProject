import React, { useState, useEffect, useRef } from "react";
import Nav from "../nav/nav";
import axios from "axios";
import User from "../User/User";
//import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./userDetails.css";
import PrintDetails from "./printDetails";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function UserDetails() {
  const [allUsers, setAllUsers] = useState([]); // 🔒 original data
  const [users, setUsers] = useState([]);       // 👁️ filtered/displayed
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setAllUsers(data.users);
      setUsers(data.users);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setUsers(allUsers);
      setNoResults(false);
    }
  }, [searchQuery, allUsers]);

  //print pdf
  const ComponentsRef = useRef();

  const handleDownloadPDF = () => {
    const input = ComponentsRef.current;

    html2canvas(input, { useCORS: true, scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("user-report.pdf");
    });
  };

  const handleSearch = () => {
    const filteredUsers = allUsers.filter((user) =>
      Object.values(user).some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };
 
  return (
    <div>
      <Nav />
      <h1>User Details Display Page</h1>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search User Details"
      />
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (

      <div>
        {users &&
          users.map((user, i) => (
            <div key={i}>
              <User user={user} onDelete={fetchHandler} />
            </div>
          ))}
      </div>
    )}

      <div style={{ position: "absolute", left: "-9999px", top: 0, width: "100%" }}>
        <PrintDetails ref={ComponentsRef} users={users} />
      </div>


      <button className="no-print" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

export default UserDetails;
