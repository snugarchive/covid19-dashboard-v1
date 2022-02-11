import React from "react";

const Footer = ({ developer, email, website, disclaimer }) => {
  return (
    <footer>
      <address>
        <i>
          개발자: {developer}
          <br />
          이메일: {email}
          <br />
          웹사이트: {website}
          <br />
          <b>Disclaimer: {disclaimer}</b>
        </i>
      </address>
    </footer>
  );
};

export default Footer;
